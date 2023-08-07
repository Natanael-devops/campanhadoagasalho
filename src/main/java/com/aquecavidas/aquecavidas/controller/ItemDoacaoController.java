package com.aquecavidas.aquecavidas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aquecavidas.aquecavidas.model.ItemDoacao;
import com.aquecavidas.aquecavidas.services.ItemDoacaoService;

@Controller
@RequestMapping("/api/doacoes")
public class ItemDoacaoController {
    
    @Autowired
    private ItemDoacaoService itemDoacaoService;

    @GetMapping
    @ResponseBody
    public ResponseEntity<?> consultarItens() {
        try {
            List<ItemDoacao> lista = itemDoacaoService.ConsultarItens();
            return ResponseEntity.ok(lista);
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<?> cadastrarItens(@RequestBody ItemDoacao item) {
        try {
            itemDoacaoService.CadastrarItem(item);
            return ResponseEntity.ok(item);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Optional<ItemDoacao> ObterPorId(@PathVariable Integer id) {
        return itemDoacaoService.ObterPorId(id);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> ExcluirItem(@PathVariable Integer id) {
        try {
            itemDoacaoService.ExcluirItem(id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        
    }

    @PutMapping("{id}")
    public ResponseEntity<ItemDoacao> alterarItem(@RequestBody ItemDoacao item, @PathVariable Integer id) {
        // Verifica se o item com o ID fornecido existe no banco de dados
        Optional<ItemDoacao> itemOptional = itemDoacaoService.ObterPorId(id);
        if (!itemOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
    
        // Atualiza o item de doação
        ItemDoacao itemAtualizado = itemDoacaoService.AlterarItem(id, item);
    
        // Retorna a resposta com o item atualizado e o status 200 (OK)
        return ResponseEntity.ok(itemAtualizado);
    }
}
