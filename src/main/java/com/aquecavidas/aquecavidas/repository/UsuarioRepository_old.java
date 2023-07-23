package com.aquecavidas.aquecavidas.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.aquecavidas.aquecavidas.model.Usuario;
import com.aquecavidas.aquecavidas.model.exception.ResourceNotFoundException;

@Repository
public class UsuarioRepository_old {
    private ArrayList<Usuario> usuarios = new ArrayList<Usuario>();
    private Integer ultimoId = 0;

    /**
     * Método para retornar todos os usuarios.
     * @return Lista de usuarios.
     */
    public List <Usuario> ConsultarUsuarios() {
        return usuarios;
    }

    /**
     * Método que retorna um usuario encontrado pelo seu id. 
     * @param id do usuario que será localizado.
     * @return Retorna um usuario caso seja encontrado.
     */
    public Optional<Usuario> ObterPorId(Integer id) {
        return usuarios.stream().filter(usuarios -> usuarios.getId() == id).findFirst();
       }


    /**
     * Método para cadastrar um usuario.
     * @param usuario que será cadastrado.
     */
    public void CadastrarUsuario(Usuario usuario){
        ultimoId++;
        usuario.setId(ultimoId);
        usuarios.add(usuario);
    }

    
    public void ExcluirUsuario(Integer id){
        usuarios.removeIf(usuario -> usuario.getId() == id);
    }


    /**
     * Método para atualizar o usuario na lista.
     * @param usuario que será atualizado.
     * @return Retorna o usuario após atualizar na lista.
     */
    public Usuario AlterarUsuario(Usuario usuario){
        
        Optional<Usuario> usuarioEncontrado = ObterPorId(usuario.getId());

        if (usuarioEncontrado.isEmpty()) {
            throw new ResourceNotFoundException("Item não encontrado (inexistente)");
        }

        ExcluirUsuario(usuario.getId());

        usuarios.add(usuario);

        return usuario;
    }
}
