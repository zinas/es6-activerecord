'use strict';

var browserify = require('browserify');
var config = require('../config');
var partialify = require('partialify');
var gulp = require('gulp');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

// Browserify
gulp.task('browserify', function() {
  return browserify({debug: true})
    .add('./app/scripts/main.js')
    // .external('jquery')
    // .external('lodash')
    // .external('backbone')
    .transform(partialify) // Transform to allow requireing of templates
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.dist + '/scripts/'));
});

// Script Dist
gulp.task('scripts:dist', function() {
  return gulp.src(['dist/scripts/*.js'], {base: 'dist'})
    .pipe(gulp.dest('dist'))
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(rename('script-manifest.json'))
    .pipe(gulp.dest('dist'));
});
