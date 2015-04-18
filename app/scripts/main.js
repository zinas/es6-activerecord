/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

import App from './app.js';
import utils from './lib/utils';

utils.ajax('http://localweb/rest-server/rest/cars', {'foo': 'bar'}).then(function (cars) {
  console.log('good', cars);
}, function (error) {
  console.log('bad', error);
});