/**
 * This file contains all the JavaScript code required
 * to make components work correctly in the style guide
 *
 * Please prefix each piece of code with the
 * component name
 */
(function($) {

  'use strict';

  /**
   * Component
   * FORMS
   */
  if ($(window).width() > 767) {

    $('[type=date]').each(function(){
      var picker = new Pikaday({
        field: $(this)[0],
        firstDay: 1,
        theme: 'admin-theme',
        i18n: {
          previousMonth : 'Previous Month',
          nextMonth     : 'Next Month',
          months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
          weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        }
      });
    });

  }

})(jQuery);
