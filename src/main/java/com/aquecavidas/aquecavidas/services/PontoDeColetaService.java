package com.aquecavidas.aquecavidas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aquecavidas.aquecavidas.model.PontoDeColeta;
import com.aquecavidas.aquecavidas.repository.PontoDeColetaRepository;

@Service
public class PontoDeColetaService {
    @Autowired
    private PontoDeColetaRepository pontoDeColetaRepository;

    public List<PontoDeColeta> ConsultarItens() {
        return pontoDeColetaRepository.findAll();
    }

     public Optional<PontoDeColeta> ObterPorId(Integer id) {
        return pontoDeColetaRepository.findById(id);
    }

    public void CadastrarPonto(PontoDeColeta ponto){
        pontoDeColetaRepository.save(ponto);
    }

    public void ExcluirPonto(Integer id){
        pontoDeColetaRepository.deleteById(id);
    }

    public PontoDeColeta AlterarPonto(Integer id, PontoDeColeta ponto){

        ponto.setId(id);

        return pontoDeColetaRepository.save(ponto);
    }
}
