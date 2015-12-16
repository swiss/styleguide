 /* ==========================================================
  * tabs.js
  * JS for the tabs and tab-focus elements
  *
  * Copyright 2014 Federal Chancellery of Switzerland
  * Licensed under MIT
  ========================================================== */

(function($) {
  'use strict';

  /**
   * @constructor
   * @param {Object} domNode
   */
  function TabFocus(element) {
    this.$wrapper = $(element).parent();
    this.domNodes = '.tab-focus, .nav-tabs-focus';
    this.delay = 3000;
    this.playing = null;
    this.interval = null;

    this.$wrapper
      .on('click', '.nav-tabs-focus', function() {
        this.pause(null, true);
      }.bind(this))
      .on('click', '.tab-focus-control', function() {
        if (this.playing) {
          this.pause(null, true);
        } else {
          this.play(null, true);
        }
      }.bind(this));

    this.play(null, true);
  }

  TabFocus.prototype = {
    addListeners: function() {
      this.$wrapper
        .on('mouseenter.tabfocus focus.tabfocus', this.domNodes, this.pause.bind(this))
        .on('mouseleave.tabfocus blur.tabfocus', this.domNodes, this.play.bind(this));
    },

    removeListeners: function() {
      this.$wrapper
        .off('mouseenter.tabfocus focus.tabfocus', this.domNodes)
        .off('mouseleave.tabfocus blur.tabfocus', this.domNodes);
    },

    play: function(event, startListening) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(this.slide.bind(this), this.delay);

      if (startListening) {
        this.playing = true;
        this.addListeners();
        this.$wrapper.find('.tab-focus-control .icon').removeClass('icon--play').addClass('icon--pause');
      }
    },

    pause: function(event, stopListening) {
      clearInterval(this.interval);

      if (stopListening) {
        this.playing = false;
        this.removeListeners();
        this.$wrapper.find('.tab-focus-control .icon').removeClass('icon--pause').addClass('icon--play');
      }
    },

    slide: function() {
      var $nav = this.$wrapper.find('.nav-tabs-focus');

      // If the nav is hidden, it means the focus has been changed for a carousel (mobile)
      // We don’t want to slide automatically anymore
      if ($nav.is(':hidden')) {
        return this.pause(null, true);
      }

      if ($nav.find('> li').length) {
        var tabs = this.$wrapper.find('.nav-tabs-focus > li'),
            activeTab = tabs.filter('.active'),
            nextTab = activeTab.next('li'),
            newTab = nextTab.length ? nextTab.find('a') : tabs.eq(0).find('a');

        newTab.tab('show');
      }
    }
  };

  $.fn.tabFocus = function() {
    return this.each(function() {
      if (!$.data(this, 'TabFocus')) {
        $.data(this, 'TabFocus', new TabFocus(this));
      }
    });
  };

  $('.tab-focus').tabFocus();

})(jQuery);
