/* ==========================================================
 * tablesorter.js
 * Control tablesort from markup
 *
 * Author: Simon Perdrisat, simon@antistatique.net
 * Date:   2014-05-01 11:11:33
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */


(function($) {

  var $tables = $('.table-sort');

  $tables.tablesorter();

  $tables.each(function () {
    $table = $(this);
    $table.find('thead th').click(function () {
      var $headers = $(this).attr('id');
      $table.find('td, th').each(function () {
        if ($(this).attr('headers') === $headers || $(this).attr('id') === $headers) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
    });
  });

}) (jQuery);