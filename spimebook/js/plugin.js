/*global $, window */
$('document').ready(function () {
    'use strict';
    var DOCUMENT = $('window');
    var mobile_navbar = $('#me-mobile-navbar');
    var main_navbar = $('#me-main-navbar')
    $(window).on('scroll', function(event) {
			var sc = $(window).scrollTop();
      if (sc >= 80) {
        mobile_navbar.css({
          position: 'fixed',
          top:'2px',
          left:'0px'
        });
      } else {
        mobile_navbar.css({
          position: 'relative',
          top:'0px'
        });
      }

			});
});
