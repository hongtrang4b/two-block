/* =========
 * video.js
 * ========= */
(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var videoTrigger = '[data-video]';

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function Video(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Video.prototype.init = function() {
    var that = this,
        environment = App.checkEnvironment,
        video = $(videoTrigger);

    video.data('width', video.width());
    video.data('height', video.height());

    if(environment === 'offline' || environment === 'webview' || environment === 'tablet') {
      that.initOfflineVideo(video);
    }
    else {
      that.addYoutubeAPI();
      that.initYoutubeVideo(video);
    }

    return this;
  };

  Video.prototype.addYoutubeAPI = function() {
    var that = this,
        tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    return this;
  };

  Video.prototype.initYoutubeVideo = function(video) {
    var that = this,
        player,
        isAutoplay = video.data('auto-play') ? 1 : 0,
        urlRedirectOnEnded = video.data('url-on-ended');

    window.onYouTubeIframeAPIReady = function() {
      player = new window.YT.Player(video[0], {
        height: video.data('height'),
        width: video.data('width'),
        videoId: video.data('video'),
        'playerVars': { 'wmode': 'opaque', 'autoplay': isAutoplay, 'rel': 0, 'controls': 0 },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };

    function onPlayerReady(event) {
      if(isAutoplay) {
        event.target.playVideo();
      }
    }

    function onPlayerStateChange(e) {
      switch(e.data){
        case 0: // ended video
          if(urlRedirectOnEnded) {
            window.location.href = urlRedirectOnEnded;
          }
          break;
      }
    }
    return this;
  };

  Video.prototype.initOfflineVideo = function(video) {
    var that = this,
        videoWrapper = video.parent(),
        videoText,
        videoElm,
        urlRedirectOnEnded = video.data('url-on-ended');

    videoText =
      '<video width="' + video.data('width') + '" height="' + video.data('height') +'">' +
        '<source src="' + video.data('src-pm4') + '" type="video/mp4">' +
        'Your browser does not support the video tag.' +
      '</video>';

    videoWrapper.html(videoText);
    videoElm = videoWrapper.find('video')[0];
    videoElm.play();

    videoElm.onended = function(e) {
      if(urlRedirectOnEnded) {
        window.location.href = urlRedirectOnEnded;
      }
    };

    return this;
  };

  Video.prototype.destroy = function() {
    var that = this;
    // ..
    return this;
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.Video = new Video(opts);
  });

}(window.jQuery, window.App));
