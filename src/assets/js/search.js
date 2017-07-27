(function($) {
  'use strict';

  var datasets = [];
  $('.dropdown.yamm-fw').each(function() {
    var title = $('.dropdown-toggle', $(this)).html();
    var links = $('.dropdown-menu li a', $(this));
    var suggestions = [];
    links.each(function() {
        suggestions.push({
            title: $(this).html(),
            link: $(this).attr('href')
        });
    });
    if (!suggestions.length) {
      return;
    }
    var engine = new Bloodhound({
      initialize: true,
      local: suggestions,
      identify: function(obj) {
        return obj.link;
      },
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
      queryTokenizer: Bloodhound.tokenizers.whitespace
    });
    datasets.push({
      display: 'title',
      source: engine,
      templates: {
        empty: function() {
          return [
            '<li><h3>',
              title,
            '</h3></li>',
            '<li>',
              window.translations['global-search']['nothing-found'],
            '</li>',
          ].join('');
        },
        header: function() {
          return [
            '<li><h3>',
              title,
            '</h3></li>'
          ].join('');
        },
        dataset: '<ul><ul>',
        suggestion: function (data) {
          return '<li><a href="' + data.link + '">' + data.title + '</a></li>';
        }
      }
    });
  });

  function initTypeahead(element) {
    $('.search-input', element).typeahead({
      highlight: true,
      menu: $('.search-results .search-results-list', element),
      classNames: {
        suggestion: '',
        cursor: 'active'
      }
    }, datasets)
    .on('typeahead:selected', function (event, selection) {
  		event.preventDefault();
      $(this).typeahead('val', '')
        .closest('.global-search').removeClass('has-input');
  		window.location.replace(selection.link);
  	})
    .on('typeahead:open', function() {
      $(this).closest('.global-search').addClass('focused');
      console.log($(this).typeahead('val'));
    })
    .on('typeahead:close', function () {
      $(this).closest('.global-search').removeClass('focused');
    })
    .on('keyup', function (event) {
      if (event.keyCode === 27) { // ESC
        $(this).closest('form').trigger('reset');
      } else if ($(this).typeahead('val')) {
          $(this).closest('.global-search').addClass('has-input');
      } else {
        $(this).closest('.global-search').removeClass('has-input');
  		}
  	});

    $('form', element)
      .on('submit', function() {
        return false;
      })
      .on('reset', function() {
        $('.search-input', this).blur().typeahead('val', '');
        $(this).closest('.global-search').removeClass('has-input');
      });

    $('.search-reset', element).on('click', function() {
      $(this).closest('form').trigger('reset');
    });
  }

  initTypeahead($('.global-search-standard'));
  initTypeahead($('.global-search-mobile'));

})(jQuery);
