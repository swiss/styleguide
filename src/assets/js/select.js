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
