(function($) {
  'use strict';

  var tempContainer, stringColor;

  // Create temporary test container
  tempContainer = document.createElement('div');

  // Set tempContainer color
  tempContainer.style.color = 'rgb(31, 41, 59)';

  // Append tempContainer to body
  document.body.appendChild(tempContainer);

  // Inspect tempContainer & return the color in a string
  stringColor = document.defaultView ? document.defaultView.getComputedStyle(tempContainer, null).color : tempContainer.currentStyle.color;
  stringColor = stringColor.replace(/ /g, '');

  // Delete the test DIV
  document.body.removeChild(tempContainer);

  // Check if we get the color that we set : If not, we're in
  // high contrast mode.
  if (stringColor !== 'rgb(31,41,59)') {
    $('#form-elements-04-checkboxes, #form-elements-05-radios').addClass('high-contrast');

    return true;
  }
}) (jQuery);
