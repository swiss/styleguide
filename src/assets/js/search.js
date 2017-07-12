(function($) {
  'use strict';

  function Search(searchLinks) {
    this.searchLinks = searchLinks;
  }

  Search.prototype.search = function(filter) {
    var results = {};
    this.searchLinks.each(function() {
      var title = $(this).html();
      var group = $('.dropdown-toggle', $(this).closest('.dropdown')).html();
      if (title.toLowerCase().indexOf(filter) < 0) {
        return;
      }
      if (!results[group]) {
        results[group] = [];
      }
      results[group].push(new SearchResult(title, $(this).attr('href')));
    });
    return results;
  };

  function SearchUI(search, htmlElement) {
    this.searchResults = $('.search-results-list', $(htmlElement));
    this.search = search;
  }

  SearchUI.prototype.listen = function (htmlElement) {
    var that = this;
    $(htmlElement).keyup(function() {
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
    if (!Object.keys(results).length) {
      this.displayMessage('nothing-found');
      return;
    }
    this.searchResults.empty();
    for (var group in results) {
      var groupResults = results[group];
      var title = $('<h3></h3>').html(group);
      var list = $('<ul></ul>');
      for (var i in groupResults) {
        var result = groupResults[i];
        var item = $('<li></li>')
          .append($('<a></a>', {
            html: result.title,
            href: result.link
          }));
        list.append(item);
      }
      this.searchResults.append(title);
      this.searchResults.append(list);
    }

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
  var standardUI = new SearchUI(search, $('.global-search-standard'));
  standardUI.listen($('.global-search-standard .search-input'));
  var mobileUI = new SearchUI(search, $('.global-search-mobile'));
  mobileUI.listen($('.global-search-mobile .search-input'))

})(jQuery);
