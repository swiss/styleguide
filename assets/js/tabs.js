 /* ==========================================================
  * tabs.js
  * JS for the tabs and tab-focus elements
  *
  * Author: Toni Fisler, toni@antistatique.net
  * Date:   2014-09-09 09:58:14
  *
  * Copyright 2014 Federal Chancellery of Switzerland
  * Licensed under MIT
  ========================================================== */

(function($) {

  // Autoplay for tabs-focus elements
  var interval = 3000;
  var tabCarousel = setInterval(nextSlide, interval);

  $(document).on({
    mouseenter: function () {
      clearInterval(tabCarousel);
    },
    mouseleave: function () {
      tabCarousel = setInterval( nextSlide, interval);
    }
  }, ".tab-content.tab-focus, .nav-tabs.nav-tabs-focus");

  function nextSlide() {
    if ($('.nav-tabs-focus.nav-tabs > li').length) {
      var tabs = $('.nav-tabs-focus.nav-tabs > li'),
          active = tabs.filter('.active'),
          next = active.next('li'),
          toClick = next.length ? next.find('a') : tabs.eq(0).find('a');

      toClick.tab('show');
    }
  }

}) (jQuery);