/* ==========================================================
 * gulpfile.js
 * List of Gulp.js task to build and run the project
 *
 * Author: Yann Gouffon, yann@antistatique.net
 * Date:   2014-04-29 17:53:14
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

'use strict';

/**
 * Load required plugins
 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),
    argv = require('yargs').argv,
    del = require('del'),
    assemble = require('fabricator-assemble'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    globby = require('globby'),
    path = require('path');

/**
 * Configuration
 */
var config = {
  dev: $.util.env.dev,
  src: {
    styles: {
      fabricator: 'src/assets/fabricator/styles/fabricator.scss',
    },
  },
  styleguide: {
    dest: 'styleguide'
  },
  framework: {
    dest: 'build'
  },
  locales: ['en', 'de', 'fr', 'it']
};

/**
 * Build vendors dependencies
 */
gulp.task('vendors', function() {

  // DEPRECATED, to be removed in 3.0.0
  gulp.src([
      'bower_components/jquery.socialshareprivacy/socialshareprivacy/images/*'
    ])
    .pipe(gulp.dest(config.framework.dest + '/css/images'));

  // CSS VENDORS
  gulp.src([
      'bower_components/yamm3/yamm/yamm.css',
      'bower_components/jquery.socialshareprivacy/socialshareprivacy/socialshareprivacy.css',
      'bower_components/bootstrapaccessibilityplugin/plugins/css/bootstrap-accessibility.css',
      'bower_components/blueimp-gallery/css/blueimp-gallery.min.css',
      'bower_components/blueimp-bootstrap-image-gallery/css/bootstrap-image-gallery.min.css',
      'node_modules/pikaday/css/pikaday.css'
    ])
    .pipe($.concat('vendors.css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest(config.framework.dest + '/css'));

  // JS VENDORS
  // (with jQuery and Bootstrap dependencies first)
  gulp.src([
      'bower_components/jquery/jquery.js',
      'bower_components/jquery.tablesorter/js/jquery.tablesorter.js',
      'bower_components/chosen_v1.1.0/chosen.jquery.min.js',
      'bower_components/typeahead.js/dist/typeahead.bundle.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
      'bower_components/bootstrapaccessibilityplugin/plugins/js/bootstrap-accessibility.js',
      'bower_components/jquery.tablesorter/js/jquery.tablesorter.js',
      'bower_components/jquery.socialshareprivacy/jquery.socialshareprivacy.min.js',
      'bower_components/jquery-drilldown/jquery.drilldown.min.js',
      'bower_components/placeholdr/placeholdr.js',
      'bower_components/blueimp-gallery/js/jquery.blueimp-gallery.min.js',
      'bower_components/blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.min.js',
      'node_modules/moment/moment.js',
      'node_modules/pikaday/pikaday.js'
    ])
    .pipe($.concat('vendors.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(config.framework.dest + '/js'));

  // FONTS SOURCES
  // Important to add the bootstrap fonts to avoid issues with the fonts include path
  gulp.src([
      'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
      'assets/fonts/*'
    ])
    .pipe(gulp.dest(config.framework.dest + '/fonts'));
});

/**
 * Build polyfills
 */
gulp.task('polyfills', function() {
  return gulp.src([
      'bower_components/html5shiv/dist/html5shiv.min.js',
      'bower_components/html5shiv/dist/html5shiv-printshiv.min.js',
      'bower_components/respond/dest/respond.min.js'
    ])
    .pipe($.concat('polyfills.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(config.framework.dest + '/js'));
});

/**
 * Build styles from SCSS files
 * With error reporting on compiling (so that there's no crash)
 */
gulp.task('styles', function() {
  if (!argv.dev) { console.log('[styles] Outputting minified styles.' ); }
  else { console.log('[styles] Processing styles for dev env. No minifying here, for sourcemaps!') }

  return gulp.src('src/assets/sass/admin.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.if(argv.dev, $.sourcemaps.init()))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'ff 27', 'opera 12.1']
    }))
    .pipe($.if(argv.dev, $.sourcemaps.write()))
    .pipe($.if(!argv.dev, $.minifyCss()))
    .pipe(gulp.dest(config.framework.dest + '/css'));
});

gulp.task('print', function() {
  return gulp.src('src/assets/sass/print/print.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.if(argv.dev, $.sourcemaps.init()))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'ff 27', 'opera 12.1']
    }))
    .pipe($.if(argv.dev, $.sourcemaps.write()))
    .pipe($.if(!argv.dev, $.minifyCss()))
    .pipe(gulp.dest(config.framework.dest + '/css'));
});


/**
 * Build JS
 * With error reporting on compiling (so that there's no crash)
 */
gulp.task('scripts', function() {
  return gulp.src(['src/assets/js/*.js', 'src/assets/fabricator/scripts/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.concat('main.js'))
    .pipe(gulp.dest(config.framework.dest + '/js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest(config.framework.dest + '/js'));
});


/**
 * Copy images to build
 */
gulp.task('build-images', function() {
  return gulp.src(['src/assets/img/**'])
    .pipe(gulp.dest(config.framework.dest + '/img'));
});


/**
 * Copy fonts to build
 */
gulp.task('build-fonts', function() {
  return gulp.src(['src/assets/fonts/**'])
    .pipe(gulp.dest(config.framework.dest + '/fonts'));
});


/**
 * Compile TWIG example pages
 */
gulp.task('twig', function() {
    return gulp.src('src/assets/pages/*.twig')
        .pipe($.twig())
        .pipe(gulp.dest(config.styleguide.dest + '/pages'));
});


/**
 * FABRICATOR
 */
// Build the style guide
gulp.task('assemble-everything', ['assemble', 'copy'])

gulp.task('assemble', function(done) {
  // Build style guide for every language
  config.locales.forEach(function(locale){
    var dest = config.styleguide.dest + '/' + locale,
        data = {
          locale: locale
        },
        dictionary = {};

    // Get all translation files for the current locale
    var translations = globby.sync('src/locales/' + locale + '/*.yml');

    // Build a dictionnary using the filename as the main key
    translations.forEach(function(file) {
      var id = path.basename(file, path.extname(file));
      var content = yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
      dictionary[id] = content;
    });

    // Assemble the style guide
  	assemble({
      dest: dest,
  		logErrors: config.dev,
      helpers: {
        // Register the translation helper
        t: function(ref) {
          if (!ref) return;

          return ref.trim().split('.').reduce(function(dict, key){
            if (!dict) {
              return null;
            }
            return dict[key];
          }, dictionary) || '[Missing translation: ' + ref + ']';
        },
        // Return true if the language given match with the current locale
        isCurrentLocale: function(lang, options) {
          if (lang === locale) {
            return options.fn(this);
          }
          return options.inverse(this);
        },
        // Return the corresponding data value
        data: function(value) {
          return data[value] || '';
        },
        toUpperCase: function(value) {
          return value.toUpperCase();
        },
        renderFile: function(file) {
          return fs.readFileSync('src/materials-data/' + file, 'utf-8');
        }
      }
  	});
  });
  done();
});

// Copy all the framework required files to the styleguide folder (css, js, fonts, images)
gulp.task('copy', function() {
  return gulp.src([config.framework.dest + '/**/*'])
    .pipe(gulp.dest(config.styleguide.dest));
});

// Build Fabricator style
gulp.task('styles:fabricator', function() {
	gulp.src(config.src.styles.fabricator)
		.pipe($.sourcemaps.init())
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.autoprefixer('last 1 version'))
		.pipe($.if(!config.dev, $.csso()))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(config.styleguide.dest + '/css'))
		.pipe($.if(config.dev, reload({stream:true})));
});


/**
 * Clean output directories
 */
gulp.task('clean', function(cb) {
  del([config.styleguide.dest, config.framework.dest], cb);
});


/**
 * Serve
 */
gulp.task('serve', ['assemble-everything'], function () {
  browserSync({
    server: {
      baseDir: config.styleguide.dest,
    },
    notify: false,
    open: false
  });

  gulp.task('assemble:watch', ['assemble', 'copy'], reload);
  gulp.watch(['src/**/*.{html,md,json,yml}', 'src/**/**/*.{html,js}'], ['assemble:watch']);

  gulp.watch(['src/assets/sass/**/*.scss'], function() {
    runSequence('styles', 'print', 'assemble:watch');
  });
  gulp.watch(['src/assets/js/*.js'], function() {
    runSequence('scripts', 'assemble:watch');
  });
  gulp.watch(['src/assets/img/**/*.{jpg,png,gif,svg}'], function() {
    runSequence('build-images', 'assemble:watch');
  });
  gulp.watch(['src/assets/fonts/**/*.{eot,svg,woff,ttf}'], function() {
    runSequence('build-fonts', 'assemble:watch');
  });
  gulp.watch(['src/assets/pages/**/*.twig'], function() {
    runSequence('twig', reload);
  });
});


/**
 * Deploy to GH pages
 */
gulp.task('deploy', function () {
  return gulp.src(config.styleguide.dest + '/**/*')
    .pipe($.ghPages());
});


/**
 * Default task build the style guide
 */
gulp.task('default', ['clean'], function(cb) {
  runSequence('vendors', 'polyfills', 'styles', 'print', 'scripts', 'twig', 'build-images', 'build-fonts', 'styles:fabricator', 'assemble-everything', cb);
});
