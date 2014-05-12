/* ============== */
/* APP DEFINITION */
/* ============== */

(function (window, App) {

  "use strict";

  App = {};
  App.settings = {};
  App.settings.locales = {};

  window.App = App;

}(window));

/* ============ */
/* APP SETTINGS */
/* ============ */

(function (settings) {

  "use strict";

  settings.debug = false;

  settings.locales.close = 'Fermer';
  settings.mainMenu = 'dashboard.html';

}(window.App.settings));
