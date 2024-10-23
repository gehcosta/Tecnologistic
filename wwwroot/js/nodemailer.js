/* TODO: Implementar o envio do código e comparar com o código gerado no backend 
     - O banco irá salvar o código gerado e o e-mail do usuário que enviou, o horário de envio e o horário de expiração
     - Depois irá comparar o código enviado por e-mail com o código gerado que se se encontra no banco;
     - Se o código for igual e o horário de expiração não tiver passado, o usuário poderá redefinir a senha ou cadastrar o usuário.
     - A senha deve ser criptografada antes de ser salva no banco.
     - Irá aparecer um popup para inserir o código. Se for para redefinir, irá redirecionar para outra tela, se for para 
     cadastrar, irá mostrar um popup de cadastro realizado com sucesso.
 */

function sendForgetEmail() {
    event.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const sendEmailBtn = document.getElementById('sendEmailBtn');

    sendEmailBtn.disabled = true;

    const subject = "Solicitação de redefinição de senha";
    const message = "Olá, tudo bem?";

    window.electron.sendEmail({ to: email, subject: subject, message: message });

    window.electron.onEmailStatus((status) => {
        sendEmailBtn.disabled = false;
        status ? showPopup('Sucesso', 'E-mail enviado com sucesso.') : showPopup('Falha na recuperação', 'E-mail inexistente, tente novamente.');
        return true;
    });
}

function sendSignUpEmail () {
    event.preventDefault();

    const nameInput = document.getElementById('nameInput').value;
    const lastNameInput = document.getElementById('lastNameInput').value;
    const emailInput = document.getElementById('emailInput').value;
    const passwordInput = document.getElementById('passwordInput').value;
    const confirmPassInput = document.getElementById('confirmPassInput').value;
    const sendSignupBtn = document.getElementById('sendSignupBtn');
    
    if (nameInput === '' || lastNameInput === '' || emailInput === '' || passwordInput === '' || confirmPassInput === '') {
        showPopup('Falha no cadastro', 'Preencha todos os campos.');
        return false;
    }
    if (nameInput.length < 3 || lastNameInput.length < 3) {
        showPopup('Falha no cadastro', 'Os campos de nome e sobrenome devem conter no mínimo 3 caracteres.');
        return false;
    }
    if (passwordInput !== confirmPassInput) {
        showPopup('Falha no cadastro', 'As senhas devem ser iguais.');
        return false;
    }
    if (!isPasswordValid(passwordInput)) {
        showPopup('Falha no cadastro', 'A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um caractere especial e um número.');
        return false;
    }
    
    sendSignupBtn.disabled = true;

    const subject = "Cadastro de usuário";
    const message = `Olá ${nameInput} ${lastNameInput}, tudo bem? Seja bem-vindo ao nosso sistema!`;

    window.electron.sendEmail({ to: emailInput, subject: subject, message: message });

    window.electron.onEmailStatus((status) => {
        sendSignupBtn.disabled = false;
        status ? showPopup('Sucesso', 'Verifique seu e-mail na sua caixa de mensagem.') : showPopup('Falha no cadastro', 'E-mail inexistente, tente novamente.');
        return true;
    });
}

function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?]{8,}$/
    ;
    return passwordRegex.test(password);
}
