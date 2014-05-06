/* ==========================================================
 * collapse.js
 * Add class when nav collapse is open
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-05-06
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  var $toggleButton = $('button[data-toggle="collapse"]');

  checkCollapseStatus();

  $toggleButton.click(function () {
    console.log('hello');
    setTimeout(function(){
      checkCollapseStatus();
    }, 360);
  });

  function checkCollapseStatus() {
    $toggleButton.each(function () {
      var $collapseTarget = $(this).data('target');
      $(this).removeClass('active').removeClass('icon--root').addClass('icon--greater');
      if($($collapseTarget).hasClass('in')){
        $(this).addClass('active').addClass('icon--root').removeClass('icon--greater');
      }
    });
  }

}) (jQuery);