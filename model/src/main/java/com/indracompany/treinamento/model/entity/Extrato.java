package com.indracompany.treinamento.model.entity;


import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;


@Entity
@Table(name = "extratos_andreenedino")
@Data
@EqualsAndHashCode(callSuper = true)
public class Extrato extends GenericEntity<Long>{

	private static final long serialVersionUID = 3165402003088961837L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 20, name = "tipo_operacao", nullable = false)
	private String operacao;
	
	@Column(nullable = false, name = "valor")
	private double valor;
	
	@Column(name = "data", nullable = false)
	@Basic
	private java.time.LocalDate data;
	
	@Column(name = "hora", nullable = false)
	@Basic
	private java.time.LocalTime hora;
	
	
	@ManyToOne
	@JoinColumn(name = "fk_conta_id", nullable = false)
	private ContaBancaria conta;
	
	
}
