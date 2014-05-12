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

  // Normal Collapse

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

  // Table Collapse

  var $tableToggle = $('th[data-toggle="collapse"], td[data-toggle="collapse"]');

  checkCollapseTableStatus();

  $tableToggle.click(function () {
    console.log('hello');
    setTimeout(function(){
      checkCollapseTableStatus();
    }, 360);
  });

  function checkCollapseTableStatus() {
    $tableToggle.each(function () {
      var $collapseTarget = $(this).data('target');
      $(this).removeClass('icon--bottom').addClass('icon--right');
      if($($collapseTarget).hasClass('in')){
        $(this).addClass('icon--bottom').removeClass('icon--right');
      }
    });
  }

}) (jQuery);