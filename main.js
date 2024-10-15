const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

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
