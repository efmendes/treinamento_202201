package com.indracompany.treinamento.model.repository;

import java.util.List;

import com.indracompany.treinamento.model.entity.Cliente;

public interface ClienteRepository extends GenericCrudRepository<Cliente, Long>{
	
	List<Cliente> findByCpf(String cpf);
	
	List<Cliente> findByNomeStartingWith(String nome);
	

}
