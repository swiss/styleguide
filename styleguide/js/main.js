/* ==========================================================
 * autocomplete.js
 * Deal with the Typeahead.js/Bloodhound library to build the search field autocomplete
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-05-01 14:23:18
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

if (typeof searchData != "undefined") {
  (function($, data) {

    var $searchField = $('#search-field');

    // Init the Bloodhound suggestion engine
    var bloodhound = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(data, function(state) { return { value: state }; })
    });
    bloodhound.initialize();

    // Init Typeahead on search-fields
    $searchField.typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
    },
    {
      name: 'search',
      displayKey: 'value',
      source: bloodhound.ttAdapter()
    });

    // Insert the icons
    $('<span class="icon icon--close" onclick="$(\'#search-field\').focus().val(\'\');"></span>').insertAfter($searchField);
    $('.form-search').append('<span class="icon icon--search"></span>');

  }) (jQuery, searchData);
}
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
/* ==========================================================
 * rich-menu.js
 * Add overlay when openning a rich yamm menu and define open/close events
 *
 * Author: Yann Gouffon, yann@antistatique.net
 * Date:   2014-04-30 11:48:48
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 =========================================================== */

(function($) {

  // Keep jQuery object in variables
  var $yamm = $('.yamm'),
      $yammClose = $('.yamm-close, .yamm-close-bottom'),
      $body = $('body'),
      $dropdown = $('.dropdown'),
      $dropdownToggle = $('.dropdown-toggle'),
      $dropdownMenu = $('.dropdown-menu');

  // Toggle overlay
  $yamm.find($dropdownToggle).click(function () {
    if ($(this).parent().hasClass('open')){
      $body.removeClass('overlay');
    } else {
      $body.addClass('overlay');
    }
  });

  // Disable outside click
  $yamm.find($dropdown).on({
      "shown.bs.dropdown": function() {
          $(this).data('closable', false);
       },
      "click": function() {
          $(this).data('closable', true);
      },
      "hide.bs.dropdown": function() {
          return $(this).data('closable');
      }
  });

  // Disable dropdown-menu closing click
  $(document).on('click', '.yamm .dropdown-menu', function (e) {
    e.stopPropagation();
  });

  // Trigger close yamm menu
  $dropdown.each(function () {
    var $that = $(this);
    $that.find($yammClose).click( function (e) {
      e.preventDefault();
      $that.find($dropdownToggle).trigger("click");
    });
  });

}) (jQuery);

/* ==========================================================
 * select.js
 * Scripts handling `select` elements
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-04-30 10:20:33
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  $(document).ready(function(){
    $('select').chosen({disable_search_threshold: 10});
  });

}) (jQuery);
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