$(function() {


    /* Ouvrir le menu */
    $('.menu-btn').click(function() {
        $('.header_menu').css('right', '0%');
    });

    /* Fermer le menu */
    $('.close-btn').click(function() {
        $('.header_menu').css('right', '101%');
    });

})