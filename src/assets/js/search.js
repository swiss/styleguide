(function($) {
  'use strict';

  function Search(searchLinks) {
    this.searchLinks = searchLinks;
  }

  Search.prototype.search = function(filter) {
    var results = [];
    this.searchLinks.each(function() {
      var title = $(this).html();
      if (title.toLowerCase().indexOf(filter) >= 0) {
        results.push(new SearchResult(title, $(this).attr('href')));
      }
    });
    return results;
  };

  function SearchUI(search, htmlElement) {
    this.searchInput = $('.search-input', $(htmlElement));
    this.searchResults = $('.search-results', $(htmlElement));
    this.search = search;
    this.init();
  }

  SearchUI.prototype.init = function () {
    console.log(this.searchInput);
    var that = this;
    this.searchInput.keyup(function() {
      that.onFilterChange(this);
    });
  };

  SearchUI.prototype.onFilterChange = function(input) {
    var filter = $(input).val();
    if (filter.length > 1) {
      this.displayResults(search.search(filter));
    } else {
      this.displayMessage('input-required');
    }
  };

  SearchUI.prototype.displayResults = function(results) {
    if (!results.length) {
      this.displayMessage('nothing-found');
      return;
    }
    this.searchResults.empty();
    var list = $('<ul></ul>');
    for (var i in results) {
      var result = results[i];
      var item = $('<li></li>')
        .append($('<a></a>', {
          html: result.title,
          href: result.link
        }));
      list.append(item);
    }
    var group = $('.dropdown-toggle', $('#this').closest('.dropdown')).html();
    this.searchResults.append(list);

  };

  SearchUI.prototype.displayMessage = function(messageId) {
    this.searchResults.empty();
    this.searchResults.html(window.translations['global-search'][messageId]);
  };

  function SearchResult(title, link) {
    this.title = title;
    this.link = link;
  }

  var search = new Search($('.nav .dropdown-menu li > a'));
  new SearchUI(search, $('.global-search'));




})(jQuery);
