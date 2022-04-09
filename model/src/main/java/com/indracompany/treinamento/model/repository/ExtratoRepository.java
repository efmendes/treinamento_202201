package com.indracompany.treinamento.model.repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.Extrato;



public interface ExtratoRepository extends GenericCrudRepository<Extrato, Long>{
	
	@Query("select e from Extrato e where e.conta = :conta and e.data between :dataInicial and :dataFinal")
	List<Extrato> buscarExtratoPorDataJpql(@Param("conta")ContaBancaria conta, @Param("dataInicial")LocalDate dataInicial, @Param("dataFinal")LocalDate dataFinal);
	
	List<Extrato> findByConta(ContaBancaria conta);

}
