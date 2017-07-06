(function($) {
  'use strict';

  function Search(searchLinks, searchInput) {
    this.searchLinks = searchLinks;
    this.searchInput = searchInput;
    this.init();
  }

  Search.prototype.init = function () {
    console.log(this.searchInput);
    console.log(this.searchLinks);
    var that = this;
    $(this.searchInput).on('change', function(event) {
      var filter = $(this).val().toLowerCase();
      that.searchLinks.each(function() {
        var title = $(this).html().toLowerCase();
        if (title.indexOf(filter) >= 0) {
          console.log(title, $(this).attr('href'));
        }
      });
    });
  };

  Search.prototype.update = function() {

  };

  console.log('ok');

  new Search($('a'), $('.styleguides-search'));

})(jQuery);
