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