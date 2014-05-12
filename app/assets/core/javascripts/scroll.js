/* =========
 * scroll.js
 * ========= */
(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var scrollTrigger = '[data-scroll]';

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {
    duration: 0.6 * 1000,
    scrollBar: '.scroll-bar-hor',
    scrollBtn: '.scroll-bar-hor .dragger',
    scrollContent: '.scroll-cont .list-photo',
    scrollContentWrapper: '.scroll-cont',
    activeIndex: 0
  };

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function Scroll(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Scroll.prototype.init = function() {
    var that = this,
        scrollElms = $(scrollTrigger);

    for (var i = 0, l = scrollElms.length; i < l; i = i + 1) {
      that.initScroll(scrollElms.eq(i));
    }

    return this;
  };

  Scroll.prototype.initScroll = function(scroll) {
    var that = this,
        myID = "static" + Math.round(Math.random() * 10000);

    scroll.vars = {
      scrollContentWrapper: scroll.find('.scroll-block'),
      scrollContent: scroll.find('.scroll-content'),
      scrollBar: scroll.find('.scroll-bar'),
      scrollBtn: scroll.find('.dragger'),
      btnUp: scroll.find('.btn-callogs-prev'),
      btnDown: scroll.find('.btn-callogs-next'),
      stepMove: 20
    };

    scroll.show();
    scroll.vars.scrContentHeight = scroll.vars.scrollContent.height();
    scroll.vars.wrapContHeight = scroll.vars.scrollContentWrapper.height();
    if(!scroll.hasClass('active') && $('[data-tab]').length) {
      scroll.hide();
    }

    if(scroll.vars.scrContentHeight < scroll.vars.wrapContHeight) {
      that.hideControl(scroll);
    }
    else {
      scroll.vars.scrollbarHeight = scroll.vars.scrollBar.outerHeight();

      scroll.vars.marginTopContentMax = scroll.vars.scrContentHeight - scroll.vars.wrapContHeight;
      scroll.vars.marginTopScrMax = scroll.vars.scrollbarHeight - scroll.vars.scrollBtn.outerHeight();

      scroll.vars.currScrTop = 0;
      scroll.vars.currContTop = 0;

      scroll.vars.btnUp.off('click.scrollUp touchstart.scrollUp').on('click.scrollUp touchstart.scrollUp', function(e) {
        e.preventDefault();
        scroll.vars.currScrTop -= scroll.vars.stepMove;
        that.setScrollPos(scroll);
      });

      scroll.vars.btnDown.off('click.scrollDown touchstart.scrollDown').on('click.scrollDown touchstart.scrollDown', function(e) {
        e.preventDefault();
        scroll.vars.currScrTop += scroll.vars.stepMove;
        that.setScrollPos(scroll);
      });

      scroll.vars.scrollBtn.off('mousedown touchstart').on('mousedown touchstart', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        scroll.vars.isDrag = true;
        scroll.vars.startPos = evt.pageY;
      });
      $(document).on('mousemove.' + myID + 'touchmove.' + myID, function(evt){
        if(scroll.vars.isDrag) {
          var currPos = evt.pageY;
          scroll.vars.currScrTop += currPos - scroll.vars.startPos;
          scroll.vars.startPos = currPos;
          that.setScrollPos(scroll);
        }
      }).on('mouseup.' + myID + 'touchend.' + myID, function(evt){
        scroll.vars.isDrag = false;
      });

      // for tablet
      scroll.vars.scrollContent.bind('touchstart.' + myID, function(event){
        event.preventDefault();
        scroll.vars.isTouch = true;
        scroll.vars.touchPos = event.originalEvent.touches[0].pageY || event.touches[0].pageY;
      }).bind('touchmove.' + myID, function(event){
        event.preventDefault();
        if(scroll.vars.isTouch){
          var currPos = event.originalEvent.touches[0].pageY || event.touches[0].pageY;
          scroll.vars.currScrTop -= currPos - scroll.vars.touchPos;
          scroll.vars.touchPos = currPos;
          that.setScrollPos(scroll);
        }
      }).bind('touchend.' + myID, function(){
        scroll.vars.isTouch = false;
      });
    }
  };

  Scroll.prototype.hideControl = function(scroll) {
    var that = this;
    scroll.vars.scrollBar.hide();
    scroll.vars.btnUp.hide();
    scroll.vars.btnDown.hide();
  };

  Scroll.prototype.setScrollPos = function(scroll) {
    var that = this;
    scroll.vars.currContTop = - (scroll.vars.marginTopContentMax * scroll.vars.currScrTop) / scroll.vars.marginTopScrMax;

    scroll.vars.currContTop = Math.max(Math.min(0, scroll.vars.currContTop), -scroll.vars.marginTopContentMax);
    scroll.vars.currScrTop = Math.min(Math.max(0, scroll.vars.currScrTop), scroll.vars.marginTopScrMax);

    scroll.vars.scrollContent.css('margin-top', scroll.vars.currContTop);
    scroll.vars.scrollBtn.css('margin-top', scroll.vars.currScrTop);

    if(scroll.vars.currScrTop === 0) {
      scroll.vars.btnUp.addClass('disabled');
    }
    else {
      scroll.vars.btnUp.removeClass('disabled');
    }

    if(scroll.vars.currScrTop === scroll.vars.marginTopScrMax) {
      scroll.vars.btnDown.addClass('disabled');
    }
    else {
      scroll.vars.btnDown.removeClass('disabled');
    }
  };

  Scroll.prototype.destroy = function() {
    var that = this;
    // ..
    return this;
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.Scroll = new Scroll(opts);
  });

}(window.jQuery, window.App));