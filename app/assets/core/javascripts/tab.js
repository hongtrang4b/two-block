/* =========
 * tab.js
 * ========= */
(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var tabTrigger = '[data-tab]';

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {
    duration: 0.6 * 1000,
    handlersWrapper: '.tabs',
    tabHandlers: '> li',
    tabContents: '.tab-content'
  };

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function Tab(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Tab.prototype.init = function() {
    var that = this,
        tabWrapper = $(tabTrigger),
        handlersWrapper = tabWrapper.find(that.settings.handlersWrapper),
        tabHandlers = handlersWrapper.find(that.settings.tabHandlers),
        tabContents = tabWrapper.find(that.settings.tabContents),
        currentHandler = tabHandlers.filter('.active'),
        currentContent = tabContents.filter('.active'),
        bodyElm = $('body'),
        isFavouritesPage = bodyElm.hasClass('favourites-page'),
        newActiveIndex = 0;

    tabHandlers.off('click.changeTab').on('click.changeTab', function(e) {
      e.preventDefault();
      currentHandler.removeClass('active');
      currentContent.removeClass('active').hide();

      currentHandler = $(this).addClass('active');
      newActiveIndex = currentHandler.index();
      currentContent = tabContents.eq(newActiveIndex).addClass('active').show();

      handlersWrapper.removeClass().addClass('tabs calllogs-tabs-' + newActiveIndex);

      if(isFavouritesPage) {
        bodyElm.removeClass().addClass('favourites-page favourites-' + newActiveIndex);
      }
    });

    return this;
  };

  Tab.prototype.destroy = function() {
    var that = this;
    // ..
    return this;
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.Tab = new Tab(opts);
  });

}(window.jQuery, window.App));
