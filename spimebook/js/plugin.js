/*global $, window */
$('document').ready(function () {
  'use strict';
  // Mobile Nav-bar
  var DOCUMENT = $('window');
  var mobile_navbar = $('#me-mobile-navbar');
  var main_navbar = $('#me-main-navbar')
  $(window).on('scroll', function (event) {
    var sc = $(window).scrollTop();
    if (sc >= 80) {
      mobile_navbar.css({
        position: 'fixed',
        top: '2px',
        left: '0px'
      });
    } else {
      mobile_navbar.css({
        position: 'relative',
        top: '0px'
      });
    }

  });

  //

//
});

var waypoints = $('#handler-first').waypoint(function(direction) {
  notify()
  UIkit.notification({message: 'this.element.id + ' hit 25% from top of window', status: 'primary'});
},
{
  offset: '25%'
})
