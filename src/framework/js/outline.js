// OUTLINE.JS
// https://github.com/lindsayevans/outline.js
//
// Based on http://www.paciellogroup.com/blog/2012/04/how-to-remove-css-outlines-in-an-accessible-manner/
//
// Hide outline on mouse interactions
// Show it on keyboard interactions
(function(doc){

  'use strict';

  var styleElement = doc.createElement('STYLE'),
      domEvents = 'addEventListener' in doc,
      addListener = function(type, callback){
        // Basic cross-browser event handling
        if (domEvents) {
          doc.addEventListener(type, callback);
        } else {
          doc.attachEvent('on' + type, callback);
        }
      },
      setCSS = function(cssText){
        !!styleElement.styleSheet ? styleElement.styleSheet.cssText = cssText : styleElement.innerHTML = cssText;
      };

  doc.getElementsByTagName('HEAD')[0].appendChild(styleElement);

  // Using mousedown instead of mouseover, so that previously focused elements don't lose focus ring on mouse move
  addListener('mousedown', function(){
    setCSS(':focus{outline:0!important}::-moz-focus-inner{border:0!important}');
  });

  addListener('keydown', function(){
    setCSS('');
  });

})(document);
