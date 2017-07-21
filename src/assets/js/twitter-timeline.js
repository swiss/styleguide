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

  window.twttr.ready(function (twttr) {

    twttr.widgets.createTimeline(
      {
        sourceType: 'profile',
        screenName: 'BR_Sprecher'
      },
      document.getElementById('timeline'),
      {
        width: '450',
        height: '700',
        borderColor: '#ccc', // $silver
        linkColor: '#069', // $cerulean
        chrome: 'noheader nofooter transparent',
        tweetLimit: '2'
      })
      .then(function (iframe) {
        var head = $(iframe).contents().find('head');
        if (head.length) {
          // @todo: auto-detect host
          head.append('<link type="text/css" rel="stylesheet" href="http://localhost:3000/css/twitter-inject.css" />');
        }
      });
  });

})(jQuery);
