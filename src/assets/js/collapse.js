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
  'use strict';

  // Normal Collapse
  $('.collapse:not(tbody)').on('show.bs.collapse', function () {
    $(this)
      .prev()
      .addClass('active icon--root')
      .removeClass('icon--greater')
      .attr({
        'aria-selected': 'true',
        'aria-expanded': 'true'
      });
  });
  $('.collapse:not(tbody)').on('hide.bs.collapse', function () {
    $(this)
      .prev()
      .removeClass('active icon--root')
      .addClass('icon--greater')
      .attr( {
        'aria-selected': 'false',
        'aria-expanded': 'false'
      });
  });

  // Table Collapse

  $('tbody.collapse').on('show.bs.collapse', function () {
    $(this)
      .prev().find('[data-toggle=collapse]')
      .addClass('active')
      .attr({
        'aria-selected': 'true',
        'aria-expanded': 'true'
      });
  });
  $('tbody.collapse').on('hide.bs.collapse', function () {
    $(this)
      .prev().find('[data-toggle=collapse]')
      .removeClass('active')
      .attr({
        'aria-selected': 'false',
        'aria-expanded': 'false'
      });
  });

}) (jQuery);
