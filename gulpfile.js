'use strict';

var gulp      = require('gulp');

var sass      = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var connect   = require('gulp-connect');
var watch     = require('gulp-watch');


var paths = {
  sass:       ['./web/sass/*.scss'],
  templates:  ['./web/*.html']
};

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('server', function() {
  connect.server({
    livereload: true,
    port: 1337,
    host: "localhost",
    root: "web"
  });
});

gulp.task('livereload', function() {
  gulp.src(['./web/css/*.css', './web/js/**/*.js', './web/*.html'])
    .pipe(watch(['./web/css/*.css', './web/js/**/*.js', './web/*.html']))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('./web/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./web/css'));
});

gulp.task('minify-css', function () {
  return gulp.src('./web/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./web/css'));
});

gulp.task('default', ['sass']);
gulp.task('serve', ['server', 'livereload', 'watch', 'sass', 'minify-css']);