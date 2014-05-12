'use strict';

// ---------------
// Default modules
// ---------------
var express = require('express');
var path = require('path');
var http = require('http');
var pkg = require('../package');
var app = express();

// ---------------------
// Default configuration
// ---------------------
var port = process.env.PORT || 3001;
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express['static'](path.join(__dirname, '../public')));

// ---------
// JADE data
// ---------
app.locals.pretty = false;
app.locals.i18n = require('./config/locales/' + pkg.preferredLanguage);

// -------------------------
// Development configuration
// -------------------------
if ('development' === app.get('env')) {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.locals.pretty = true;
}

// --------------
// Routes | Pages
// --------------
var routes = [
  'index',
  'home',
  'dashboard-page',
  'main-menu',
  'menu-navigation',
  'menu-multimedia',
  'menu-phone',
  'menu-services',
  'menu-system',
  'menu-vehicle',
  'example'
];

function makeRoute(route){
  app.get('/' + route + '.html', function (req, res){
    res.render('core/' + route);
  });
}

app.get('/', function (req, res) {
  res.render('core/index');
});

for (var i = 0, len = routes.length; i < len; i += 1) {
  makeRoute(routes[i]);
}

http.createServer(app).listen(port, function(){
  console.log( pkg.title + " running on port " + port );
});
