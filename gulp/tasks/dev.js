'use strict';

var gulp = require('gulp');

// Dev Server
gulp.task('dev', ['html', 'browserify', 'watch']);
