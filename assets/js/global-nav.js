/* ==========================================================
 * global-nav.js
 * Global Navigation syripts
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-05-27 16:36:15
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

 (function($) {

  // Handle scroll to position nav as fixed

  var top = $('.nav-mobile').offset().top;


  $(window).scroll(function (event) {

    var y = $(this).scrollTop();

    if (y >= top) {
      $('.nav-mobile').addClass('fixed');
    }
    else {
      $('.nav-mobile').removeClass('fixed');
    }

  });
 }) (jQuery);