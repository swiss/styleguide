(function(){
  'use strict';
  var tt = require('twitter-timeline');

  var el = document.getElementById('tt');
// render twitter for username furkot
  tt('furkot').render(el);
}());
