package com.aquecavidas.aquecavidas.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.aquecavidas.aquecavidas.model.PontoDeColeta;
import com.aquecavidas.aquecavidas.model.exception.ResourceNotFoundException;

@Repository
public class PontoDeColetaRepository_old {
    private ArrayList<PontoDeColeta> pontos = new ArrayList<PontoDeColeta>();
    private Integer ultimoId = 0;

    /**
     * Método para retornar todos os pontos de coleta.
     * @return Lista de pontos.
     */
    public List <PontoDeColeta> ConsultarPontos() {
        return pontos;
    }

    /**
     * Método que retorna um ponto de coleta encontrado pelo seu id. 
     * @param id do ponto de coleta que será localizado.
     * @return Retorna um ponto de coleta caso seja encontrado.
     */
    public Optional<PontoDeColeta> ObterPorId(Integer id) {
        return pontos.stream().filter(pontos -> pontos.getId() == id).findFirst();
       }


    /**
     * Método para cadastrar um ponto de coleta.
     * @param ponto que será cadastrado.
     */
    public void CadastrarPonto(PontoDeColeta ponto){
        ultimoId++;
        ponto.setId(ultimoId);
        pontos.add(ponto);
    }

    
    public void ExcluirPonto(Integer id){
        pontos.removeIf(ponto -> ponto.getId() == id);
    }


    /**
     * Método para atualizar o ponto de coleta na lista.
     * @param ponto que será atualizado.
     * @return Retorna o ponto de coleta após atualizar na lista.
     */
    public PontoDeColeta AlterarPonto(PontoDeColeta ponto){
        
        Optional<PontoDeColeta> pontoEncontrado = ObterPorId(ponto.getId());

        if (pontoEncontrado.isEmpty()) {
            throw new ResourceNotFoundException("Item não encontrado (inexistente)");
        }

        ExcluirPonto(ponto.getId());

        pontos.add(ponto);

        return ponto;
    }
}
