(function($) {
  'use strict';

  /**
   * Contains the search logic.
   *
   * @param searchLinks All elements which shall be included in the search.
   * @constructor
   */
  function Search(searchLinks) {
    this.searchLinks = searchLinks;
  }

  /**
   * Searches the defined html elements and returns the result.
   *
   * Result format:
   * {
   *  "{group-name}": SearchResult[]
   * }
   *
   * @param filter The search term
   * @returns {{}}
   */
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

  /**
   * Does all UI stuff.
   *
   * @param search The search object to be used.
   * @param htmlElement The html element where to put the results to.
   * @constructor
   */
  function SearchUI(search, htmlElement) {
    this.htmlElement = $(htmlElement);
    this.searchResults = $('.search-results-list', $(htmlElement));
    this.search = search;
    this.minAmountOfChars = 2;
  }

  /**
   * Start listening for search terms on the given input element.
   *
   * @param htmlElement The input element
   */
  SearchUI.prototype.listen = function (htmlElement) {
    var that = this;
    $(htmlElement)
      .keyup(function() {
        that.onFilterChange(this);
      })
      .focusin(function() {
        that.onFocusIn();
      })
      .focusout(function() {
        that.onFocusOut();
      });
  };

  /**
   * Event handler for filter changes.
   *
   * @param input The input element on which the event occurred.
   */
  SearchUI.prototype.onFilterChange = function(input) {
    var filter = $(input).val();
    if (filter.length > 0) {
      this.htmlElement.addClass('has-input');
    } else {
      this.htmlElement.removeClass('has-input');
    }
    if (filter.length >= this.minAmountOfChars) {
      this.displayResults(search.search(filter));
    } else {
      this.displayMessage('input-required');
    }
  };

  /**
   * Handles focus in of search input.
   */
  SearchUI.prototype.onFocusIn = function() {
    this.htmlElement.addClass('focused');
  };

  /**
   * Handles focus out of search input.
   */
  SearchUI.prototype.onFocusOut = function() {
    this.htmlElement.removeClass('focused');
  };

  /**
   * Displays the given results.
   *
   * @param results The results
   */
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

  /**
   * Displays a message
   *
   * @param messageId The translation id of the message in the context styleguide.global-search
   */
  SearchUI.prototype.displayMessage = function(messageId) {
    this.searchResults.empty();
    this.searchResults.html(window.translations['global-search'][messageId]);
  };

  /**
   * Holds a search result.
   *
   * @param title The results title
   * @param link The results link
   * @constructor
   */
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
