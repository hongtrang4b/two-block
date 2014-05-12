/* =========
 * animate-page.js
 * ========= */
(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  // After page loaded, all these icons will fade in
  var menuItemsTrigger = '.list-item';

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {
    duration: 1 * 800
  };

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function AnimatePage(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  AnimatePage.prototype.init = function() {
    var that = this;

    $('#main-app').animate({
      opacity: 1
    }, that.settings.duration, function() {
      $(menuItemsTrigger).fadeIn(that.settings.duration, function() {
        that.initInfoPopin();
      });
      that.initBoardPopin();
      that.initSlideshow();
    });

    return this;
  };

  AnimatePage.prototype.initInfoPopin = function() {
    var that = this,
        infoPopin = $('[data-info-popin]');
    if(infoPopin.length) {
      infoPopin.fadeIn(that.settings.duration);
      infoPopin.find('[data-close]').on('click.closeInfoPopin', function() {
        infoPopin.fadeOut(that.settings.duration);
      });
    }

    return this;
  };

  AnimatePage.prototype.initBoardPopin = function() {
    var that = this,
        boardPopin = $('.popup-board'),
        btnShow = $('.wi-icon-home'),
        btnHide = boardPopin.find('[data-close]'),
        isDashboardPage = $('.dashboard').length;

    btnShow.off('click.showPopin').on('click.showPopin', function() {
      if(!App.Cookie.getCookie('isHomepageFirstClick')) {
        App.Cookie.setCookie('isHomepageFirstClick', 'yes', 10000);
        boardPopin.fadeIn(that.settings.duration);
      }
      else {
        if(!isDashboardPage) {
          window.location.href = App.settings.mainMenu;
        }
      }
    });

    btnHide.off('click.closeboardPopin').on('click.closeboardPopin', function() {
      if(isDashboardPage) {
        boardPopin.fadeOut(that.settings.duration);
      }
      else {
        window.location.href = App.settings.mainMenu;
      }
    });

    return this;
  };

  AnimatePage.prototype.initSlideshow = function() {
    var that = this,
        slideshow = $('.slideshow');
    if(slideshow.length) {
      slideshow.vars = {
        slider: slideshow.find('.slider'),
        items: slideshow.find('.slider > li'),
        btnNext: slideshow.find('.wi-icon-next'),
        btnPrev: slideshow.find('.wi-icon-prev'),
        pagingItems: slideshow.find('.paging > li'),
        activeIndex: 0,
        isWaiting: false
      };

      slideshow.vars.activeItem = slideshow.vars.items.eq(slideshow.vars.activeIndex);
      slideshow.vars.numberItem = slideshow.vars.items.length;
      slideshow.vars.itemWidth = slideshow.vars.items.width();

      slideshow.vars.btnNext.off('click.slide').on('click.slide', function() {
        that.goTo(slideshow, (slideshow.vars.activeIndex + 1) % slideshow.vars.numberItem, 1);
      });

      slideshow.vars.btnPrev.off('click.slide').on('click.slide', function() {
        that.goTo(slideshow, (slideshow.vars.activeIndex - 1 + slideshow.vars.numberItem) % slideshow.vars.numberItem, -1);
      });

      slideshow.vars.pagingItems.off('click.slide').on('click.slide', function() {
        var newIndex = $(this).index(),
            delta = newIndex > slideshow.vars.activeIndex ? 1 : -1;
        that.goTo(slideshow, newIndex, delta);
      });
    }

    return this;
  };

  AnimatePage.prototype.goTo = function(slideshow, newIndex, delta) {
    var that = this;

    if(!slideshow.vars.isWaiting && slideshow.vars.activeIndex !== newIndex) {
      var newActiveItem, initPos;

      slideshow.vars.isWaiting = true;
      initPos = delta === 1 ? slideshow.vars.itemWidth : - slideshow.vars.itemWidth;
      newActiveItem = slideshow.vars.items.eq(newIndex);
      slideshow.vars.pagingItems.removeClass('active').eq(newIndex).addClass('active');

      slideshow.vars.activeItem.animate({
        left: - initPos
      }, that.settings.duration);

      newActiveItem
        .css('left', initPos)
        .animate({
          left: 0
        }, that.settings.duration, function() {
          slideshow.vars.activeIndex = newIndex;
          slideshow.vars.activeItem = newActiveItem;
          slideshow.vars.isWaiting = false;
        });
    }

    return this;
  };

  AnimatePage.prototype.destroy = function() {
    var that = this;
    // ..
    return this;
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.ImageLoader.check($(menuItemsTrigger), function() {
      App.AnimatePage = new AnimatePage(opts);
    });
  });

}(window.jQuery, window.App));
