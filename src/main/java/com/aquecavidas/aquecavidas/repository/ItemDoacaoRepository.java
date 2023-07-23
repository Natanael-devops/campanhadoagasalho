package com.aquecavidas.aquecavidas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aquecavidas.aquecavidas.model.ItemDoacao;

public interface ItemDoacaoRepository extends JpaRepository<ItemDoacao, Integer> {
    
}
