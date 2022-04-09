package com.indracompany.treinamento.model.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class ExtratoDTO implements Serializable{
	
	private static final long serialVersionUID = 1370747418822167120L;

	private String tipoOperacao;
	
	private java.time.LocalDate data;
	
	private java.time.LocalTime hora;
	
	private double valor;
	
	private double saldoConta;
	
	private String titularConta;
	
	
	

}
