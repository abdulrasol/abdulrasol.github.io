/* global $, $, window, document,*/
/* jshint esversion: 6 */

var navbar_list = $('.navbar .navbar-list'),
    //navbar_control = $('.navbar .navbar-control #mobile-nav-btn'),
    move_to_skill = $('#move-to-skills'),
    skills = $('#skills'),
    mobile_nav_btn = document.getElementById("mobile-nav-btn"),
    main_navbar = $(".navbar-container .navbar");
    $('document').ready(function () {
        'use strict';
        $('.navbar .uk-list li').click(function () {
            /* Act on the event */
            var id = $(this).data('id'),
            sr = $('#' + id).offset().top;
            if ($(this).text() === 'Home') {
                $('html').animate({
                    scrollTop: 0
                }, 400);
            } else {
                $('html').animate({
                    scrollTop: (sr - 25)
                }, 400);
            }
            if ($(window).width() < 801) {
                navbar_list.slideToggle('slow');
            }
            $(this).addClass('active').siblings().removeClass('active');
            mobile_nav_btn.style.transform = 'rotateX(0deg)';

        });

    //
    move_to_skill.on('click', function () {
        $('html').animate({
            scrollTop: (skills.offset().top - 85)
        }, 400);
    });


    $('.port ul.filter-tags li').click(function () {
        /* Act on the event */
        $(this).addClass('active').siblings().removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).data('filter') === 'all') {
            $('.filter').find('li').fadeIn(400);
        } else {
            var data_filter = $(this).data('filter');
            $('.filter li').siblings().fadeOut(0);
            $('.filter').find('[filter=' + data_filter + ']').fadeIn(400);
        }
    });

    //nice scroll plugin
    /*
    $("body").niceScroll({
        cursorcolor:"#1e87f07c",
        cursorwidth:"5px"
    });
    */
});
    'use strict';
    mobile_nav_btn.addEventListener('click', function () {
        navbar_list.slideToggle('slow');
    });

// When the user scrolls the page, execute myFunction

window.onscroll = function () {
    var sr = $(window).scrollTop();
    if (sr > 108) {
        main_navbar.css({
            "position": "fixed",
            'left': '0px',
            'top': '0px'
        });
    } else {
        main_navbar.css({
            "position": "relative"
        });
    }
    //console.log(sr)
    if (sr < 264) {
        $('li[data-id=home]').addClass('active').siblings().removeClass('active');
    } else if (sr > 265 && sr < 881) {
        $('li[data-id=about-me]').addClass('active').siblings().removeClass('active');
    } else if (sr > 882 && sr < 1499) {
        $('li[data-id=servies]').addClass('active').siblings().removeClass('active');
    } else if (sr > 1500 && sr < 2255) {
        $('li[data-id=portfolio]').addClass('active').siblings().removeClass('active');
    } else if (sr > 2255) {
        $('li[data-id=contact-me]').addClass('active').siblings().removeClass('active');
    }
};
