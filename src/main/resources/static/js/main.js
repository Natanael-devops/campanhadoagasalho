async function atualizarQuantidadeItensDoados() {
  try {
    // Fazer a requisição GET para a API para obter a lista de doações
    const url = '/api/doacoes';
    const response = await fetch(url);
    const dadosDoacoes = await response.json();

    // Obter o elemento HTML onde queremos exibir a quantidade de itens doados
    const quantidadeItensElement = document.getElementById('currentCount');

    // Definir o texto com a quantidade de itens doados
    quantidadeItensElement.innerText = `${dadosDoacoes.length}`;
  } catch (error) {
    console.error('Erro ao atualizar a quantidade de itens doados:', error.message);
  }
}