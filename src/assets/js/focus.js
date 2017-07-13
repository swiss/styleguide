(function($) {
  'use strict';

$('.focus-vertical.fixed').each(function() {
  var maxHeight = 0;
  console.log(this);
  $('.tab-pane', $(this)).each(function(){
    console.log(this);
    var height = $(this).height();
    if (height > maxHeight) {
      maxHeight = height;
    }
  });
  if (maxHeight) {
    $(this).height(maxHeight);
  }
});

}) (jQuery);
