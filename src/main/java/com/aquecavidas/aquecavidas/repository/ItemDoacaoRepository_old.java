package com.aquecavidas.aquecavidas.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.aquecavidas.aquecavidas.model.ItemDoacao;
import com.aquecavidas.aquecavidas.model.exception.ResourceNotFoundException;


public class ItemDoacaoRepository_old {
    
    private ArrayList<ItemDoacao> itens = new ArrayList<ItemDoacao>();
    private Integer ultimoId = 0;

    /**
     * Método para retornar todos os itens doados
     * @return Lista de itens.
     */
    public List <ItemDoacao> ConsultarItens() {
        return itens;
    }

    /**
     * Método que retorna um item doado encontrado pelo seu id. 
     * @param id do item doado que será localizado.
     * @return Retorna um item doado caso seja encontrado.
     */
    public Optional<ItemDoacao> ObterPorId(Integer id) {
        return itens.stream().filter(itens -> itens.getId() == id).findFirst();
    }


    /**
     * Método para cadastrar um item doado.
     * @param item que será cadastrado.
     */
    public void CadastrarItem(ItemDoacao item){
        ultimoId++;
        item.setId(ultimoId);
        itens.add(item);
    }

    /*
     * Método para excluir item cadastrado.
     * 
     */
    public void ExcluirItem(Integer id){
        itens.removeIf(item -> item.getId() == id);
    }


    /**
     * Método para atualizar o tem na lista.
     * @param item que será atualizado.
     * @return Retorna o item após atualizar na lista.
     */
    public ItemDoacao AlterarItem(ItemDoacao item){
        
        Optional<ItemDoacao> itemEncontrado = ObterPorId(item.getId());

        if (itemEncontrado.isEmpty()) {
            throw new ResourceNotFoundException("Item não encontrado (inexistente)");
        }

        ExcluirItem(item.getId());

        itens.add(item);

        return item;
    }
}

