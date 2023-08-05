package com.aquecavidas.aquecavidas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aquecavidas.aquecavidas.model.ItemDoacao;
import com.aquecavidas.aquecavidas.services.ItemDoacaoService;

@Controller
@RequestMapping("/api/doacoes")
public class ItemDoacaoController {
    
    @Autowired
    private ItemDoacaoService itemDoacaoService;


    @GetMapping
    public List<ItemDoacao> ConsultarItens() {
       return itemDoacaoService.ConsultarItens();
    }

    @PostMapping
    public void CadastrarItens(@RequestBody ItemDoacao item) {
        itemDoacaoService.CadastrarItem(item);
    }

    @GetMapping("/{id}")
    public Optional<ItemDoacao> ObterPorId(@PathVariable Integer id) {
        return itemDoacaoService.ObterPorId(id);
    }

    @DeleteMapping("/{id}")
    public void ExcluirItem(@PathVariable Integer id) {
        itemDoacaoService.ExcluirItem(id);
    }

    @PutMapping("{id}")
    public ItemDoacao AlterarItem(@RequestBody ItemDoacao item, @PathVariable Integer id){
        return itemDoacaoService.AlterarItem(id, item);
    }

}
