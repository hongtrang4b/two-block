/* =========
 * cookie.js
 * ========= */

(function($, App) {

  "use strict";

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function Cookie(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Cookie.prototype.init = function() {
    var that = this;
    return this;
  };

  Cookie.prototype.deleteCookie = function(cName) {
    var that = this;
    document.cookie = cName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  Cookie.prototype.setCookie = function(cName, cValue, exdays) {
    var that = this,
        d, expires;
    d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    expires = "expires="+d.toGMTString();
    document.cookie = cName + "=" + cValue + "; " + expires;
  };

  Cookie.prototype.getCookie = function(cName) {
    var that = this,
        name, ca;
    name = cName + "=";
    ca = document.cookie.split(';');
    for(var i = 0, len = ca.length; i < len; i++) {
      var c = $.trim(ca[i]);
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  var opts = {};
  App.Cookie = new Cookie(opts);

}(window.jQuery, window.App));
