(function($) {
  'use strict';

  $('a.social-sharing-facebook').click(function() {
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href),
      'facebook-share-dialog',
      'width=626,height=436'
    );
    return false;
  });

  $('a.social-sharing-twitter').click(function() {
    window.open(
      'http://twitter.com/share?url=' + encodeURIComponent(location.href),
      'twitter-share-dialog',
      'width=626,height=436'
    );
    return false;
  });

  $('a.social-sharing-google').click(function() {
    window.open(
      'https://plus.google.com/share?url=' + encodeURIComponent(location.href),
      'google-share-dialog',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    );
    return false;
  });

})(jQuery);
