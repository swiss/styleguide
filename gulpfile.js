/* ==========================================================
 * gulpfile.js
 * List of Gulp.js task to build and run the project
 *
 * Author: Yann Gouffon, yann@antistatique.net
 * Date:   2014-04-29 17:53:14
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 *
 * Last Modified by:   Toni Fisler
 * Last Modified time: 2014-04-30 14:33:12
 ========================================================== */

 var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    shell = require('gulp-shell'),
    stylish = require('jshint-stylish'),
    clean = require('gulp-clean');

// JS task
gulp.task('scripts', function() {
  gulp.src('./assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Build vendors
gulp.task('vendors', function() {

  gulp.src([
      './bower_components/TimelineJS/compiled/**/*'
    ])
    .pipe(gulp.dest('build/js/TimelineJS'));

  gulp.src([
          './bower_components/yamm3/yamm/yamm.css'
      ])
      .pipe(concat('vendors.css'))
      .pipe(minifycss())
      .pipe(gulp.dest('./build/css'));

  gulp.src([
      './bower_components/jquery/jquery.js',
      './bower_components/jquery.tablesorter/js/jquery.tablesorter.js',
      './bower_components/chosen_v1.1.0/chosen.jquery.min.js',
      './bower_components/typeahead.js/dist/typeahead.bundle.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
      './bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
      './bower_components/jquery.tablesorter/js/jquery.tablesorter.js'
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// SASS compile, autoprefix and minify task
gulp.task('styles', function() {
  return gulp.src('assets/sass/admin.scss')
    .pipe(sass())
      .on('error', gutil.beep)
      .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(minifycss())
    .pipe(gulp.dest('build/css'));
});


gulp.task('browser-sync', function() {
    browserSync.init(['./styleguide/**/*.html'], {
      proxy: 'localhost',
      open: false,
      debounce: 400
    });
});


gulp.task('hologram', shell.task([
  'LC_ALL="en_US.UTF-8"',
  'hologram'
]));

gulp.task('build-images', function() {
  return gulp.src(['assets/img/**'])
          .pipe(gulp.dest('build/img'));
});

gulp.task('build-fonts', function() {
  return gulp.src(['assets/fonts/**'])
          .pipe(gulp.dest('build/fonts'));
});

gulp.task('build-pages', function() {
  gulp.src(['assets/pages/**'])
    .pipe(gulp.dest('styleguide/pages'));
});

gulp.task('default', ['styles', 'watch', 'vendors', 'browser-sync', 'scripts', 'build-images', 'build-fonts', 'build-pages']);
gulp.task('build', ['styles', 'scripts', 'vendors', 'build-images', 'build-fonts', 'build-pages']);

gulp.task('watch',['styles', 'scripts', 'vendors', 'build-images', 'build-fonts', 'build-pages'], function() {
  gulp.watch('assets/sass/**/*.scss', ['styles']);
  gulp.watch('assets/js/*.js', ['scripts']);
  gulp.watch('build/**/*.{js,css}', ['hologram']);
  gulp.watch('assets/**/*.{js,scss}', ['hologram']);
  gulp.watch('styleguide-theme/**/*.{html,css}', ['hologram']);
  gulp.watch(['assets/img/**/*.{jpg,png,gif,svg}'], ['build-images']);
  gulp.watch(['assets/fonts/**/*.{eot,svg,woff,ttf}'], ['build-fonts']);
  gulp.watch(['assets/pages/**/*.html'], ['build-pages']);
});