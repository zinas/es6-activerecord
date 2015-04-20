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
crud.create = function (model, params) {
    var url = __getUrlFromModelName(model);
    return utils.ajax(url, params, 'POST');
};

/**
 * GET some data from the server
 *
 * @param  {String} model  model name
 * @param  {Object} params parameters to post along the request
 * @return {xhr}           xhr object, to bind callbacks
 */
crud.read = function (model, params) {
    var url = __getUrlFromModelName(model);
    if ( typeof params !== 'object' ) {
        url = url + '/' + params;
        params = null;
    }
    return utils.ajax(url, params, 'GET').then(function (response) {
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
crud.update = function (model, params) {
    return utils.ajax(url, params, 'PUT');
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
function __getUrlFromModelName(model) {
    return CONFIG.ENDPOINT + '/' + model;
}

module.exports = crud;