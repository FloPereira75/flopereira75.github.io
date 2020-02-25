function parallax() {
    const parallax = document.querySelector('.header');
    const parallaxKiloRen = document.querySelector('.bckg-img-btw-article');
    const parallaxStormTrooper = document.querySelector('.image-after-article');

    window.addEventListener('scroll', () => {
        parallax.style.backgroundPositionY = window.scrollY / 3 + "px";
    });

    window.addEventListener('scroll', () => {
        parallaxKiloRen.style.backgroundPositionY = window.scrollY / 3 + "px";
    });

    window.addEventListener('scroll', () => {
        parallaxStormTrooper.style.backgroundPositionX = window.scrollY / 15 + "px";
    });
};

parallax();






$(document).ready(function() {
    /* Ouvrir le menu */
    $('.menu-btn').click(function() {
        $('.header_menu').css('display', 'block');
    });

    /* Fermer le menu */
    $('.close-btn').click(function() {
        $('.header_menu').css('display', 'none');
    });

})