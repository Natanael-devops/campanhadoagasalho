package com.aquecavidas.aquecavidas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aquecavidas.aquecavidas.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    
}
