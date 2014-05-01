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
      $yammClose = $('.yamm-close'),
      $body = $('body'),
      $dropdown = $('.dropdown'),
      $dropdownToggle = $('.dropdown-toggle'),
      $dropddownMenu = $('.dropdown-menu');

  // Toggle overlay
  $yamm.find($dropdownToggle).click(function () {
    if ($(this).parent().hasClass('open')){
      $body.removeClass('overlay');
    } else {
      $body.addClass('overlay');
    }
  });

  // Disable outside click
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

  // Disable dropdown-menu closing click
  $(document).on('click', '.yamm .dropdown-menu', function(e) {
    e.stopPropagation();
  });

  // Trigger close yamm menu
  $yamm.each(function () {
    var $that = $(this);
    $that.find($yammClose).click( function (event) {
      event.preventDefault();
      $that.find($dropdownToggle).trigger("click");
    });
  });

}) (jQuery);

/* ==========================================================
 * select.js
 * Scripts handling `select` elements
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-04-30 10:20:33
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  $(document).ready(function(){
    $('select').chosen({disable_search_threshold: 10});
  });

}) (jQuery);
/* ==========================================================
 * treecrumb.js
 * Change icon class to change the caret direction
 *
 * Author: Yann Gouffon, yann@antistatique.net
 * Date:   2014-05-01 11:11:33
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  var $treecrumb = $('.treecrumb'),
      $dropdownToggle = $('.dropdown-toggle');

  $treecrumb.each(function () {
    var $that = $(this);
    $that.find($dropdownToggle).click(function () {
      if ($(this).parent().hasClass('open')){
        $that.find('.dropdown-toggle span').removeClass('icon--bottom');
        $that.find('.dropdown-toggle span').addClass('icon--right');
      } else {
        $that.find('.dropdown-toggle span').removeClass('icon--bottom');
        $that.find('.dropdown-toggle span').addClass('icon--right');
        $(this).find('span').removeClass('icon--right');
        $(this).find('span').addClass('icon--bottom');
      }
    });
  });

}) (jQuery);