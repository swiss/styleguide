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
    path = require('path'),
    markdown = require('markdown-it')();

/**
 * Configuration
 */
var config = {
  dev: $.util.env.dev,
  src: {
    styles: {
      fabricator: 'src/assets/fabricator/styles/fabricator.scss',
    },
    javascript: {
      fabricator: [
        'node_modules/prismjs/prism.js',
        'src/assets/fabricator/scripts/*.js'
      ],
    },
  },
  styleguide: {
    dest: 'styleguide'
  },
  framework: {
    dest: 'build'
  },
  locales: yaml.safeLoad(fs.readFileSync('src/data/locales.yml', 'utf-8'))
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
  return gulp.src(['src/assets/js/*.js'])
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
  return gulp.src(['src/example-pages/*.twig', '!src/example-pages/layout.twig'])
    .pipe($.twig())
    .pipe(gulp.dest('src/views/pages'));
});


/**
 * FABRICATOR
 */
// Build the style guide
gulp.task('assemble-everything', function(cb) {
  runSequence('clean', 'assemble', 'copy', 'styles:fabricator', 'scripts:fabricator', cb);
});

gulp.task('assemble', function(done) {
  // Build style guide for every language
  for (var localeCode in config.locales) {
    var locale = config.locales[localeCode];

    // Do not build disabled locales
    if (locale.disabled) continue;

    var dest = config.styleguide.dest + '/' + locale.code,
        data = {
          locale: locale.code,
          version: fs.readFileSync('VERSION', 'utf-8')
        },
        dictionary = {};

    // Get all translation files for the current locale
    var translations = globby.sync('src/locales/' + locale.code + '/*.yml');

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
        t: function() {
          // Build an array out of fn arguments
          var args = Array.prototype.slice.call(arguments);
          // Remove the last entry which is an object given by Handlebars
          var obj = args.pop();

          // Build a full translation key with all arguments
          args = args.join('.');

          // Look for the translation in the dictionnary
          var value = args.trim().split('.').reduce(function(dict, key){
            if (!dict) {
              return null;
            }
            return dict[key];
          }, dictionary);

          // Parse content for Markdown if required
          if (value && obj.hash && obj.hash.markdown) {
            var value = markdown.render(value);
          }

          return value || '[Missing translation: ' + args + ']';
        },
        // Return true if the language given match with the current locale
        isCurrentLocale: function(lang, options) {
          if (lang === locale.code) {
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
        renderFile: function(path, file) {
          var fileName = 'src/materials-data/' + path + file,
              exists = fs.existsSync(fileName);

          if (!exists) return '[File "' + fileName + '" doesn’t exist.]';

          return fs.readFileSync(fileName, 'utf-8');
        },
        replace: function(substr, newSubstr, str) {
          return str.replace(substr, newSubstr);
        },
        modulo: function(index, divider, block) {
          if ((parseInt(index,10) + 1) % divider === 0) {
            return block.fn(this);
          }
        }
      }
  	})
  }
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
		.pipe($.if(!config.dev, $.minifyCss()))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(config.styleguide.dest + '/css'))
		.pipe($.if(config.dev, reload({stream:true})));
});

// Build Fabricator scripts
gulp.task('scripts:fabricator', function() {
  return gulp.src(config.src.javascript.fabricator)
    .pipe($.concat('fabricator.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(config.framework.dest + '/js'));
});


/**
 * Clean output directories
 */
gulp.task('clean', function(cb) {
  del([config.styleguide.dest], cb);
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

  gulp.task('assemble:watch', ['assemble-everything'], reload);
  gulp.watch(['src/**/*.{html,md,json,yml}', 'src/**/**/*.{html,js}'], ['assemble:watch']);

  gulp.watch(['src/assets/sass/**/*.scss', 'src/assets/fabricator/styles/**/*.scss'], function() {
    runSequence('styles', 'print', 'assemble:watch');
  });
  gulp.watch(['src/assets/js/*.js', 'src/assets/fabricator/scripts/**/*.js'], function() {
    runSequence('scripts', 'assemble:watch');
  });
  gulp.watch(['src/assets/img/**/*.{jpg,png,gif,svg}'], function() {
    runSequence('build-images', 'assemble:watch');
  });
  gulp.watch(['src/assets/fonts/**/*.{eot,svg,woff,ttf}'], function() {
    runSequence('build-fonts', 'assemble:watch');
  });
  gulp.watch(['src/views/pages/twig/*.twig'], function() {
    runSequence('twig', reload);
  });
});


/**
 * Deploy to GH pages
 */
gulp.task('deploy', function () {
  if (argv.github) {
    return gulp.src(config.styleguide.dest + '/**/*')
     .pipe($.ghPages());
  }
  else {
    return gulp.src(config.styleguide.dest + '/**/*')
      .pipe($.rsync({
        root: 'styleguide',
        hostname: 'swg',
        destination: '/var/www/swg',
        progress: true,
        recursive: true,
        clean: true
      }));
  }
});


/**
 * Default task build the style guide
 */
gulp.task('default', ['clean'], function(cb) {
  runSequence('vendors', 'polyfills', 'styles', 'print', 'scripts', 'twig', 'build-images', 'build-fonts', 'styles:fabricator', 'scripts:fabricator', 'assemble', 'copy', cb);
});
