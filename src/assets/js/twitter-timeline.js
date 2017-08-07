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

            /*
            As we apply some custom styling which is not intendend by Twitter,
            let's try to detect any changes by Twitter that may break it.
            */
            reportTwitterHtmlChanges($(iframe));
          }
        });
      twitter.widgets.createFollowButton(
        $(this).data('profile'),
        $(this).parent().get(0),
        {
          showCount: false
        }
      );
    });
  });

  function reportTwitterHtmlChanges(iframe) {
    reportMissingTwitterHmlElement(iframe, '.TweetAuthor-name');
    reportMissingTwitterHmlElement(iframe, '.TweetAuthor-link');
    reportMissingTwitterHmlElement(iframe, '.TweetAuthor-avatar');
    reportMissingTwitterHmlElement(iframe, '.SandboxRoot.env-bp-min .TweetAuthor-avatar');
    reportMissingTwitterHmlElement(iframe, '.TweetAuthor-avatar .Avatar');
    reportMissingTwitterHmlElement(iframe, '.SandboxRoot.env-bp-min .TweetAuthor-avatar .Avatar');
    reportMissingTwitterHmlElement(iframe, '.timeline-Tweet-author');
    reportMissingTwitterHmlElement(iframe, '.TweetAuthor-name.Identity-name');
    reportMissingTwitterHmlElement(iframe, '.TweetAuthor-screenName.Identity-screenName');
    reportMissingTwitterHmlElement(iframe, '.timeline-Tweet-text');
    reportMissingTwitterHmlElement(iframe, '.SandboxRoot.env-bp-min .timeline-Tweet-text');
    reportMissingTwitterHmlElement(iframe, '.timeline-Tweet-action.timeline-ShareMenu');
    reportMissingTwitterHmlElement(iframe, '.timeline-Tweet-brand');
    reportMissingTwitterHmlElement(iframe, '.TweetAuthor-verifiedBadge');
    reportMissingTwitterHmlElement(iframe, '.timeline-Tweet-metadata *');
    reportMissingTwitterHmlElement(iframe, '.timeline-Tweet-retweetCredit', true);
    reportMissingTwitterHmlElement(iframe, '.Icon.Icon--retweetBadge', true);
    reportMissingTwitterHmlElement(iframe, '.Icon.Icon--heart.TweetAction-icon.Icon--heartEdge');
    reportMissingTwitterHmlElement(iframe, '.TweetAction .Icon.Icon--heart.TweetAction-icon.Icon--heartEdge');
    reportMissingTwitterHmlElement(iframe, '.timeline-Body');
    reportMissingTwitterHmlElement(iframe, '.timeline-ShowMoreButton');
  }

  function reportMissingTwitterHmlElement(iframe, selector, isOptional) {
    if (0 < $(iframe).contents().find(selector).length) {
      return;
    }
    var message = [
      'mod-twitterstream #',
      $(iframe).attr('id'),
      ': The following ',
      isOptional ? ' optional ' : '',
      'elements could not be found inside Twitter widget HTML: "',
      selector,
      '". This may be caused by a Twitter widget HTML change. ',
      'In this case, Twitter stream may not be CI/CD compliant.'
    ].join('');

    isOptional ? console.log(message) : console.warn(message);
  }
})(jQuery);
