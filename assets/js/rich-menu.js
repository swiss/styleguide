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

  var $yamm = $('.yamm'),
      $yammClose = $('.yamm-close'),
      $body = $('body'),
      $dropdown = $('.dropdown'),
      $dropdownToggle = $('.dropdown-toggle'),
      $dropddownMenu = $('.dropdown-menu');

  $yamm.find($dropdownToggle).click(function () {
    if ($(this).parent().hasClass('open')){
      $body.removeClass('overlay');
    } else {
      $body.addClass('overlay');
    }
  });

  $yamm.find($dropdown).on({
      "shown.bs.dropdown": function() {
          $(this).data('closable', false);
      },
      "click": function() {
          $(this).data('closable', true);
      },
      "hide.bs.dropdown": function() {
          return $(this).data('closable');
      }
  });

  $yamm.find($dropddownMenu).click(function(e) {
      e.stopPropagation();
  });

  $yamm.each(function () {
    var $that = $(this);
    $that.find($yammClose).click( function (event) {
      event.preventDefault();
      $that.find($dropdownToggle).trigger("click");
    });
  });

}) (jQuery);
