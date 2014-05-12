/* =========
 * check-environment.js
 * ========= */
(function($, App) {

  "use strict";

  function getQueryVariable(variable) {
    var query = window.location.hash.substring(1),
        vars = query.split("&"),
        env = 'desktop';

    $.each(vars, function(index, value) {
      var pair = value.split('=');
      if(pair[0] === variable) {
        env = pair[1];
      }
    });

    return env;
  }
  /* =============== */
  /* MODULE DATA-API */
  /* =============== */

  App.checkEnvironment = getQueryVariable('env');

}(window.jQuery, window.App));
