    // Navegação do windows menu
    document.getElementById('minimizeButton').onclick = () => {
        window.electron.minimizeWindow();
    };

    document.getElementById('closeButton').onclick = () => {
        window.electron.closeWindow();
    };

    document.getElementById('maximizeButton').onclick = () => {
        window.electron.toggleFullscreen();
    };

    const buttons = ['minimizeButton', 'maximizeButton', 'closeButton'];

    buttons.forEach(buttonId => {
        document.getElementById(buttonId).ondragstart = function() {
            return false;
        };
    });