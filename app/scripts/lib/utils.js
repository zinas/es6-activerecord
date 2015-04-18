'use strict';

var utils = {};

/**
 * Simple wrapper to make ajax calls
 *
 * @param  {[type]}  url       endpoint to access
 * @param  {String}  method    http method to use
 * @param  {Boolean} parseJson whether to treat the response as json
 * @return {Promise}           promise
 */
utils.ajax = function(url, data, method = 'GET', parseJson = true) {
  var
    deferred = Promise.defer(),
    request = new XMLHttpRequest(),
    i, tmp = [];


  if ( data && method === 'GET' ) {
    for ( i in data ) {
      tmp.push(i + '=' + data[i]);
    }
    url = url + '?' + tmp.join('&');
  }

  request.open(method, url, true);

  if ( data && method !== 'GET' ) {
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }

  request.onload = function() {
    console.log('success', request);
    if (request.status >= 200 && request.status < 400) {
      var resolution = parseJson ? JSON.parse(request.responseText) : request.responseText;
      deferred.resolve(resolution);
    } else {
      console.log('onload error');
      deferred.reject(request);
    }
  };

  request.onerror = function() {
    console.log('onerror error');
    deferred.reject(request);
  };

  if ( method === 'GET' ) {
    request.send();
  } else {
    request.send(data);
  }

  return deferred.promise;
};

module.exports = utils;