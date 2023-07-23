package com.aquecavidas.aquecavidas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aquecavidas.aquecavidas.model.Usuario;
import com.aquecavidas.aquecavidas.repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> ConsultarUsuarios() {
        return usuarioRepository.findAll();
    }

     public Optional<Usuario> ObterPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    public void CadastrarUsuario(Usuario usuario){
        usuarioRepository.save(usuario);
    }

    public void ExcluirUsuario(Integer id){
        usuarioRepository.deleteById(id);
    }

    public Usuario AlterarUsuario(Integer id, Usuario usuario){

        usuario.setId(id);

        return usuarioRepository.save(usuario);
    }
}
