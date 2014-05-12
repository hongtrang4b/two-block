/* =========
 * add-preferences.js
 * ========= */
(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var addTrigger = '.btn-add',
      overlay = $('#overlay');

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function AddPreferences(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  AddPreferences.prototype.init = function() {
    var that = this,
        btnAdd = $(addTrigger);

    if(btnAdd.length) {
      var wrapper = btnAdd.closest('li');

      btnAdd.off('click.togglerPreferences').on('click.togglerPreferences', function(e) {
        e.preventDefault();
        that.togglerPreferences(wrapper);
      });

      overlay.on('click.hidePreferences', function(e) {
        wrapper.removeClass('active');
        overlay.hide();
      });
    }

    return this;
  };

  AddPreferences.prototype.togglerPreferences = function(wrapper) {
    var that = this;
    if(wrapper.children('.menu-1').length){
      if(!wrapper.hasClass('active')) {
        wrapper.addClass('active');
        overlay.show();
      }
      else {
        wrapper.removeClass('active');
        overlay.hide();
      }
    }
  };

  AddPreferences.prototype.destroy = function() {
    var that = this;
    // ..
    return this;
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.AddPreferences = new AddPreferences(opts);
  });

}(window.jQuery, window.App));
