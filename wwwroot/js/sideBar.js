const sideBar = document.getElementById('sideBar');
const hamburguer = document.getElementById('hamburguer');

let isExpanded = false;
let isAnimating = false;
let buttonAnimating = false; 

const originalWidth = '3.2rem';
const expandedWidth = '16rem';

hamburguer.addEventListener('click', function() {
    if (isAnimating || buttonAnimating) return;

    isAnimating = true; 

    if (isExpanded) {
        sideBar.style.width = originalWidth;

        buttonAnimating = true;
        for (let i = 0; i <= 3; i++) {
                document.getElementById(`page[${i}]`).style.width = '3.2rem';
                if (i === 3) {
                    buttonAnimating = false; 
                }
        }
    } else {
        sideBar.style.width = expandedWidth;

        buttonAnimating = true;
        for (let i = 0; i <= 3; i++) {
            setTimeout(() => {
                document.getElementById(`page[${i}]`).style.width = '16rem';
                if (i === 3) {
                    buttonAnimating = false;
                }
            }, 100 * i);
        }
    }

    isExpanded = !isExpanded;

    setTimeout(() => {
        isAnimating = false; 
    }, 300); 
});
