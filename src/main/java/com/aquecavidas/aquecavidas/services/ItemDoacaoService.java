package com.aquecavidas.aquecavidas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aquecavidas.aquecavidas.model.ItemDoacao;
import com.aquecavidas.aquecavidas.repository.ItemDoacaoRepository;

@Service
public class ItemDoacaoService {
    
    @Autowired
    private ItemDoacaoRepository itemDoacaoRepository;

    public List<ItemDoacao> ConsultarItens() {
        return itemDoacaoRepository.findAll();
    }

     public Optional<ItemDoacao> ObterPorId(Integer id) {
        return itemDoacaoRepository.findById(id);
    }

    public void CadastrarItem(ItemDoacao item){
        itemDoacaoRepository.save(item);
    }

    public void ExcluirItem(Integer id){
        itemDoacaoRepository.deleteById(id);
    }

    public ItemDoacao AlterarItem(Integer id, ItemDoacao item){

        item.setId(id);

        return itemDoacaoRepository.save(item);
    }

}
