'use strict';

import Car from './models/car';

// crud.read('http://localweb/rest-server/rest/cars', {'foo': 'bar'}).then(function (cars) {
//   console.log('good', cars);
// }, function (error) {
//   console.log('bad', error);
// });

// var car = new Car();

// car.brand = 'BMW';
// car.model = 'Z3';
// car.price = 30000;
// car.year = 2012;

// car.save().then(function (c) {
//   console.log('good', c);
// }, function (error) {
//   console.log('bad', error);
// });


// Car.find(26).then(function (car) {

//   car.brand = 'nikos2';
//   car.save();

// });

Car.find(1).then(function (car) {
  console.log('car', car);

  console.log('brand', car.brand);
});