'use strict';

import Activerecord from '../lib/activerecord';

class Car extends Activerecord {
  static properties() {
    return ['id', 'brand', 'model', 'price', 'year'];
  }
};

module.exports = Car;