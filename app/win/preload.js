const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),

    // Expor a funcionalidade de enviar e-mail
    sendEmail: (emailData) => ipcRenderer.send('send-email', emailData),

    // Escuta o status do envio do e-mail
    onEmailStatus: (callback) => ipcRenderer.on('email-status', (event, status) => callback(status)),
});
