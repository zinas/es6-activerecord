'use strict';

import Activerecord from '../lib/activerecord';

class Car extends Activerecord {

  beforeSave() {
    console.log('before save called');
  }

  afterSave() {
    console.log('after save called');
  }

  static get props() {
    return ['id', 'brand', 'model', 'price', 'year'];
  }
};

module.exports = Car;