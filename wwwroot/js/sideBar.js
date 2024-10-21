const sideBar = document.getElementById('sideBar');
const hamburguer = document.getElementById('hamburguer');
const buttonsText = document.querySelectorAll('.bottom__button--text');

let isExpanded = false;
let isAnimating = false;
let buttonAnimating = false;

const originalWidth = '3.2rem';
const expandedWidth = '16rem';

hamburguer.addEventListener('click', function() {
    if (isAnimating || buttonAnimating) return;

    isAnimating = true;

    if (isExpanded) {
        closeSideBar();
    } else {
        openSideBar();
    }

    isExpanded = !isExpanded;

    setTimeout(() => {
        isAnimating = false;
    }, 300);
});

function openSideBar() {
    hamburguer.classList.toggle('active');
    sideBar.style.width = expandedWidth;
    setTimeout(() => {
        document.getElementById('hamburguerText').style.display = 'block';
        document.getElementById('logoutText').style.display = 'block';
    }, 120);

    buttonAnimating = true;
    for (let i = 0; i <= 3; i++) {
        setTimeout(() => {
            document.getElementById(`page[${i}]`).style.width = '16rem';
            buttonsText[i].style.display = 'block';
            if (i === 3) {
                buttonAnimating = false;
            }
        }, 100 * i);
    }
}

function closeSideBar() {
    hamburguer.classList.toggle('active');
    sideBar.style.width = originalWidth;
    document.getElementById('hamburguerText').style.display = 'none';
    document.getElementById('logoutText').style.display = 'none';

    buttonAnimating = true;
    for (let i = 0; i <= 3; i++) {
        document.getElementById(`page[${i}]`).style.width = '3.2rem';
        buttonsText[i].style.display = 'none';

        if (i === 3) {
            buttonAnimating = false;
        }
    }
}

document.addEventListener('click', function(event) {
    if (isExpanded && !sideBar.contains(event.target) && !hamburguer.contains(event.target)) {
        closeSideBar();
        isExpanded = false;
    }
});
