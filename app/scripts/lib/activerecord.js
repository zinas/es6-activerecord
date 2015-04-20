'use strict';

import crud from './adaptors/rest2crud';
import utils from './utils';

class Activerecord {
  constructor(config) {
    // Model state initialization
    this.isNew = true;
    this.isDirty = false;
    this.values = {};

    if ( !config ) {
      this.constructor.properties().forEach((function (property) {
        this.values[property] = '';
      }).bind(this));
    }

    if ( typeof config === 'object' ) {
      this.constructor.properties().forEach((function (property) {
        this.values[property] = config[property];
      }).bind(this));
    }
  }

  /**
   * Load the data into an instatiated model. Use this after
   * getting data back, to create the AR
   *
   * @param  {Object} properties values to load
   * @return {this}
   */
  __init(properties) {
    if ( !properties[this.constructor.pk()] ) {
      throw '__init called, but primary key is missing from arguments';
    }
    this.constructor.properties().forEach((function (property) {
      this.set(property, properties[property]);
    }).bind(this));


    this.isNew = false;
    this.isDirty = false;
    return this;
  }

  /**
   * Getter for the properties
   * Returns all values array if no parameter is given
   *
   * @param  {String} property key to get the value for
   * @return {mixed}           value for the key, or all the values array
   */
  get(property) {
    return property?this.values[property]:this.values;
  }

  /**
   * Setter for the properties
   *
   * @param  {String} property key to set the value for
   * @param  {mixed}  value    value to set
   * @return {this}
   */
  set(property, value) {
    if ( this.values[property] !== value ) {
      this.isDirty = true;
    }
    this.values[property] = value;

    return this;
  }

  /*** Static methods ***/

  /**
   * Finds by id. Returns instantiated AR
   *
   * @param  {Any}    id if to search for
   * @return {Promise}
   */
  static findById(id) {
    return crud.read(this.model(), id).then((function (data) {
      var ar = new this();
      ar.__init(data);
      return ar;
    }).bind(this), function (error) {
      console.log('error', error);
    });
  }

  /**
   * Verstile functions for searching
   *
   * @return {Promise}
   */
  static find() {
    if ( arguments.length === 1 && typeof arguments[0] !== 'object' ) {
      return this.findById(arguments[0]);
    }

    throw 'Unknown parameter list in find()';
  }

  /**
   * Returns the model name
   * @return {String}
   */
  static model() {
    return utils.pluralize(this.name.toLowerCase());
  }

  /**
   * Returns the primary key name
   *
   * @return {String}
   */
  static pk() {
    return 'id';
  }

  /**
   * Returns an array with all the properties of the model
   *
   * @return {Array}
   */
  static properties() {
    // Make sure the user defines this in his record
    throw 'You must define a static method properties() in the model ' + this.nane;
  }
}

module.exports = Activerecord;