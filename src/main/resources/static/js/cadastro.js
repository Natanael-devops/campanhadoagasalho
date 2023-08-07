
async function carregarDadosDoacoes() {
  

    try {
      const response = await fetch('/api/doacoes');
      if (!response.ok) {
        throw new Error('Falha ao carregar os dados das doações.');
      }
      const dados = await response.json();
      return dados;
    } catch (error) {
      console.error('Erro ao carregar os dados das doações:', error);
      return [];
    }
  }
  
  // Função para popular a tabela com os dados das doações
  async function popularTabelaDoacoes() {
    const dadosDoacoes = await carregarDadosDoacoes();
  
    const tabela = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa o conteúdo da tabela antes de preencher com os novos dados
  
    for (const doacao of dadosDoacoes) {
      const novaLinha = tabela.insertRow();
  
      const celulaTipo = novaLinha.insertCell(0);
      const celulaTamanho = novaLinha.insertCell(1);
      const celulaGenero = novaLinha.insertCell(2);
      const celulaEditar = novaLinha.insertCell(3);
      const celulaExcluir = novaLinha.insertCell(4);
  
      celulaTipo.innerText = doacao.tipo;
      celulaTamanho.innerText = doacao.tamanho;
      celulaGenero.innerText = doacao.genero;
  
      // Botão de editar
      const editarButton = document.createElement('button');
      editarButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      editarButton.addEventListener('click', () => {
        console.log('Botão de editar clicado com ID:', doacao.id); // Verificação no console
        editarDoacao(doacao.id);
      });
      celulaEditar.appendChild(editarButton);
  
      // Botão de excluir
      const excluirButton = document.createElement('button');
      excluirButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      excluirButton.addEventListener('click', () => {
        excluirDoacao(doacao.id);
      });
      celulaExcluir.appendChild(excluirButton);
    }
  }

  
  function editarDoacao(id) {
    // Fazer a requisição GET para a API usando o ID fornecido para obter os dados da doação
    const url = `/api/doacoes/${id}`;
    
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados da doação.');
        }
        return response.json();
      })
      .then((doacao) => {
        // Exibir o formulário de edição
        const formulario = document.createElement('form');
        formulario.setAttribute('action', '');
        formulario.setAttribute('id', 'idFormulario');

        const titulo = document.createElement('h5');
        titulo.innerText = 'Preencha os campos com os dados corretos:';
        formulario.appendChild(titulo);
    
        // Criar campos de edição com os dados da doação
        const inputTipo = document.createElement('input');
        inputTipo.setAttribute('type', 'text');
        inputTipo.setAttribute('id', 'inputTipo');
        inputTipo.setAttribute('value', doacao.tipo);
        formulario.appendChild(inputTipo);
    
        const inputTamanho = document.createElement('input');
        inputTamanho.setAttribute('type', 'text');
        inputTamanho.setAttribute('id', 'inputTamanho');
        inputTamanho.setAttribute('value', doacao.tamanho);
        formulario.appendChild(inputTamanho);
    
        const inputGenero = document.createElement('input');
        inputGenero.setAttribute('type', 'text');
        inputGenero.setAttribute('id', 'inputGenero');
        inputGenero.setAttribute('value', doacao.genero);
        formulario.appendChild(inputGenero);
    
        // Criação dos botões de enviar e cancelar
        const botaoEnviar = document.createElement('button');
        botaoEnviar.setAttribute('class', 'btn btn-primary');
        botaoEnviar.setAttribute('type', 'submit');
        botaoEnviar.setAttribute('style', 'font-weight: bold; margin: 10px');
        botaoEnviar.innerText = 'ENVIAR';
        formulario.appendChild(botaoEnviar);
    
        const botaoCancelar = document.createElement('button');
        botaoCancelar.setAttribute('class', 'btn btn-danger btn-primary');
        botaoCancelar.setAttribute('type', 'button');
        botaoCancelar.setAttribute('style', 'font-weight: bold; margin: 10px');
        botaoCancelar.innerText = 'CANCELAR';
        botaoCancelar.addEventListener('click', fecharFormulario);
        formulario.appendChild(botaoCancelar);
    
        // Adicionar o formulário à página
        const divisao = document.querySelector('.form-check');
        divisao.innerHTML = '';
        divisao.appendChild(formulario);
        formulario.scrollIntoView({ behavior: 'smooth' });
    
        // Evento de envio do formulário
        formulario.addEventListener('submit', function (event) {
          event.preventDefault(); // Evita que a página seja recarregada após o envio do formulário
    
          // Obtém os valores dos campos do formulário
          const tipo = inputTipo.value;
          const tamanho = inputTamanho.value;
          const genero = inputGenero.value;
    
          // Cria o objeto de atualização com os dados editados
          const dadosAtualizados = {
            tipo: tipo,
            tamanho: tamanho,
            genero: genero,
          };
    
          // Enviar requisição PUT para o servidor
          const urlAtualizacao = `/api/doacoes/${id}`;
          fetch(urlAtualizacao, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Erro ao atualizar a doação.');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Doação atualizada com sucesso:', data);
            fecharFormulario();
            popularTabelaDoacoes(); // Atualiza a tabela com os novos dados após a edição
            // Limpa a mensagem de erro, caso exista
            const mensagemErro = document.querySelector('.mensagemErro');
            mensagemErro.innerText = '';
          })
          .catch((error) => {
            console.error('Erro ao atualizar a doação:', error.message);
            // Exibe a mensagem de erro no elemento com a classe 'mensagemErro'
            const mensagemErro = document.querySelector('.mensagemErro');
            if (mensagemErro) {
              mensagemErro.innerText = error.message;
            }
          });
        });
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados da doação:', error);
        // Exibe a mensagem de erro no elemento com a classe 'mensagemErro'
        const mensagemErro = document.querySelector('.mensagemErro');
        if (mensagemErro) {
          mensagemErro.innerText = 'Erro ao carregar os dados da doação.';
        }
      });
  }
  
  
  async function excluirDoacao(id) {
    try {
      // Exibir o alerta de confirmação
      const confirmacao = window.confirm('Tem certeza de que deseja excluir esta doação?');
  
      // Se o usuário confirmar a exclusão, enviar a requisição DELETE
      if (confirmacao) {
        const url = `/api/doacoes/${id}`;
  
        // Enviar a requisição DELETE usando fetch
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Verificar se a resposta foi bem-sucedida (código 200-299)
        if (response.ok) {
          console.log(`Doação com ID ${id} excluída com sucesso.`);
          divMensagem = document.querySelector('.mensagemSucesso');
          divMensagem.innerText = 'Doação excluída com sucesso! '
          // Atualizar a tabela de doações após a exclusão
          popularTabelaDoacoes();
        } else {
          // Se a resposta não foi bem-sucedida, lançar um erro
          throw new Error('Erro ao excluir a doação.');
        }
      }
    } catch (error) {
      console.error('Erro ao excluir a doação:', error.message);
    }
  }
  
  
  // Chamar a função para popular a tabela com os dados das doações ao carregar a página
  popularTabelaDoacoes();

  
  
  
  //------------------------------------------------------------------------------------------------------


  function fecharFormulario() {
    const formulario = document.getElementById('idFormulario');
    formulario.remove(); // Remove o formulário da página
  
    // Mostra novamente o botão de cadastrar
    const botaoCadastrar = document.getElementById('novoItemButton');
    botaoCadastrar.style.display = 'block';
  }
  
    function criarInput(input, classe, nome, valor) {
      input.setAttribute('type', 'radio');
      input.setAttribute('class', classe);
      input.setAttribute('name', nome);
      input.setAttribute('id', valor);
      input.setAttribute('autocomplete', 'off')
      input.setAttribute('value', valor)
      return input
    }
  
    function criarLabel(classe, id, texto) {
      const label = document.createElement('label');
      label.setAttribute('class', classe);
      label.setAttribute('for', id);
      label.innerText = texto
      return label
    }


    //criei essa função pois estava repetindo muito código criando listeners para o formulário.
    function verificarChecked(input, form, div, div2, div3) {
      input.addEventListener('change', function(){
        if (input.checked == true) {
          form.appendChild(div);
          
          if(form.contains(div2)) {
            form.removeChild(div2);
          }
  
          if(form.contains(div3)) {
            form.removeChild(div3);
          }
        } else {
          if (form.contains(div)){
            form.removeChild(div);
          }
        }
  
      })
    }
  
  
    function cadastrarDoacao() {
      const formulario = document.createElement('form');
      
  
      formulario.setAttribute('action', '');
      formulario.setAttribute('id', 'idFormulario');
  
      const div1 = document.createElement('div');
  
      const titulo = document.createElement('h5');
      titulo.innerText = 'Selecione o tipo da peça doada:';
      formulario.appendChild(titulo);
  
  
      
      const divTamanhoCobertor = document.createElement('div');
      titulodiv2 = document.createElement('h5')
      titulodiv2.innerText = 'Selecione o tamanho do cobertor:';
      divTamanhoCobertor.appendChild(titulodiv2);
  
      const divTamanhoCalcado = document.createElement('div');
      titulodiv3 = document.createElement('h5')
      titulodiv3.innerText = 'Selecione o tamanho do calçado:';
      divTamanhoCalcado.appendChild(titulodiv3);
  
      const divTamanhoGenerico = document.createElement('div');
      tituloGenerico = document.createElement('h5');
      tituloGenerico.innerText = 'Selecione o tamanho da roupa:'
      divTamanhoGenerico.appendChild(tituloGenerico);
  
      const divGenero = document.createElement('div');
      tituloGenero = document.createElement('h5');
      tituloGenero.innerText = 'Selecione o gênero da roupa:'
      divGenero.appendChild(tituloGenero);
  
      
      // camiseta/camisa
      //input e label
      const inputCamisa = document.createElement('input');
      criarInput(inputCamisa,'btn-check', 'options-base', 'Camisa/Camiseta')
      inputCamisa.setAttribute('checked', 'checked')
      const labelCamisa = criarLabel('btn', 'Camisa/Camiseta','Camisa/Camiseta');
      
      div1.appendChild(inputCamisa);
      div1.appendChild(labelCamisa);
  
      //calça
      const inputCalca = document.createElement('input');
      criarInput(inputCalca, 'btn-check', 'options-base', 'Calça/Bermuda')
      const labelCalça = criarLabel('btn','Calça/Bermuda', 'Calça/Bermuda');
      div1.appendChild(inputCalca);
      div1.appendChild(labelCalça);
  
      //calçados
      const inputCalcado = document.createElement('input');
      criarInput(inputCalcado, 'btn-check', 'options-base', 'Calcados/Meias')
      const labelCalcado = criarLabel('btn','Calcados/Meias', 'Calçados/Meias');
      div1.appendChild(inputCalcado);
      div1.appendChild(labelCalcado);
  
      //casaco
      const inputCasaco = document.createElement('input');
      criarInput(inputCasaco, 'btn-check', 'options-base', 'Casaco')
      const labelCasaco = criarLabel('btn','Casaco', 'Casaco');
      div1.appendChild(inputCasaco);
      div1.appendChild(labelCasaco);
  
      //Cobertor
      const inputCobertor = document.createElement('input');
      criarInput(inputCobertor, 'btn-check', 'options-base', 'Cobertor');
      const labelCobertor = criarLabel('btn','Cobertor', 'Cobertor');
      div1.appendChild(inputCobertor);
      div1.appendChild(labelCobertor);
  
      //TAMANHOS
  
      //infantil
      const inputInfantil = document.createElement('input');
      criarInput(inputInfantil, 'btn-check', 'tamanho', 'infantil');
      const labelInfantil = criarLabel('btn', 'infantil', 'Infantil');
      divTamanhoGenerico.appendChild(inputInfantil);
      divTamanhoGenerico.appendChild(labelInfantil);
  
      //p
      const inputP = document.createElement('input');
      criarInput(inputP, 'btn-check', 'tamanho', 'P');
      const labelP = criarLabel('btn', 'P', 'P');
      divTamanhoGenerico.appendChild(inputP);
      divTamanhoGenerico.appendChild(labelP)
  
      //m
      const inputM = document.createElement('input');
      criarInput(inputM, 'btn-check', 'tamanho', 'M');
      inputM.setAttribute('checked', 'checked')
      const labelM = criarLabel('btn', 'M', 'M');
      divTamanhoGenerico.appendChild(inputM);
      divTamanhoGenerico.appendChild(labelM);
  
      //g
      const inputG = document.createElement('input');
      criarInput(inputG, 'btn-check', 'tamanho', 'G');
      const labelG = criarLabel('btn', 'G', 'G');
      divTamanhoGenerico.appendChild(inputG);
      divTamanhoGenerico.appendChild(labelG);
  
  
      //gg
      const inputGG = document.createElement('input');
      criarInput(inputGG, 'btn-check', 'tamanho', 'GG');
      const labelGG = criarLabel('btn', 'GG', 'GG');
      divTamanhoGenerico.appendChild(inputGG);
      divTamanhoGenerico.appendChild(labelGG);
  
  
      //solteiro
      const inputSolteiro = document.createElement('input');
      criarInput(inputSolteiro, 'btn-check', 'tamanho', 'solteiro');
      const labelSolteiro = criarLabel('btn', 'solteiro', 'Solteiro');
  
      divTamanhoCobertor.appendChild(inputSolteiro);
      divTamanhoCobertor.appendChild(labelSolteiro);
      
  
      //casal
      const inputCasal = document.createElement('input');
      criarInput(inputCasal, 'btn-check', 'tamanho', 'casal');
      const labelCasal = criarLabel('btn', 'casal', 'Casal');
  
      divTamanhoCobertor.appendChild(inputCasal);
      divTamanhoCobertor.appendChild(labelCasal);
  
      //33-36
      const inputt1 = document.createElement('input');
      criarInput(inputt1, 'btn-check', 'tamanho', '33-36');
      const labelt1 = criarLabel('btn', '33-36', '33-36');
  
      divTamanhoCalcado.appendChild(inputt1);
      divTamanhoCalcado.appendChild(labelt1);
  
      //37-39
      const inputt2 = document.createElement('input');
      criarInput(inputt2, 'btn-check', 'tamanho', '37-39');
      const labelt2 = criarLabel('btn', '37-39', '37-39');
  
      divTamanhoCalcado.appendChild(inputt2);
      divTamanhoCalcado.appendChild(labelt2);
  
      //40-42
      const inputt3 = document.createElement('input');
      criarInput(inputt3, 'btn-check', 'tamanho', '40-42');
      const labelt3 = criarLabel('btn', '40-42', '40-42');
  
      divTamanhoCalcado.appendChild(inputt3);
      divTamanhoCalcado.appendChild(labelt3);
  
      //43-46
      const inputt4 = document.createElement('input');
      criarInput(inputt4, 'btn-check', 'tamanho', '43-46');
      const labelt4 = criarLabel('btn', '43-46', '43-46');
  
      divTamanhoCalcado.appendChild(inputt4);
      divTamanhoCalcado.appendChild(labelt4);
  
      //GÊNEROS:
  
      const inputMasc = document.createElement('input');
      criarInput(inputMasc, 'btn-check', 'genero', 'Masculino');
      const labelMasc = criarLabel('btn', 'Masculino', 'Masculino');
      divGenero.appendChild(inputMasc);
      divGenero.appendChild(labelMasc);
  
  
      const inputFem = document.createElement('input');
      criarInput(inputFem, 'btn-check', 'genero', 'Feminino');
      inputFem.setAttribute('checked', 'checked')
      const labelFem = criarLabel('btn', 'Feminino', 'Feminino');
      divGenero.appendChild(inputFem);
      divGenero.appendChild(labelFem);
  
  
      const inputUni = document.createElement('input');
      criarInput(inputUni, 'btn-check', 'genero', 'Unissex');
      const labelUni = criarLabel('btn', 'Unissex', 'Unissex');
      divGenero.appendChild(inputUni);
      divGenero.appendChild(labelUni);
  
      formulario.appendChild(div1);
      formulario.appendChild(divTamanhoGenerico);
      formulario.appendChild(divGenero);
  
      const divBotoes = document.createElement('div'); // Cria a div para os botões

      const botaoEnviar = document.createElement('button');
      botaoEnviar.setAttribute('class', 'btn btn-primary');
      botaoEnviar.setAttribute('type', 'submit');
      botaoEnviar.setAttribute('style', 'font-weight: bold; margin: 10px');
      botaoEnviar.innerText = 'ENVIAR';
    
      const botaoCancelar = document.createElement('button');
      botaoCancelar.setAttribute('class', 'btn btn-danger btn-primary');
      botaoCancelar.setAttribute('type', 'button'); // O tipo do botão deve ser "button" para evitar o envio do formulário
      botaoCancelar.setAttribute('style', 'font-weight: bold; margin: 10px');
      botaoCancelar.innerText = 'CANCELAR';
      botaoCancelar.addEventListener('click', fecharFormulario);
    
      divBotoes.appendChild(botaoEnviar);
      divBotoes.appendChild(botaoCancelar);
    
       



      verificarChecked(inputCobertor, formulario, divTamanhoCobertor, divTamanhoCalcado, divTamanhoGenerico);
      verificarChecked(inputCalcado, formulario, divTamanhoCalcado, divTamanhoCobertor, divTamanhoGenerico);
      verificarChecked(inputCamisa, formulario, divTamanhoGenerico, divTamanhoCalcado, divTamanhoCobertor);
      verificarChecked(inputCalca, formulario, divTamanhoGenerico, divTamanhoCalcado, divTamanhoCobertor);
      verificarChecked(inputCasaco, formulario, divTamanhoGenerico, divTamanhoCalcado, divTamanhoCobertor);
      
  
  
      const divisao = document.querySelector('.form-check');
      divisao.innerHTML = '';
      formulario.appendChild(divBotoes);
      divisao.appendChild(formulario);
      formulario.scrollIntoView({ behavior: 'smooth' });
       const botaoCadastrar = document.getElementById('novoItemButton')
      botaoCadastrar.style.display = 'none';
  
  
      // Evento de envio do formulário
    document.getElementById('idFormulario').addEventListener('submit', function (event) {
      event.preventDefault(); // Evita que a página seja recarregada após o envio do formulário
  
      const meuformulario = event.target; // Captura o elemento do formulário
  
      // Obtém os valores dos campos do formulário
      const formData = new FormData(meuformulario);
      const dadosDoFormulario = {
        tipo: formData.get('options-base'),
        tamanho: formData.get('tamanho'),
        genero: formData.get('genero'),
      };
  
      enviarFormulario(dadosDoFormulario); // Enviar os dados para a função responsável por cadastrar a doação no servidor
  });
  
    //próximos passos: resolver a olítica do cors (tentando incrementar direto no repositorio do back end o front end), testar o botão de cadastro e terminar os botões editar e excluir.
  
       
  
  
  
    }
  
    function enviarFormulario(dadosDoFormulario, doacaoParaEditar = null) {
      const endpoint = doacaoParaEditar ? `/api/doacoes/${doacaoParaEditar.id}` : '/api/doacoes';
      const method = doacaoParaEditar ? 'PUT' : 'POST';
    
      fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosDoFormulario),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
          }
          if (response.headers.get('content-length') === '0') {
            throw new Error('Resposta vazia do servidor.');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Dados enviados com sucesso:', data);
          divMensagem = document.querySelector('.mensagemSucesso');
          divMensagem.innerText = 'Dados enviados com sucesso! ' + data.tipo + ', ' + data.tamanho + ', ' + data.genero + ' ' + '.';
          popularTabelaDoacoes();
          fecharFormulario();
    
          // Limpa a mensagem de erro, caso exista
          const mensagemErro = document.querySelector('.mensagemErro');
          mensagemErro.innerText = '';
        })
        .catch((error) => {
          console.error('Erro ao enviar o formulário:', error.message);
          // Exibe a mensagem de erro no elemento com a classe 'mensagemErro'
          const mensagemErro = document.querySelector('.mensagemErro');
          if (mensagemErro) {
            mensagemErro.innerText = error.message;
          }
        });
    }
    
  
  
    // Chamar a função para popular a tabela com os dados das doações ao carregar a página
    popularTabelaDoacoes();
  
    