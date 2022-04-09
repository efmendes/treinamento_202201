package com.indracompany.treinamento.model.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ConsultaContaBancariaDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.Extrato;
import com.indracompany.treinamento.model.repository.ContaBancariaRepository;


@Service
public class ContaBancariaService extends GenericCrudService<ContaBancaria, Long, ContaBancariaRepository>{
	
	@Autowired
	private ClienteService clienteService;
	@Autowired
	private ExtratoService extratoService;
	
	private boolean isTranferencia = false;
	
	public double consultarSaldo(String agencia, String numero) {
		ContaBancaria c = consultarConta(agencia, numero);
		return c.getSaldo();
	}

	public void depositar (String agencia, String numeroConta, double valor) {
		
		ContaBancaria conta = consultarConta(agencia, numeroConta);
		conta.setSaldo(conta.getSaldo() + valor);
		super.salvar(conta);
		
		if(!this.isTranferencia) {
			salvarExtratoBancario("depósito", valor, conta);
		}
	}
	
	public void sacar (String agencia, String numeroConta, double valor) {
		
		ContaBancaria conta = consultarConta(agencia, numeroConta);
		
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INEXISTENTE);
		}
		
		conta.setSaldo(conta.getSaldo() - valor);
		super.salvar(conta);
		
		if(!this.isTranferencia) {
			salvarExtratoBancario("saque", valor, conta);
		}
		
	}
	
	
	@Transactional(rollbackFor = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		
		this.isTranferencia = true;
		
		this.sacar(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem(), dto.getValor());
		this.depositar(dto.getAgenciaDestino(), dto.getNumeroContaDestino(), dto.getValor());
		
		ContaBancaria conta = consultarConta(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem());
		
		this.salvarExtratoBancario("transferência", dto.getValor(), conta);
	}
	
	
	//USAR PARA O DESAFIO DO EXTRATO
	public ContaBancaria consultarConta (String agencia, String numeroConta) {
		ContaBancaria c = repository.findByAgenciaAndNumero(agencia, numeroConta);
		
		if (c == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		
		return c;
	}
	
	
	public List<ConsultaContaBancariaDTO> obterContasPorCpf(String cpf){

		List<ConsultaContaBancariaDTO> listaContasRetorno = new ArrayList<>();
		Cliente cli = clienteService.buscarCliente(cpf);

		List<ContaBancaria> listaContasCliente = repository.findByCliente(cli);
		for (ContaBancaria conta : listaContasCliente) {
			ConsultaContaBancariaDTO dtoConta = new ConsultaContaBancariaDTO();
			BeanUtils.copyProperties(conta, dtoConta);
			dtoConta.setCpf(conta.getCliente().getCpf());
			dtoConta.setNomeTitular(conta.getCliente().getNome());
			
			listaContasRetorno.add(dtoConta);
		}


		return listaContasRetorno;
	}
	
	//DESAFIO ---------------------------------------------------------
	public void salvarExtratoBancario(String tipoOperacao, double valor, ContaBancaria conta) {
		
		Extrato extrato = new Extrato();
		java.time.LocalDate data = LocalDate.now();
		java.time.LocalTime hora = LocalTime.now();
				
		extrato.setOperacao(tipoOperacao);
		extrato.setValor(valor);
		extrato.setData(data);
		extrato.setHora(hora);
		extrato.setConta(conta);
				
		extratoService.salvar(extrato);
		
	}
	
}
