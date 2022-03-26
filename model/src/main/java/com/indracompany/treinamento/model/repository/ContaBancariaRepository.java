package com.indracompany.treinamento.model.repository;

import java.util.List;

import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.ContaBancaria;

public interface ContaBancariaRepository extends GenericCrudRepository<ContaBancaria, Long>{
	
	List<ContaBancaria> findByCliente(Cliente cli);

}
