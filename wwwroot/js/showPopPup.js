function showPopup(titleText, messageText) {
    // Verifica se já existe um pop-up na página
    if (document.querySelector('.popup')) {
        return; 
    }

    // Cria o contêiner do pop-up
    const popup = document.createElement('div');
    popup.className = 'popup';

    // Cria o conteúdo do pop-up
    const popupContent = document.createElement('div');
    popupContent.className = 'popup__container';

    // Cria o botão de fechar
    const closeButton = document.createElement('button');
    closeButton.className = 'popup__close';
    closeButton.innerHTML = 'OK';
    closeButton.onclick = function() {
        popupContent.classList.remove('show');
        setTimeout(() => document.body.removeChild(popup), 115);
    };

    // Adiciona o título
    const title = document.createElement('h2');
    title.className = 'popup__title';
    title.textContent = titleText;

    // Adiciona a linha horizontal
    const hr = document.createElement('hr');
    hr.className = 'popup__hr';

    // Adiciona a mensagem
    const message = document.createElement('p');
    message.className = 'popup__message';
    message.textContent = messageText;

    // Monta o conteúdo do pop-up
    popupContent.appendChild(title);
    popupContent.appendChild(hr);
    popupContent.appendChild(message);
    popupContent.appendChild(closeButton);
    popup.appendChild(popupContent);

    // Adiciona o pop-up ao corpo da página
    document.body.appendChild(popup);

    setTimeout(() => {
        popupContent.classList.add('show');
    }, 10);
}
