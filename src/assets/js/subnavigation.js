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
