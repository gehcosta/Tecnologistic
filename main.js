const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const nodemailer = require('nodemailer');

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  // Para Gmail
  port: 587,
  secure: false,
  auth: {
    user: "tecnologisticsceui@gmail.com",
    pass: "qovi upwy jrud symw ",
  },
});

// Função para enviar o e-mail
async function sendEmail(emailData) {
  try {
    const info = await transporter.sendMail({
      from: '"Tecnologistic" <tecnologisticsceui@gmail.com>', // Endereço do remetente
      to: emailData.to, // Destinatário
      subject: emailData.subject, // Assunto
      text: emailData.message, // Corpo do e-mail (texto)
      html: emailData.message, // Corpo do e-mail (HTML)
    });

    console.log("Message sent: %showPopup", info.messageId);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Mantém a referência global da janela principal para evitar que o Garbage Collector a feche.
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    width: 1280,
    minWidth: 540,
    height: 720,
    minHeight: 700,
    frame: false,
    icon: path.join(__dirname, 'resources/icons/tecnologistic_icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'app/win/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
  });

  mainWindow.loadFile('wwwroot/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Ouve o evento de envio de e-mail
ipcMain.on('send-email', async (event, emailData) => {
  const status = await sendEmail(emailData);
  event.reply('email-status', status);
});

// Alterna entre maximizar e restaurar a janela
ipcMain.on('toggle-fullscreen', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();  // Restaura a janela ao tamanho original
  } else {
    mainWindow.maximize();  // Maximiza a janela
  }
});

ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.on('close-window', () => {
  mainWindow.close();
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
