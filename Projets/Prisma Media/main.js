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