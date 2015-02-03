/* ==========================================================
 * print.js
 * Add print preview windows
 *
 * Author: Yann, yann@antistatique.net
 * Date: 2015-02-02
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

 (function($) {

  // Initialization
  $.fn.printPreview = function() {
    return this;
  };
    
  $.printPreview = {

    printPreview: function() {
      var $body = $('body');

      $body.find('.nav-mobile, .drilldown, .nav-main, .header-separator, .nav-service, .nav-lang, .form-search, .yamm--select, header > div:first-child, footer, .alert, .icon--print, .social-sharing, form, .nav-process, .carousel-indicators, .carousel-control, .col-md-4, .breadcrumb').remove();
      $body.addClass('print-preview');
    },

    printProcess: function() {
      console.log('hello');
    }

  };

  $('a.truc').printPreview();
  $(document).bind('keydown', function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 80 && !$('body').hasClass('print-preview')) {
          $.printPreview.printPreview();
          return false;
      }
  });

 }) (jQuery);
