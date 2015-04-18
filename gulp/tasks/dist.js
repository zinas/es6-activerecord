'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');

// Build
gulp.task('dist', ['html', 'browserify'], function() {
  return gulp.src(['.tmp/scripts/*.js'], {base: '.tmp'})
    .pipe(gulp.dest('dist'))
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'));
});
