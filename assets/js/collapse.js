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
  $('.collapse').on('show.bs.collapse', function () {
    $(this)
      .prev()
      .addClass('active icon--root')
      .removeClass('icon--greater')
      .attr({
        'aria-selected': 'true',
        'aria-expended': 'true'
      });
  });
  $('.collapse').on('hide.bs.collapse', function () {
    $(this)
      .prev()
      .removeClass('active icon--root')
      .addClass('icon--greater')
      .attr( {
        'aria-selected': 'false',
        'aria-expended': 'false'
      });
  });

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