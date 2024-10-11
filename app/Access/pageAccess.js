// TODO: Aqui vou ter que inserir um código que vai verificar se o usuário tem acesso a página que ele está tentando acessar
// Se ele não tiver acesso, vou redirecionar ele para a página de login
// O redirecionamento das outras páginas será feito no arquivo de configuração do sistema

// function homeAccess() {
//    
//     const pagePath = "../wwwroot/pages/homePage.html";
//     fetch(pagePath)
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('main').innerHTML = data;
//         })
//         .catch(error => console.error('Erro ao carregar a página:', error));
// }

function homeAccess(url) {
        switch (url) {
            case 'homePage':
                // TODO: Fazer verificação de token e id do usuário aqui
                window.location.href = "../wwwroot/pages/homePage.html";

                break;
            case 'forgotPassword':
                accessPage('homePage');
                break;
            case 'signUp':
                accessPage('signUp');
                break;
            default:
                window.location.href = "../../wwwroot/index.html";
                break;
        }
}


// Do login vou receber o token e o id do usuário, que eu vou salvar no localStorage

// Adicionar também o logout, que vai remover o token e o id do usuário do localStorage

function accessPage(url) {
    const pagePath = url !== "index" ? "../../wwwroot/pages/" + url + ".html" : "../../wwwroot/index.html";
    // const pagePath = "../../wwwroot/pages/" + url + ".html";
    fetch(pagePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar a página');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("menuPages").innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar a página:', error);
            let errorConfirm = confirm("Ocorreu um erro no carregamento da página. Voltar ao menu principal?");
            if (errorConfirm) {
                accessPage('index');
            } else {
                window.close();
            }
        });
}

function logoutUser(){
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
    window.location.href = "../../wwwroot/index.html";
}


