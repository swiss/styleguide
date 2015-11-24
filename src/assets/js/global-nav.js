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
    'use strict';

// Handle scroll to position nav as fixed

var top = 36;

$(window).scroll(function () {

  var y = $(this).scrollTop();

  if (y >= top) {
    if (!$('.nav-mobile').hasClass('fixed')) {
      $('.nav-mobile').addClass('fixed')
        .after('<div class="nav-mobile-spacer" id="spacer" style="height:36px;"></div>');
    }
  }
  else {
    if ($('.nav-mobile').hasClass('fixed')) {
      $('.nav-mobile').removeClass('fixed');
      $('#spacer').remove();
    }
  }

});
}) (jQuery);
