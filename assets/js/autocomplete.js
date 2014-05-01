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

  var bloodhound = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: $.map(data, function(state) { return { value: state }; })
  });

  bloodhound.initialize();

  $('#search-field').typeahead({
    hint: true,
    highlight: true,
    minLength: 1,
  },
  {
    name: 'search',
    displayKey: 'value',
    source: bloodhound.ttAdapter()
  });

}) (jQuery, searchData);