'use strict';

import Car from './models/car';

// crud.read('http://localweb/rest-server/rest/cars', {'foo': 'bar'}).then(function (cars) {
//   console.log('good', cars);
// }, function (error) {
//   console.log('bad', error);
// });

var car = new Car();

car.brand = 'BMW';
car.model = 'Z3';
car.price = 30000;
car.year = 2012;

car.save().then(function (success) {
  console.log('good', success);
}, function (error) {
  console.log('bad', error);
});


// Car.find(2).then(function (car) {
//   console.log('brand', car.brand);
//   console.log(car);

//   // car.brand = 'nikos';

//   console.log(car);
// });