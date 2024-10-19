const sideBar = document.getElementById('sideBar');
const hamburguer = document.getElementById('hamburguer');

let isExpanded = false;

const originalWidth = '3.2rem'; 

const expandedWidth = '16rem'; 

hamburguer.addEventListener('click', function() {
    if (isExpanded) {
        setTimeout(() => {
            sideBar.style.width = originalWidth;
        }, 250);
        for (let i = 0; i <= 3; i++) {
            document.getElementById(`page[${i}]`).style.width = '3.2rem';
        }
        
    } else {
        sideBar.style.width = expandedWidth;
        for (let i = 0; i <= 3; i++) {
            setTimeout(() => {
                document.getElementById(`page[${i}]`).style.width = '16rem';
            }, 300 * i);
        }
    }
    // Inverte o estado
    isExpanded = !isExpanded;
});