/* =========
 * load-image.js
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

  function ImageLoader(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  ImageLoader.prototype.init = function() {
    var that = this;
    return this;
  };

  ImageLoader.prototype.check = function(container, callback) {
    var that = this,
        images = container.find('img'),
        imagesLen = images.length,
        imagesLoaded = 0;

    if(!imagesLen){
      callback();
      return this;
    }

    var checkFinish = function(){
      imagesLoaded += 1;
      if(imagesLoaded === imagesLen){
        callback();
      }
    };

    images.each(function(){
      var img = new Image();
      img.onerror = img.onload = checkFinish;
      img.src = $(this).attr('src') + ('?rand=' + Math.random());
    });

    return this;
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.ImageLoader = new ImageLoader(opts);
  });

}(window.jQuery, window.App));
