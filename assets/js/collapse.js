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

  var $toggleButton = $('button[data-toggle="collapse"], th[data-toggle="collapse"], a[data-toggle="collapse"]');

  checkCollapseStatusInit();

  $toggleButton.click(function () {
    var $that = $(this);
    setTimeout(function(){
      checkCollapseStatus($that);
    }, 500);
  });

  function checkCollapseStatusInit() {
    $toggleButton.each(function () {
      var $collapseTarget = $(this).data('target');
      if ($collapseTarget === undefined) {
        $collapseTarget = $(this).attr('href');
      }
      $(this).removeClass('active').removeClass('icon--root').addClass('icon--greater').attr('aria-selected', 'false').attr('aria-expended', 'false');
      if($($collapseTarget).hasClass('in')){
        $(this).addClass('active').addClass('icon--root').removeClass('icon--greater').attr('aria-selected', 'true').attr('aria-expended', 'true');
      }
    });
  }

  function checkCollapseStatus($that) {
    var $collapseTarget = $that.data('target');
    if ($collapseTarget === undefined) {
      $collapseTarget = $that.attr('href');
    }
    $that.removeClass('active').removeClass('icon--root').addClass('icon--greater').attr('aria-selected', 'false').attr('aria-expended', 'false');
    if($($collapseTarget).hasClass('in')){
      $that.addClass('active').addClass('icon--root').removeClass('icon--greater').attr('aria-selected', 'true').attr('aria-expended', 'true');
    }
  }

  // Table Collapse

  var $tableToggle = $('th[data-toggle="collapse"], td[data-toggle="collapse"]');

  checkCollapseTableStatus();

  $tableToggle.click(function () {
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