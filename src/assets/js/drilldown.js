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
