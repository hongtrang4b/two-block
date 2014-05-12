/* =========
 * audio.js
 * ========= */
(function($, App) {

  "use strict";

  /* ============== */
  /* MODULE TRIGGER */
  /* ============== */

  var audioTrigger = '.list-audio audio';

  /* =============== */
  /* MODULE DEFAULTS */
  /* =============== */

  var defaults = {};

  /* ================= */
  /* MODULE DEFINITION */
  /* ================= */

  function convertTime(miliseconds) {
    var current = new Date(miliseconds),
    minutes = current.getMinutes().toString(),
    seconds = current.getSeconds().toString();
    minutes = minutes.length === 1 ? '0' + minutes : minutes;
    seconds = seconds.length === 1 ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
  }

  function Audio(opts) {
    this.settings = $.extend({}, defaults, opts);
    return this.init();
  }

  /* ============== */
  /* MODULE METHODS */
  /* ============== */

  Audio.prototype.init = function() {
    var that = this,
        audio = $(audioTrigger);
    if(audio.length) {
      window.soundManager.setup({
        url: '../flash/',
        onready: function() {
          var playWrapper = $('.player-content');
          if(playWrapper.length) {
            playWrapper.startTimeWrap = playWrapper.find('.start-time').text('00:00');
            playWrapper.totalTimeWrap = playWrapper.find('.total-time').text('00:00');
            playWrapper.playBar = playWrapper.find('.rec-arrondi');
            playWrapper.playBarWidth = playWrapper.playBar.width();
            playWrapper.currPlayBar = playWrapper.find('.rec-buffer').width(0);
            playWrapper.btnTime = playWrapper.find('.bouton-time');
            playWrapper.btnTimeWidth2 = playWrapper.btnTime.width() / 2;
            playWrapper.btnPlayPause = playWrapper.find('.btn-play-player');
            playWrapper.btnTime.css('left', - playWrapper.btnTimeWidth2).data('leftPos', - playWrapper.btnTimeWidth2);

            that.initAudio(audio, playWrapper);
          }
          else {
            that.initAudio(audio);
          }
        }
      });
    }

    return this;
  };

  Audio.prototype.initAudio = function(audioElm, playWrapper) {
    var that = this,
        audioSrc = audioElm.find('source:eq(0)').attr('src');

    var thisAudio = window.soundManager.createSound({
      url: audioSrc,
      whileplaying: function() {
        if(playWrapper) {
          var currentTime = convertTime(this.position),
              currentW = this.position / this.duration * playWrapper.playBarWidth,
              leftPos = currentW - playWrapper.btnTimeWidth2;
          playWrapper.startTimeWrap.text(currentTime);
          playWrapper.currPlayBar.width(currentW);
          playWrapper.btnTime.css('left', leftPos).data('leftPos', leftPos);
        }
      },
      onfinish: function() {
        if(playWrapper) {
          playWrapper.startTimeWrap.text('00:00');
          playWrapper.currPlayBar.width(0);
          playWrapper.btnTime.css('left', - playWrapper.btnTimeWidth2).data('leftPos', - playWrapper.btnTimeWidth2);
        }
        thisAudio.setPosition(0);
        thisAudio.play();
      }
    });

    thisAudio.load({
      onload: function() {
        if(playWrapper) {
          playWrapper.totalTimeWrap.text(convertTime(this.duration));
          playWrapper.btnPlayPause.addClass('active');
          playWrapper.startTimeWrap.text('00:00');
          playWrapper.currPlayBar.width(0);
          playWrapper.btnTime.css('left', - playWrapper.btnTimeWidth2).data('leftPos', - playWrapper.btnTimeWidth2);
          playWrapper.btnPlayPause.off('click.playAudio touchstart.playAudio').on('click.playAudio touchstart.playAudio', function(e) {
            var btn = $(this);
            if(btn.hasClass('active')) {
              btn.removeClass('active');
              thisAudio.pause();
            }
            else {
              btn.addClass('active');
              thisAudio.play();
            }
          });
        }
        if($('body').hasClass('radio') && /iPad/i.test(navigator.userAgent)) {
          var btnPlay = $('.btn-1').filter(':not(.disabled)');
          btnPlay.on('click.playAudio touchstart.playAudio', function(e) {
            e.preventDefault();
            if(!btnPlay.data('isPlaying')) {
              btnPlay.data('isPlaying', true);
              thisAudio.play();
            }
          });
        }
        else {
          thisAudio.play();
        }
      }
    });

    return this;
  };

  Audio.prototype.destroy = function() {
    var that = this;
    // ..
    return this;
  };

  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  $(function() {
    var opts = {};
    App.Audio = new Audio(opts);
  });

}(window.jQuery, window.App));
