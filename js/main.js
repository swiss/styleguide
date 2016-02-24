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

/* ==========================================================
 * carousel.js
 * Carousel helper
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-05-15 13:55:53
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {
  'use strict';

  $(window).load(function () {
    carouselInit(jQuery);
  });

  $(window).resize(function () {
    carouselInit(jQuery);
  });

  // slideshow counter
  var slideshow_total = $('.carousel-slideshow .item').length;
  $('#carousel-total').text(slideshow_total);

  $('.carousel-slideshow').on('slid.bs.carousel', function () {
    var carouselData = $(this).data('bs.carousel');
    var currentIndex = carouselData.getItemIndex(carouselData.$element.find('.item.active'));
    var total = carouselData.$items.length;

    var text = (currentIndex + 1);

    $('#carousel-index').text(text);
    $('#carousel-total').text(total);
  });

}) (jQuery);

function carouselInit($) {
  'use strict';

  var $carousel = $('.carousel:not(.carousel-slideshow)');

  $('.carousel .item:first-child').addClass('first');
  $('.carousel .item:last-child').addClass('last');

  $('.carousel').each(function() {
    disableControl($(this));
  });
  $('.carousel').on('slid.bs.carousel', function () {
    disableControl($(this));
  });

  if($carousel) {
    $carousel.each(function () {
      var biggestHeight = 0,
          titleHeight = $(this).find('.item.active h3:first-child').height(),
          imgHeight = $(this).find('.item.active .carousel-img').height();

      $(this).find('.carousel-indicators, .carousel-control').css('top', titleHeight + imgHeight + 50);

      $(this).find('.item').each(function () {
        if ($(this).height() >= biggestHeight) {
          biggestHeight = $(this).height();
        }
      });
      $(this).find('.item').height(biggestHeight);
    });
  }
}

function disableControl(element) {
  'use strict';

  if (element.find('.first').hasClass('active')) {
    element.find('.left').addClass('disabled').attr('aria-disabled', 'true');
  } else {
    element.find('.left').removeClass('disabled').attr('aria-disabled', 'false');
  }
  if (element.find('.last').hasClass('active')) {
    element.find('.right').addClass('disabled').attr('aria-disabled', 'true');
  } else {
    element.find('.right').removeClass('disabled').attr('aria-disabled', 'false');
  }
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
  'use strict';

  // Normal Collapse
  $('.collapse:not(tbody)').on('show.bs.collapse', function () {
    $(this)
      .prev()
      .addClass('active icon--root')
      .removeClass('icon--greater')
      .attr({
        'aria-selected': 'true',
        'aria-expanded': 'true'
      });
  });
  $('.collapse:not(tbody)').on('hide.bs.collapse', function () {
    $(this)
      .prev()
      .removeClass('active icon--root')
      .addClass('icon--greater')
      .attr( {
        'aria-selected': 'false',
        'aria-expanded': 'false'
      });
  });

  // Table Collapse

  $('tbody.collapse').on('show.bs.collapse', function () {
    $(this)
      .prev().find('[data-toggle=collapse]')
      .addClass('active')
      .attr({
        'aria-selected': 'true',
        'aria-expanded': 'true'
      });
  });
  $('tbody.collapse').on('hide.bs.collapse', function () {
    $(this)
      .prev().find('[data-toggle=collapse]')
      .removeClass('active')
      .attr({
        'aria-selected': 'false',
        'aria-expanded': 'false'
      });
  });

}) (jQuery);

/* ==========================================================
 * drilldown.js
 * Drilldown plugin scripts. For page-list-nav element
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-05-30 09:02:09
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {
  'use strict';

var options = {
  event: 'click', // * View note below
  selector: 'a',  // * View note below
  speed: 100,
  cssClass: {
    container: 'drilldown-container',
    root: 'nav-page-list',
    sub: 'drilldown-sub',
    back: 'drilldown-back'
  }
};

$('.drilldown').drilldown(options);

}) (jQuery);

/* ==========================================================
 * global-nav.js
 * Global Navigation syripts
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-05-27 16:36:15
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {
    'use strict';

// Handle scroll to position nav as fixed

var top = 36;

$(window).scroll(function () {

  var y = $(this).scrollTop();

  if (y >= top) {
    if (!$('.nav-mobile').hasClass('fixed')) {
      $('.nav-mobile').addClass('fixed')
        .after('<div class="nav-mobile-spacer" id="spacer" style="height:36px;"></div>');
    }
  }
  else {
    if ($('.nav-mobile').hasClass('fixed')) {
      $('.nav-mobile').removeClass('fixed');
      $('#spacer').remove();
    }
  }

});
}) (jQuery);

// OUTLINE.JS
// https://github.com/lindsayevans/outline.js
//
// Based on http://www.paciellogroup.com/blog/2012/04/how-to-remove-css-outlines-in-an-accessible-manner/
//
// Hide outline on mouse interactions
// Show it on keyboard interactions
(function(doc){

  'use strict';

  var styleElement = doc.createElement('STYLE'),
      domEvents = 'addEventListener' in doc,
      addListener = function(type, callback){
        // Basic cross-browser event handling
        if (domEvents) {
          doc.addEventListener(type, callback);
        } else {
          doc.attachEvent('on' + type, callback);
        }
      },
      setCSS = function(cssText){
        !!styleElement.styleSheet ? styleElement.styleSheet.cssText = cssText : styleElement.innerHTML = cssText;
      };

  doc.getElementsByTagName('HEAD')[0].appendChild(styleElement);

  // Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
  addListener('mousedown', function(){
    setCSS(':focus{outline:0!important}::-moz-focus-inner{border:0!important}');
  });

  addListener('keydown', function(){
    setCSS('');
  });

})(document);

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
  'use strict';

  // Keep jQuery object in variables
  var $yamm = $('.yamm'),
      $yammClose = $('.yamm-close, .yamm-close-bottom'),
      $dropdown = $('.yamm .dropdown'),
      $dropdownToggle = $('.yamm .dropdown-toggle');

  // Toggle dropdown and fix z-index errors
  $yamm.each(function () {
    var $that = $(this);
    $that.on('click', '.dropdown-toggle', function () {
      if (!$(this).parent().hasClass('open')){
        var dropdownHeight = $(window).height() - 49;
        $that.find('.drilldown-container').height( dropdownHeight );
      }
    });
  });

  $dropdownToggle.on('click', function() {
    $(this).parents($dropdown).trigger('get.hidden');
  });

  $dropdown.on({
      "shown.bs.dropdown": function() { this.closable = false; },
      "get.hidden":        function() { this.closable = true; }
  });

  $('.dropdown').on('show.bs.dropdown', function () {
    $dropdown.removeClass('open');
    $yamm.removeClass('nav-open');
    $(this).parents($yamm).addClass('nav-open');
  });

  $dropdown.on('hide.bs.dropdown', function () {
    // only remove the nav-open class if effectively closing dropdown
    if (this.closable) {
      $yamm.removeClass('nav-open');
    }
    return this.closable;
  });

  $(document).on('click', function(e) {
    // hide dropdown if dropdown is open and target is not in dropdown
    if ($('.dropdown.open').length > 0 && $(e.target).parents('.dropdown').length === 0) {
        $('.dropdown.open .dropdown-toggle').trigger('click');
    }
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
  'use strict';

  $(document).ready(function(){
    $('select').chosen({
      disable_search_threshold: 10
    });
  });

}) (jQuery);

/* ==========================================================
 * shame.js
 * DOM rewritting on mobile, issue #160
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-06-18 15:57:23
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {
  'use strict';

  $(document).ready(function () {
    var id;
    var isCarouselified = false;
    var isCollapsified = false;
    carouselify();
    collapsify();

    $(window).resize(function() {
      clearTimeout(id);
      id = setTimeout(resizeLauncher, 500);
    });

    function resizeLauncher() {
      carouselify();
      collapsify();
    }

    function carouselify() {
      var $tabFocus = $('.tab-focus'),
          focusIndex = 0;

      if($tabFocus && $(window).width() <= 767 && !isCarouselified ) {
        isCarouselified = true;

        $tabFocus.each(function () {
          var $that = $(this),
              itemIndex = -1;

          focusIndex += 1;

          $that.attr('id', 'tab-focus-'+focusIndex);
          $that.next('.nav-tabs').hide();
          // Prevent those mobile-only carousels from riding automatically by setting interval to 0
          $that.addClass('carousel slide').removeClass('tab-content tab-border').attr('data-interval', 0);
          $that.wrapInner('<div class="carousel-inner"></div>');
          $that.prepend('<ol class="carousel-indicators"></ol>');

          $that.find('.tab-pane').each(function () {
            itemIndex += 1;
            $(this).removeClass('tab-pane in active').addClass('item');
            $that.find('.carousel-indicators').append('<li data-target="#tab-focus-' + focusIndex + '" data-slide-to="' + itemIndex + '"></li>');
          });
          $that.find('.item:first').addClass('active');
          $that.find('.carousel-indicators li:first-child').addClass('active');

          $that.append('<a class="left carousel-control icon icon--before icon--less" href="#tab-focus-' + focusIndex + '" data-slide="prev"></a><a class="right carousel-control icon icon--before icon--greater" href="#tab-focus-' + focusIndex + '" data-slide="next"></a>');
        });
      }
      else if($tabFocus && $(window).width() > 767 && isCarouselified) {
        isCarouselified = false;

        $tabFocus.each(function () {
          var $that = $(this);

          focusIndex -= 1;
          $that.attr('id', '');
          $that.next('.nav-tabs-focus').css('display', 'flex'); // we can't use .show() because it should be a flex wrapper
          $that.removeClass('carousel slide').addClass('tab-content tab-border');
          $that.find('ol.carousel-indicators').remove();

          $that.find('.item').each(function () {
            $(this).addClass('tab-pane').removeClass('item');
            $(this).css('height', 'auto');
          });
          $that.find('.tab-pane:first-child').addClass('active in');

          if ( $that.find('.tab-pane').parent().hasClass('carousel-inner') ) {
            $that.find('.tab-pane').unwrap();
          }

          $that.find('.carousel-control').remove();
        });
      }
    }

    function collapsify() {
      var $navTab = $('.nav-tabs:not(.focus)'),
          $collapsify = $('.collapsify'),
          linkIndex = 0;

      if($navTab && $(window).width() <= 767 && !isCollapsified ) {
        isCollapsified = true;

        $navTab.not('.tab-focus').each(function (){
          var $that = $(this);

          $that.removeClass('nav-tabs').addClass('collapsify');
          $that.next('.tab-content').hide();

          $that.find('a').each(function (){
            var $target = $(this).attr('href');
            linkIndex += 1;
            $(this).unwrap();
            $('<div class="collapse" id="collapse-' + linkIndex + '">' + $($target).html() + '</div>').insertAfter(this);
            $(this).attr('data-toggle', 'collapse');
            $(this).attr('data-target', '#collapse-' + linkIndex);
            $(this).addClass('collapse-closed');
            $(this).click(function(){
              $(this).toggleClass('collapse-closed');
            });
          });
          //$that.find('a:first-child').removeClass('collapse-closed').next('.collapse').addClass('in');
        });
      }
      else if($collapsify && $(window).width() > 767 && isCollapsified) {
        isCollapsified = false;

        $collapsify.each(function (){
          var $that = $(this);

          $that.addClass('nav-tabs').removeClass('collapsify');
          $that.next('.tab-content').show();

          $that.find('a').each(function (){
            linkIndex -= 1;
            $(this).wrap('<li></li>');
            $(this).parent().next('.collapse').remove();
            $(this).attr('data-toggle', 'tab');
            $(this).attr('data-target', '');
            $(this).removeClass('collapse-closed');
          });

          $that.find('li a').each(function () {
            var $tabTarget = $(this).attr('href');
            if($($tabTarget).hasClass('active')){
              $(this).parent().addClass('active');
            }
          });
        });
      }
    }
  });

}) (jQuery);

/* ==========================================================
 * subnavigation.js
 * Sub-navigation scripts, handles mainly how the nav-page-list behaves on small
 * screens
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-09-24 10:18:19
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {
  'use strict';

  subNavInit(jQuery);
  $(window).resize(function () {
    subNavInit(jQuery);
  });

  $('a[href=#collapseSubNav]').on('click', function() {
    $(this).attr('aria-expanded', ($(this).attr('aria-expanded') === 'true' ? 'false' : 'true') );
  });

}) (jQuery);

function subNavInit($) {
  'use strict';

  var $drilldown = $('.drilldown[class*=col-]');

  if ($(window).width() <= 767 && !$drilldown.hasClass('collapse-enabled')) {
    $drilldown
      .addClass('collapse-enabled')
      .find('.drilldown-container')
      .addClass('collapse')
      .attr('id', 'collapseSubNav');
  } else if ($(window).width() > 767 && $drilldown.hasClass('collapse-enabled')) {
    $drilldown
      .removeClass('collapse-enabled')
      .find('.drilldown-container')
      .removeClass('collapse in')
      .attr('id', '')
      .css({
        'height': 'auto'
      });
  }
}

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
  'use strict';

  $('.table-sort').tablesorter();

}) (jQuery);

 /* ==========================================================
  * tabs.js
  * JS for the tabs and tab-focus elements
  *
  * Copyright 2014 Federal Chancellery of Switzerland
  * Licensed under MIT
  ========================================================== */

(function($) {
  'use strict';

  /**
   * @constructor
   * @param {Object} domNode
   */
  function TabFocus(element) {
    this.$wrapper = $(element).parent();
    this.domNodes = '.tab-focus, .nav-tabs-focus';
    this.delay = 3000;
    this.playing = null;
    this.interval = null;

    this.$wrapper
      .on('click', '.nav-tabs-focus', function() {
        this.pause(null, true);
      }.bind(this))
      .on('click', '.tab-focus-control', function() {
        if (this.playing) {
          this.pause(null, true);
        } else {
          this.play(null, true);
        }
      }.bind(this));

    this.play(null, true);
  }

  TabFocus.prototype = {
    addListeners: function() {
      this.$wrapper
        .on('mouseenter.tabfocus focus.tabfocus', this.domNodes, this.pause.bind(this))
        .on('mouseleave.tabfocus blur.tabfocus', this.domNodes, this.play.bind(this));
    },

    removeListeners: function() {
      this.$wrapper
        .off('mouseenter.tabfocus focus.tabfocus', this.domNodes)
        .off('mouseleave.tabfocus blur.tabfocus', this.domNodes);
    },

    play: function(event, startListening) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(this.slide.bind(this), this.delay);

      if (startListening) {
        this.playing = true;
        this.addListeners();
        this.$wrapper.find('.tab-focus-control .icon').removeClass('icon--play').addClass('icon--pause');
      }
    },

    pause: function(event, stopListening) {
      clearInterval(this.interval);

      if (stopListening) {
        this.playing = false;
        this.removeListeners();
        this.$wrapper.find('.tab-focus-control .icon').removeClass('icon--pause').addClass('icon--play');
      }
    },

    slide: function() {
      var $nav = this.$wrapper.find('.nav-tabs-focus');

      // If the nav is hidden, it means the focus has been changed for a carousel (mobile)
      // We don’t want to slide automatically anymore
      if ($nav.is(':hidden')) {
        return this.pause(null, true);
      }

      if ($nav.find('> li').length) {
        var tabs = this.$wrapper.find('.nav-tabs-focus > li'),
            activeTab = tabs.filter('.active'),
            nextTab = activeTab.next('li'),
            newTab = nextTab.length ? nextTab.find('a') : tabs.eq(0).find('a');

        newTab.tab('show');
      }
    }
  };

  $.fn.tabFocus = function() {
    return this.each(function() {
      if (!$.data(this, 'TabFocus')) {
        $.data(this, 'TabFocus', new TabFocus(this));
      }
    });
  };

  $('.tab-focus').tabFocus();

})(jQuery);

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
  'use strict';

  $('.treecrumb').each(function() {
    var $that = $(this);
    $that.on('hide.bs.dropdown', function() {
      $that.find('.dropdown-toggle span').removeClass('icon--bottom');
      $that.find('.dropdown-toggle span').addClass('icon--right');
    });
    $that.on('show.bs.dropdown', function(e) {
      var target = e.relatedTarget;
      $that.find('.dropdown-toggle span').removeClass('icon--bottom');
      $that.find('.dropdown-toggle span').addClass('icon--right');
      $(target).find('span').removeClass('icon--right');
      $(target).find('span').addClass('icon--bottom');
    });
  });

}) (jQuery);
