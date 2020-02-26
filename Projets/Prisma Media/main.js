/* Effet de parallaxe */ 
function parallax() {
    const parallaxHeader = document.querySelector('.parallax-header');
    const parallaxKiloRen = document.querySelector('.parallax-kiloren');
    const parallaxStormTrooper = document.querySelector('.parallax-stromtrooper');

    window.addEventListener('scroll', () => {
        parallaxHeader.style.backgroundPositionY = window.scrollY / 3 + "px";
    });

    window.addEventListener('scroll', () => {
        parallaxKiloRen.style.backgroundPositionY = window.scrollY / 3 + "px";
    });

    window.addEventListener('scroll', () => {
        parallaxStormTrooper.style.backgroundPositionX = window.scrollY / 10 + "px";
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