/* ==========================================================
 * print.js
 * Add print preview windows
 *
 * Author: Yann, yann@antistatique.net
 * Date: 2015-02-02
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {
  'use strict';

// Initialization
$.fn.printPreview = function() {
  return this;
};

$.printPreview = {

  printPreview: function(element) {
    var $body = $('body'),
        $container = $('.container-main'),
        footnoteLinks = "",
        linksIndex = 0;

    $body.find('.nav-mobile, .drilldown, .nav-main, .header-separator, .nav-service, .nav-lang, .form-search, .yamm--select, header > div:first-child, footer, .alert, .icon--print, .social-sharing, form, .nav-process, .carousel-indicators, .carousel-control, .breadcrumb, .pagination-container').remove();

    // if an element is passed, we want it to be the only thing to print out
    if (element) {
      element = $('[data-print=' + element + ']').clone(); // clone to fix issue with IE render
      var header = $('header').clone(), // clone to fix issue with IE render
          title = element.attr('data-title') ? '<h1>' + element.attr('data-title') + '</h1>' : '';
      $container.addClass('print-element').html('').append(header, title, element);
    }

    $body.addClass('print-preview');

    $container.prepend('<div class="row" id="print-settings">'+
      '<div class="col-sm-12">'+
        '<nav class="pagination-container clearfix">'+
          '<span class="pull-left">'+
            '<input type="checkbox" id="footnote-links">&nbsp;&nbsp;'+
            '<label for="footnote-links">Links as footnotes</label>'+
          '</span>'+
          '<ul class="pull-right">'+
            '<li>'+
              '<button id="print-button" title="print" class="btn"><span class="icon icon--print"></span></button>'+
              '&nbsp;&nbsp;'+
              '<button id="close-button" title="close" class="btn btn-secondary"><span class="icon icon--close"></span></button>'+
            '</li>'+
          '</ul>'+
        '</nav>'+
      '</div>'+
    '</div>');

    $('#print-button').click(function () {
      $.printPreview.printProcess();
    });

    $('#close-button').click(function () {
      $.printPreview.printClose();
    });


    $('a').not('.access-keys a').each(function () {
      var target = $(this).attr('href');
      target = String(target);

      if (target !== "undefined" && target.indexOf("http") === 0) {
        linksIndex ++;
        footnoteLinks += '<li>'+target+'</li>';
        $('<sup class="link-ref">('+linksIndex+')</sup>').insertAfter(this);
      }
    });


    $('#footnote-links').change(function(){
      if (this.checked) {
        $container.append('<div id="footnote-links-wrapper" class="row footnote-links-wrapper">'+
          '<div class="col-sm-12">'+
          '<h3>Page Links</h3><hr>'+
          '<ol>'+
            footnoteLinks+
          '</ol>'+
          '</div>'+
        '</div>');
        $body.addClass('print-footnotes');
      } else {
        $('#footnote-links-wrapper').remove();
        $body.removeClass('print-footnotes');
      }
    });
  },

  printProcess: function() {
    window.print();
  },

  printClose: function() {
    window.location.reload();
  }

};

}) (jQuery);
