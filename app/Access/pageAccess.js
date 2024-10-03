// TODO: Aqui vou ter que inserir um código que vai verificar se o usuário tem acesso a página que ele está tentando acessar
// Se ele não tiver acesso, vou redirecionar ele para a página de login
// O redirecionamento das outras páginas será feito no arquivo de configuração do sistema
console.log("hello");
function homeAccess() {
    
    const pagePath = "../wwwroot/pages/homePage.html";
    fetch(pagePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main').innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar a página:', error));
}


// Do login vou receber o token e o id do usuário, que eu vou salvar no localStorage

// Adicionar também o logout, que vai remover o token e o id do usuário do localStorage