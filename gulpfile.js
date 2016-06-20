var gulp = require('gulp');
var coffee = require('gulp-coffee');
var stylus = require('gulp-stylus');
var indent = require('gulp-indent');
var livereload = require('gulp-livereload');

gulp.task('coffee', function() {
  return gulp.src('resources/coffee/*.coffee')
    .pipe(coffee({
      bare: true
    }))
    .pipe(gulp.dest('public_html/javascripts/'))
    .pipe(livereload());
});

gulp.task('stylus', function() {
  return gulp.src('resources/stylus/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('public_html/stylesheets/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('resources/coffee/*.coffee', ['coffee']);
  return gulp.watch('resources/stylus/*.styl', ['stylus']);
});

gulp.task('default', ['coffee', 'stylus']);