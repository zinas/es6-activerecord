'use strict';

import Activerecord from '../lib/activerecord';
import Brand from './brand';

class Car extends Activerecord {

  beforeSave() {
    console.log('before save called');
  }

  afterSave() {
    console.log('after save called');
  }

  get hasOne() {
    return {
      'brand' : Brand
    };
  }

  static get props() {
    return ['id', 'brand_id', 'model', 'price', 'year'];
  }
};

module.exports = Car;