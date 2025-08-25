/* global $, window */
/* jshint esversion: 6 */
$('document').ready(function () {
    'use strict';
    $('.navbar .uk-list li').click(function(event) {
        /* Act on the event */
        if ($(window).width() <= 800){
            $('.navbar').slideToggle('slow');
        }
        $(this).addClass('active').siblings().removeClass('active');
        
    });
    // nice scroll plugin
    /*
    $("body").niceScroll({
        cursorcolor:"#1e87f0",
        cursorwidth:"10px"
    });
    */
});

let mobile_nav_btn = document.getElementById("mobile-nav-btn");
mobile_nav_btn.addEventListener('click', event => {
    $('.navbar').slideToggle('slow').removeClass('scrolled');
});


// When the user scrolls the page, execute myFunction
var main_navbar = $(".navbar-container");
var btn = $('.mobile-nav-btn');
window.onscroll = function() {
    var height = $(window).scrollTop(),
    width = $(window).width();
    if (height > 151){
        main_navbar.addClass('scrolled');
        //$('.fix').height(main_navbar.height());
    }
    else{
        main_navbar.removeClass('scrolled');

    }
    let sr =$(window).scrollTop()
    let skill_bar = $('.about-me .skills').offset().top
    if (sr > (skill_bar-450)) {
    //$('.about-me .skills .skill:nth-child(1) .skill-bar span').animate({'width': '90%'}, 400)
};

};

