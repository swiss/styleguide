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
  'use strict';

  var $searchFields = $('.form-search .search-field');
  if (data) {
    // Init the Bloodhound suggestion engine
    var bloodhound = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(data, function(state) { return { value: state }; })
    });
    bloodhound.initialize();

    // Init Typeahead on search-fields
    $searchFields.typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
    },
    {
      name: 'search',
      displayKey: 'value',
      source: bloodhound.ttAdapter()
    });
  }

  // Insert the icons
  $searchFields.after('<span class="icon icon--close" data-form-search-clear></span>');
  $('.form-search').append('<button class="icon icon--search icon--before"></button>');

  $('body').on('click', '[data-form-search-clear]', function () {
    $('#search-field').val('').focus(); // clear search field and refocus it
  });

}) (jQuery, (typeof searchData === 'undefined' ? false : searchData));
