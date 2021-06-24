$(document).ready(function() {

    function parallax() {
        /*** Effet parallaxe ***/
        $('.starwars-parallax').parallax({
            imageSrc: 'Asset/Assets/header.png',
            speed: 0.3
        });
        
        $('.kiloren-parallax').parallax({
            imageSrc: 'Asset/Assets/kiloren.jpg'
        });
        
        $('.stormtrooper-parallax').parallax({
            imageSrc: 'Asset/Assets/stormtroopers.jpg'
        });
    };
    parallax();

    function openMenu() {
        /*** Ouvrir le menu ***/
        $('.menu-btn').click(function() {
            $('.header_menu').show();
        });
    };
    openMenu();

    function closeMenu() {
        /*** Fermer le menu ***/
        $('.close-btn').click(function() {
            $('.header_menu').hide();
        });
    };
    closeMenu();
});