/* ==========================================================
 * rich-menu.js
 * Add overlay when openning a rich yamm menu and define open/close events
 *
 * Author: Yann Gouffon, yann@antistatique.net
 * Date:   2014-04-30 11:48:48
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 =========================================================== */

(function($) {

  // Keep jQuery object in variables
  var $yamm = $('.yamm'),
      $yammClose = $('.yamm-close, .yamm-close-bottom'),
      $body = $('body'),
      $dropdown = $('.dropdown'),
      $dropdownToggle = $('.dropdown-toggle'),
      $dropdownMenu = $('.dropdown-menu');

  // Toggle overlay
  $yamm.each(function () {
    var $that = $(this);
    $that.on('click', '.dropdown-toggle', function () {
      if ($(this).parent().hasClass('open')){
        $('.overlay').hide();
        $that.removeClass('nav-open');
      } else {
        $that.find($dropdown).removeClass('open');
        $that.find($dropdown).removeClass('active');
        $('.overlay').show();
        $that.addClass('nav-open');
      }
    });
  });

  // Disable outside click
  $yamm.find($dropdown).on({
      "shown.bs.dropdown": function() {
          $(this).data('closable', false);
       },
      "hide.bs.dropdown": function() {
          return $(this).data('closable');
      }
  });

  $yamm.on("click", '.yamm-close, .yamm-close-bottom, .dropdown-toggle', function() {
      $(this).parents($dropdown).data('closable', true);
  });

  // Disable dropdown-menu closing click
  $(document).on('click', '.yamm .dropdown-menu', function (e) {
    e.stopPropagation();
  });

  // Trigger close yamm menu
  $dropdown.each(function () {
    var $that = $(this);
    $that.find($yammClose).click( function (e) {
      e.preventDefault();
      $that.find($dropdownToggle).trigger("click");
    });
  });

}) (jQuery);
