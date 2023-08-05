package com.aquecavidas.aquecavidas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class TemplateController {
    @GetMapping
    public String paginaIndex(Model model) {
        return "index";
    }

    @GetMapping("/cadastrar")
    public String paginaCadastrar(Model model) {
        return "cadastrar";
    }
}
