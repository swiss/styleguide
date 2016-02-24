/**
 * Disable some default behavior that doesn’t make sense
 * In the context of a style guide
 */

(function($){

  'use strict';

  // Disable links to nothing (avoid jump to top of the page)
  $('.component-example a[href="#"]').on('click', function(e) {
    e.preventDefault();
  });

  // Disable forms submit (avoid page reload)
  $('.component-example form').on('submit', function(e) {
    e.preventDefault();
  });

})(jQuery);
