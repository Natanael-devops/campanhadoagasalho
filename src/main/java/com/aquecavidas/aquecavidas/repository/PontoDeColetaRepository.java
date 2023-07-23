package com.aquecavidas.aquecavidas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aquecavidas.aquecavidas.model.PontoDeColeta;

public interface PontoDeColetaRepository extends JpaRepository<PontoDeColeta, Integer> {
    
}
