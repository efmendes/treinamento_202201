package com.indracompany.treinamento.controller.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.service.ContaBancariaService;

@RestController
@RequestMapping("rest/contas")
public class ContaBancariaRest extends GenericCrudRest<ContaBancaria, Long, ContaBancariaService>{

}
