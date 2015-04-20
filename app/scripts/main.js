'use strict';

import Car from './models/car';

// crud.read('http://localweb/rest-server/rest/cars', {'foo': 'bar'}).then(function (cars) {
//   console.log('good', cars);
// }, function (error) {
//   console.log('bad', error);
// });


Car.find(2).then(function (car) {
  console.log(car.get());
});