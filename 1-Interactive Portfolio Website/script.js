
const toggleButton = document.getElementById('toggle-button');
const sideMenu = document.getElementById('mobile-side-menu');
const sideMenuLink = document.querySelectorAll('#side-menu-link');
const backToTop = document.getElementById('backToTop');
const navbar = document.getElementById('navbar');

window.addEventListener('load',()=>{
    window.scrollTo({top: 0, behavior: 'smooth'});
})

toggleButton.addEventListener('click', () => {
    if (sideMenu.style.display == 'none') {
        sideMenu.style.display = 'flex';
    } else {
        sideMenu.style.display = 'none';
    }
});

sideMenuLink.forEach(btn => {
    btn.addEventListener('click',()=>{
        if (sideMenu.style.display != 'none') {
            sideMenu.style.display = 'none';
        }
    })
});

backToTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

window.addEventListener('scroll', () => {

    if (window.scrollY > 100) {
        navbar.classList.add('fixed-position');
    } else {
        navbar.classList.remove('fixed-position');
    }

    if (window.scrollY > 500) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});