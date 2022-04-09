package com.indracompany.treinamento.model.service;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.indracompany.treinamento.model.dto.ExtratoDTO;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.Extrato;

import com.indracompany.treinamento.model.repository.ExtratoRepository;

@Service
public class ExtratoService extends GenericCrudService<Extrato, Long, ExtratoRepository>{
	
	@Autowired
	private ContaBancariaService contaService;
	
	public List<ExtratoDTO>buscarExtrato(String agencia, String conta, String dataInicial, String dataFinal) {
		
		List<ExtratoDTO> listaExtratosDTO = new ArrayList<>();
		
		ContaBancaria contaBancaria = contaService.consultarConta(agencia, conta);
		
		//convertendo data
		LocalDate dataInicio = LocalDate.parse(dataInicial, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
		LocalDate dataFim = LocalDate.parse(dataFinal, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
		
		List<Extrato> listaExtrato = repository.buscarExtratoPorDataJpql(contaBancaria, dataInicio, dataFim);
		
		for(Extrato extrato : listaExtrato) {
			
			ExtratoDTO dtoExtrato = new ExtratoDTO();
			dtoExtrato.setTipoOperacao(extrato.getOperacao());
			dtoExtrato.setData(extrato.getData());
			dtoExtrato.setHora(extrato.getHora());
			dtoExtrato.setValor(extrato.getValor());
			dtoExtrato.setSaldoConta(extrato.getConta().getSaldo());
			dtoExtrato.setTitularConta(extrato.getConta().getCliente().getNome());
			
			listaExtratosDTO.add(dtoExtrato);
		}
		
		return listaExtratosDTO;
	}

}
