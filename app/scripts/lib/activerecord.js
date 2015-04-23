'use strict';

import crud from './adaptors/rest2crud';
import utils from './utils';

class Activerecord {
  constructor(config) {
    // Model state initialization
    this.flags = {
      new: true,
      dirty: false
    };

    this.values = {};

    this.__defineProperties();

    if ( typeof config === 'object' ) {
      this.props.forEach((function (property) {
        // avoid the setter. Setter is only used when the
        // model should become dirty
        this.values[property] = config[property];
      }).bind(this));
    }
  }

  /*** Static methods ***/

  /**
   * Proxying the static method for simplicity
   *
   * @return {String} Primary key of the model
   */
  get pk() {
    return this.constructor.pk;
  }

  /**
   * Proxying the static method for simplicity
   *
   * @return {String} name of the model
   */
  get modelName() {
    return this.constructor.modelName;
  }

  /**
   * Proxying the static method for simplicity
   *
   * @return {Array} property names
   */
  get props() {
    return this.constructor.props;
  }

  /*** "Private" methods ***/

  /**
   * Defines all the properties of the model and initializes them
   *
   * Depends on the propery names
   *
   * @return {this}
   */
  __defineProperties() {
    var i, self = this;
    this.props.forEach( (function (prop) {
      Object.defineProperty(this, prop, {
        get() {
          return self.values[prop];
        },
        set(val) {
          if ( val !== self.values[prop] ) {
            self.values[prop] = val;
            if ( !self.flags.new ) {
              self.flags.dirty = true;
            }
          }
        }
      });

      this.values[prop] = null;
    }).bind(this) );

    return this;
  }

  /**
   * Load the data into an instatiated model. Use this after
   * getting data back, to create the AR
   *
   * @param  {Object} properties values to load
   * @return {this}
   */
  __loadFetchedData(properties) {
    if ( !properties[this.pk] ) {
      throw '__loadFetchedData called, but primary key is missing from arguments';
    }
    this.props.forEach((function (property) {
      this.values[property] = properties[property];
    }).bind(this));

    this.flags.new = false;
    this.flags.dirty = false;

    return this;
  }

  /*** public methods ***/

  /**
   * Saves (persist) the model. Call is the same, whether updating or
   * creating a new record
   *
   * @return {this}
   */
  save() {
    var resolution;

    if ( typeof this.beforeSave === 'function' ) {
      this.beforeSave();
    }

    if ( this.flags.new ) {
      resolution = crud.create(this.modelName, this.values);
    } else if ( this.flags.dirty ) {
      resolution = crud.update(this.modelName, this.values[this.pk], this.values);
    } else {
      throw 'trying to persist a model without active changes';
    }

    resolution = resolution.then( (function(success) {
      this.flags.new = false;
      this.flags.dirty = false;

      if ( typeof this.afterSave === 'function' ) {
        this.afterSave();
      }

      return this;
    }).bind(this), (function(error) {
      // TODO handle this
    }).bind(this));

    return resolution;
  }

  /*** Static methods ***/

  /**
   * Finds by id. Returns instantiated AR
   *
   * @param  {Any}    id if to search for
   * @return {Promise}
   */
  static findById(id) {
    return crud.read(this.modelName, id).then((function (data) {
      var ar = new this();
      ar.__loadFetchedData(data);
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
  static get modelName() {
    return utils.pluralize(this.name.toLowerCase());
  }

  /**
   * Returns the primary key name
   *
   * @return {String}
   */
  static get pk() {
    return 'id';
  }

  /**
   * Returns an array with all the properties of the model
   *
   * @return {Array}
   */
  static get props() {
    // Make sure the user defines this in his record
    throw 'You must define a static method properties() in the model ' + this.nane;
  }
}

module.exports = Activerecord;