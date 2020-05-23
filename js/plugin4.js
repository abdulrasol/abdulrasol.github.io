/* global $, window */
/* jshint esversion: 6 */
let navbar_list = $('.navbar .navbar-list');
let nav_height = $('nav').innerHeight();
let navbar_control = $('.navbar .navbar-control #mobile-nav-btn');
let move_to_skill = $('#move-to-skills');
let skills = $('#skills');
let mobile_nav_btn = document.getElementById("mobile-nav-btn");
var main_navbar = $(".navbar-container .navbar");
$('document').ready(function () {
    'use strict';
    $('.navbar .uk-list li').click(function(event) {
        /* Act on the event */
        var id = $(this).data('id');
        var sr = $('#'+id).offset().top;
        //console.log($(this).text());
        if ($(this).text() === 'Home') {
            $('html').animate({scrollTop: 0}, 400);
        } else {
            $('html').animate({scrollTop: (sr - 25)}, 400);
        }
        if ($(window).width() <= 800){
            navbar_list.slideToggle('slow');
        }
        $(this).addClass('active').siblings().removeClass('active');
        mobile_nav_btn.style.transform = 'rotateX(0deg)';
        
    });

    //
    move_to_skill.on('click', event => {
        $('html').animate({scrollTop: (skills.offset().top - 85)}, 400);
    });


    $('.port ul.filter-tags li').click(function(event) {
        /* Act on the event */
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).data('filter') === 'all') {
            $('.filter').find('li').fadeIn(400);
        } else {
            var data_filter = $(this).data('filter');
            $('.filter li').siblings().fadeOut(400);
            $('.filter').find('[filter='+data_filter+']').fadeIn(400);
        }
    });

    // nice scroll plugin
    /*
    $("body").niceScroll({
        cursorcolor:"#1e87f07c",
        cursorwidth:"5px"
    });
    */
});
//triggerShuflle('shuflle');
mobile_nav_btn.addEventListener('click', event => {
    navbar_list.slideToggle('slow');
});

// When the user scrolls the page, execute myFunction
window.onscroll = function() {
    var height = $(window).scrollTop(),
    width = $(window).width();
    if (height > nav_height){
        main_navbar.css({
            "position": "fixed",
            'left': '0px',
            'top':'0px',
        });
    }
    else{
       main_navbar.css({
        "position": "relative"
    });
   }
   let sr =$(window).scrollTop()
   let skill_bar = $('.about-me .skills').offset().top
   if (sr > (skill_bar-450)) {
    //$('.about-me .skills .skill:nth-child(1) .skill-bar span').animate({'width': '90%'}, 400)
};

};

function triggerShuflle(elemet_id = 'shuflle'){
    let shuflle = document.getElementById(elemet_id);
    let btns = shuflle.querySelectorAll('.filter-tags li');
    let ports = shuflle.querySelectorAll('.filter li');
    btns.forEach(function (btn) {
        btn.addEventListener('click', e => {
            data_filter = e.target.dataset.filter;
            ports.forEach(e => {
                if(data_filter === 'all'){
                    shuflle.querySelectorAll('.filter li').forEach(item => {
                        item.style.display = 'block';
                    })
                }
                else {
                    shuflle.querySelectorAll('.filter li').forEach(item => {
                        item.style.display = 'none';
                    });
                    shuflle.querySelectorAll('[filter='+data_filter+']').forEach(item=>{
                        item.style.display = 'block';
                    })
                }
            })
        })
    })
}

