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
      $yammClose = $('.yamm-close'),
      $body = $('body'),
      $dropdown = $('.dropdown'),
      $dropdownToggle = $('.dropdown-toggle'),
      $dropddownMenu = $('.dropdown-menu');

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
  $(document).on('click', '.yamm .dropdown-menu', function(e) {
    e.stopPropagation();
  });

  // Trigger close yamm menu
  $yamm.each(function () {
    var $that = $(this);
    $that.find($yammClose).click( function (event) {
      event.preventDefault();
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