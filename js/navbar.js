const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        navbar.classList.add('navbar--hidden');
    } else {
        navbar.classList.remove('navbar--hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});