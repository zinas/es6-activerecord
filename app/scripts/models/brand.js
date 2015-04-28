'use strict';

import Activerecord from '../lib/activerecord';

class Brand extends Activerecord {
  static get props() {
    return ['id', 'name'];
  }
};

module.exports = Brand;