/* ==========================================================
 * mobile-table.js
 * Add the first fixed column on mobile
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-06-03 09:37:23
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  $(document).ready(function () {
    mobileTable($);
  });

  $(window).resize(function() {
    mobileTable($);
  });

}) (jQuery);

function mobileTable ($) {
  $(".table-bordered").each(function () {
    if ($(window).width() < 767){
      if($(this).find('tbody tr th:first-child').length !== 0){

        // Fix caption height
        var captionHeight = $(this).find("caption").height();
        captionHeight += 10;

        // Wrap table with helper class
        $(this).addClass('table-fixed').wrap('<div class="table-fixed-wrapper" style="padding-top: '+captionHeight+'px;"><div class="table-fixed-container"></div></div>');

        // Add fixed cell class
        $(this).find('th:first-child, td:first-child').addClass('cell-fixed');
        $(this).find('th:first-child:last-child, td:first-child:last-child').css('margin', 0);
        $('<td style="border:none;">&nbsp;</td>').insertAfter($(this).find('th:first-child:last-child, td:first-child:last-child'));

        // Fix row height
        $(this).find("tr").each(function () {
          var maxHeight = 0;
          $(this).find("td, th").each(function () {
            if($(this).height() > maxHeight) {
              maxHeight = $(this).height();
            }
          });
          $(this).find("td, th").height(maxHeight);
        });
      } else {

      }
    }
  });
}