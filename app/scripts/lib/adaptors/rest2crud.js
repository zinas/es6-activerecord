import utils from '../utils';
import CONFIG from '../../config';
'use strict';

/**
 *. CRUD
 *
 * Interface to connect to a standard rest API
 * @type {Object}
 */
var crud = {};

/**
 * POST an object to the server for creation
 *
 * @param  {String} url    Url to send the request to
 * @param  {Object} params parameters to post along the request
 * @return {xhr}           xhr object, to bind callbacks
 */
crud.create = function (model, data) {
    var
        url = __getUrl(model),
        dataToSend = {};

    dataToSend[model] = params;

    return utils.ajax(url, dataToSend, 'POST');
};

/**
 * GET some data from the server
 *
 * @param  {String} model  model name
 * @param  {Object} params parameters to post along the request
 * @return {xhr}           xhr object, to bind callbacks
 */
crud.read = function (model, params) {
    var url = __getUrl(model, params);

    return utils.ajax(url, null, 'GET').then(function (response) {
        return response[model];
    }, function (response) {

    });
};

/**
 * PUT an object to the server for creation
 *
 * @param  {String} url    Url to send the request to
 * @param  {Object} params parameters to post along the request
 * @return {xhr}           xhr object, to bind callbacks
 */
crud.update = function (model, params, data) {
    var
        url = __getUrl(model, params),
        dataToSend = {};

    dataToSend[model] = data;

    return utils.ajax(url, dataToSend, 'PUT');
};

/**
 * DELETE an object to the server for creation
 *
 * @param  {String} url    Url to send the request to
 * @param  {Object} params parameters to post along the request
 * @return {xhr}           xhr object, to bind callbacks
 */
crud.delete = function (model, params) {
    return utils.ajax(url, params, 'DELETE');
};

/**
 * Returns the endpoint url from the model name
 *
 * @param  {String} model name of the model
 * @return {String}       endpoint url
 */
function __getUrl(model, params = null ) {
    var url = CONFIG.ENDPOINT + '/' + model;

    if ( params && typeof params !== 'object' ) {
        url = url + '/' + params;
    } else if (params && typeof params === 'object' ) {
        url = url + '?' + utils.serializeJSON(params);
    }

    return url;
}

module.exports = crud;