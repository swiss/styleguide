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

  $(window).load(function () {
    carouselInit(jQuery);
  });

  $(window).resize(function () {
    carouselInit(jQuery);
  });

}) (jQuery);

function carouselInit ($) {
  var $carousel = $('.carousel');
  if($carousel) {
    $carousel.each(function () {
      var biggestHeight = 0,
          titleHeight = $(this).find('h3:first-child').height(),
          imgHeight = $(this).find('.carousel-img').height();

      $(this).find('.carousel-indicators').css('top', titleHeight + imgHeight + 40);
      $(this).find('.carousel-control').css('top', titleHeight + imgHeight + 50);

      $(this).find('.item').each(function () {
        if ($(this).height() >= biggestHeight) {
          biggestHeight = $(this).height();
        }
      });
      $(this).find('.item').height(biggestHeight);
    });
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

  // Normal Collapse

  var $toggleButton = $('button[data-toggle="collapse"]');

  checkCollapseStatusInit();

  $toggleButton.click(function () {
    var $that = $(this);
    setTimeout(function(){
      checkCollapseStatus($that);
    }, 500);
  });

  function checkCollapseStatusInit() {
    $toggleButton.each(function () {
      var $collapseTarget = $(this).data('target');
      $(this).removeClass('active').removeClass('icon--root').addClass('icon--greater');
      if($($collapseTarget).hasClass('in')){
        $(this).addClass('active').addClass('icon--root').removeClass('icon--greater');
      }
    });
  }

  function checkCollapseStatus($that) {
    var $collapseTarget = $that.data('target');
    $that.removeClass('active').removeClass('icon--root').addClass('icon--greater');
    if($($collapseTarget).hasClass('in')){
      $that.addClass('active').addClass('icon--root').removeClass('icon--greater');
    }
  }

  // Table Collapse

  var $tableToggle = $('th[data-toggle="collapse"], td[data-toggle="collapse"]');

  checkCollapseTableStatus();

  $tableToggle.click(function () {
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

  // Handle scroll to position nav as fixed

  var top = $('.nav-mobile').offset().top;


  $(window).scroll(function (event) {

    var y = $(this).scrollTop();

    if (y >= top) {
      $('.nav-mobile').addClass('fixed');
    }
    else {
      $('.nav-mobile').removeClass('fixed');
    }

  });
 }) (jQuery);
/* ==========================================================
 * mobile-table.js
 * Add the first fixed column on mobile
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-06-03 09:37:23
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  $(document).ready(function () {
    mobileTable($);
  });

  $(window).resize(function() {
    mobileTable($);
  });

}) (jQuery);

function mobileTable ($) {
  $(".table-bordered").each(function () {
    if ($(window).width() < 767){
      // Fix caption height
      var captionHeight = $(this).find("caption").height();
      captionHeight += 10;

      if($(this).find('tbody tr th:first-child').length !== 0){

        // Wrap table with helper class
        $(this).addClass('table-fixed').wrap('<div class="table-fixed-wrapper" style="padding-top: '+captionHeight+'px;"><div class="table-fixed-container"></div></div>');

        // Add fixed cell class
        $(this).find('th:first-child, td:first-child').addClass('cell-fixed');
        $(this).find('th:first-child:last-child, td:first-child:last-child').css('margin', 0);
        $('<td style="border:none;">&nbsp;</td>').insertAfter($(this).find('th:first-child:last-child, td:first-child:last-child'));

        // Fix row height
        $(this).find("tr").each(function () {
          var maxHeight = 0;
          $(this).find("td, th").each(function () {
            if($(this).height() > maxHeight) {
              maxHeight = $(this).height();
            }
          });
          $(this).find("td, th").height(maxHeight);
        });
      } else {
        $(this).addClass('table-fixed').wrap('<div class="mobile-table" style="padding-top: '+captionHeight+'px;"><div></div></div>');
      }
    }
  });
}
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
  $yamm.each(function () {
    var $that = $(this);
    $that.on('click', '.dropdown-toggle', function () {
      if ($(this).parent().hasClass('open')){
        $('.overlay').hide();
        $that.removeClass('nav-open');
      } else {
        $that.find($dropdown).removeClass('open');
        $that.find($dropdown).removeClass('active');
        $('.overlay').show();
        $that.addClass('nav-open');
      }
    });
  });

  // Disable outside click
  $yamm.find($dropdown).on({
      "shown.bs.dropdown": function() {
          $(this).data('closable', false);
       },
      "hide.bs.dropdown": function() {
          return $(this).data('closable');
      }
  });

  $yamm.on("click", '.yamm-close, .yamm-close-bottom, .dropdown-toggle', function() {
      $(this).parents($dropdown).data('closable', true);
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
 * social.js
 * Social Sharing Privacy
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-05-19 16:47:40
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 =========================================================== */

 /*doc
 ---
 title: Social Sharing
 name: b-social-sharing
 category: Content Modules - Functions
 ---

 <span class="label label-admin">FIX</span>

 With the social sharing function, contents can be shared on social networks. In order to protect the privacy of the users, the function contains an activation mechanism. The user first has to activate the service before being able to share contents via his or her social network.

 At the moment, Facebook, Twitter, and Google Plus are supported.

 ```html_example
 <div id="social-sharing"></div>
 ```
 */

 $(function() {

   var setme = {
     facebook : {
       'dummy_alt'         : 'Facebook "Like"-Dummy',
       'txt_info'          : 'Two clicks for more privacy: The Facebook Like button will be enabled once you click here. Activating the button already sends data to Facebook.',
       'txt_off'           : 'not connected to Facebook',
       'txt_on'            : 'connected to Facebook'
     },
     twitter : {
       'txt_info'          : 'Two clicks for more privacy: The Tweet this button will be enabled once you click here. Activating the button already sends data to Twitter.',
       'txt_off'           : 'not connected to Twitter',
       'txt_on'            : 'connected to Twitter'
     },
     gplus : {
       'txt_info'          : 'Two clicks for more privacy: The Google+ button will be enabled once you click here. Activating the button already sends data to Google.',
       'txt_off'           : 'not connected to Google+',
       'txt_on'            : 'connected to Google+'
     }
   };

  if($('#social-sharing').length > 0){
    $('#social-sharing').socialSharePrivacy({
      order: ['gplus', 'twitter','facebook'],
      css_path: '',
      services: setme
    });
  }

});

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