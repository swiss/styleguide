(function($){
  'use strict';

  // Setup twitter widget (see: https://dev.twitter.com/web/javascript/loading)
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) {
      return t;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
    return t;
  }(document, "script", "twitter-wjss"));

  window.twttr.ready(function (twitter) {
    $('.mod-twitterstream .twitter-timeline').each(function () {
      twitter.widgets.createTimeline(
        {
          sourceType: 'profile',
          screenName: $(this).data('profile')
        },
        this,
        {
          borderColor: '#ccc', // $silver
          linkColor: '#069', // $cerulean
          chrome: 'noheader nofooter transparent',
          tweetLimit: $(this).data('tweet-limit')
        })
        .then(function (iframe) {
          var head = $(iframe).contents().find('head');
          if (head.length) {
            head.append('<link type="text/css" rel="stylesheet" href="../css/twitter-inject.css" />');

            /*
            Injected CSS has an impact on the iframe body's height.
            So we need to force widget.js to recalculate the iframe height.
             */
            $(iframe).css('height', '100%');
          }
        });
    });
  });
})(jQuery);
