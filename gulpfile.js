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

'use strict';

/**
 * Import plugins
 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),
    del = require('del');

/**
 * Build vendors dependencies
 */
gulp.task('vendors', function() {

  gulp.src([
      'bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*'
    ])
    .pipe(gulp.dest('build/css/bootstrap'));

  gulp.src([
      'bower_components/jquery.socialshareprivacy/socialshareprivacy/images/*'
    ])
    .pipe(gulp.dest('build/css/images'));

  /**
   * CSS VENDORS
   */
  gulp.src([
        'bower_components/yamm3/yamm/yamm.css',
        'bower_components/jquery.socialshareprivacy/socialshareprivacy/socialshareprivacy.css',
        'bower_components/bootstrapaccessibilityplugin/plugins/css/bootstrap-accessibility.css'
      ])
      .pipe($.concat('vendors.css'))
      .pipe($.minifyCss())
      .pipe(gulp.dest('build/css'));

  /**
   * JS VENDORS
   * (with jQuery and Bootstrap dependencies first)
   */

  gulp.src([
      'bower_components/jquery/jquery.js',
      'bower_components/jquery.tablesorter/js/jquery.tablesorter.js',
      'bower_components/chosen_v1.1.0/chosen.jquery.min.js',
      'bower_components/typeahead.js/dist/typeahead.bundle.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
      'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
      'bower_components/bootstrapaccessibilityplugin/plugins/js/bootstrap-accessibility.js',
      'bower_components/jquery.tablesorter/js/jquery.tablesorter.js',
      'bower_components/jquery.socialshareprivacy/jquery.socialshareprivacy.min.js',
      'bower_components/jquery-drilldown/jquery.drilldown.min.js'
    ])
    .pipe($.concat('vendors.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));


  /**
   * FONTS SOURCES
   * Important to add the bootstrap fonts to avoid issues with the fonts include path
   */
  gulp.src([
      'bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*',
      'assets/fonts/*'
    ])
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('polyfills', function() {
  return gulp.src([
      'bower_components/html5shiv/dist/html5shiv.min.js',
      'bower_components/html5shiv/dist/html5shiv-printshiv.min.js',
      'bower_components/respond/dest/respond.min.js'
    ])
    .pipe($.concat('polyfills.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));
});

/**
 * Build styles from SCSS files
 * With error reporting on compiling (so that there's no crash)
 */
gulp.task('styles', function() {
  return gulp.src('assets/sass/admin.scss')
    .pipe($.rubySass())
      .on('error', $.util.beep)
      .on('error', $.notify.onError(function (error) {
        return 'Message to the notifier: ' + error.message;
      }))
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe($.minifyCss())
    .pipe(gulp.dest('build/css'));
});

gulp.task('print', function() {
  return gulp.src('assets/sass/print/print.scss')
    .pipe($.rubySass())
      .on('error', $.util.beep)
      .on('error', $.notify.onError(function (error) {
        return 'Message to the notifier: ' + error.message;
      }))
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe($.minifyCss())
    .pipe(gulp.dest('build/css'));
});


/**
 * Build JS
 * With error reporting on compiling (so that there's no crash)
 */
gulp.task('scripts', function() {
  return gulp.src('assets/js/*.js')
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('build/js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));
});

/**
 * Lint JS
 */

 gulp.task('jshint', function () {
   return gulp.src('assets/js/*js')
     .pipe($.jshint())
     .pipe($.jshint.reporter('jshint-stylish'))
     .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
 });

/**
 * Build Hologram Styleguide
 */
gulp.task('styleguide', function () {
  return gulp.src('hologram_config.yml')
    .pipe($.hologram({ bundler: true }));
});

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


/**
 * Clean output directories
 */
gulp.task('clean', del.bind(null, ['build', 'styleguide']));

/**
 * Serve
 */
gulp.task('serve', ['styles'], function () {
  browserSync({
    server: {
      baseDir: ['styleguide'],
    },
    open: false
  });
  gulp.watch(['**/*.html'], reload);
  gulp.watch(['assets/sass/**/*.scss'], function() {
    runSequence('styles', 'print', 'styleguide', reload);
  });
  gulp.watch(['assets/js/*.js'], function() {
    runSequence('jshint', 'scripts', 'styleguide', reload);
  });
  gulp.watch(['assets/img/**/*.{jpg,png,gif,svg}'], function() {
    runSequence('build-images', 'styleguide', reload);
  });
  gulp.watch(['assets/fonts/**/*.{eot,svg,woff,ttf}'], function() {
    runSequence('build-fonts', 'styleguide', reload);
  });
  gulp.watch(['assets/pages/**/*.html'], function() {
    runSequence('build-pages', 'styleguide', reload);
  });
});

/**
 * Deploy to GH pages
 */

gulp.task('deploy', function () {
  return gulp.src("styleguide/**/*")
    .pipe($.ghPages());
});

/**
 * Default task
 */
gulp.task('default', ['clean'], function(cb) {
  runSequence('vendors', 'polyfills', 'styles', 'print', 'jshint', 'scripts', 'build-images', 'build-fonts', 'build-pages', 'styleguide', cb);
});

