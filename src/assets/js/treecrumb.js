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
  'use strict';

  $('.treecrumb').each(function() {
    var $that = $(this);
    $that.on('hide.bs.dropdown', function() {
      $that.find('.dropdown-toggle span').removeClass('icon--bottom');
      $that.find('.dropdown-toggle span').addClass('icon--right');
    });
    $that.on('show.bs.dropdown', function(e) {
      var target = e.relatedTarget;
      $that.find('.dropdown-toggle span').removeClass('icon--bottom');
      $that.find('.dropdown-toggle span').addClass('icon--right');
      $(target).find('span').removeClass('icon--right');
      $(target).find('span').addClass('icon--bottom');
    });
  });

}) (jQuery);
