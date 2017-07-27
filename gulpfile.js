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
  rimraf = require('rimraf'),
  assemble = require('fabricator-assemble'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  globby = require('globby'),
  path = require('path'),
  markdown = require('markdown-it')({
    html: true
  });

/**
 * Configuration
 */
var config = {
  dev: $.util.env.dev,
  src: {
    styles: {
      fabricator: 'src/assets/fabricator/styles/fabricator.scss'
    },
    javascript: {
      fabricator: [
        'node_modules/prismjs/prism.js',
        'src/assets/fabricator/scripts/*.js'
      ]
    }
  },
  styleguide: {
    dest: 'styleguide'
  },
  framework: {
    dest: 'build'
  },
  locales: yaml.safeLoad(fs.readFileSync('src/data/locales.yml', 'utf-8')),
  autoprefixer: ['last 2 versions', 'safari 8', 'ie 9', 'ff 28']
};

/**
 * Build vendors dependencies
 */
gulp.task('vendors', function() {

  // CSS VENDORS
  gulp.src([
    'node_modules/Yamm/yamm/yamm.css',
    'node_modules/bootstrap-accessibility-plugin/plugins/css/bootstrap-accessibility.css',
    'node_modules/blueimp-gallery/css/blueimp-gallery.min.css',
    'node_modules/blueimp-bootstrap-image-gallery/css/bootstrap-image-gallery.min.css',
    'node_modules/pikaday/css/pikaday.css'
  ])
    .pipe($.concat('vendors.css'))
    .pipe($.cleanCss())
    .pipe(gulp.dest(config.framework.dest + '/css'));

  // JS VENDORS
  // (with jQuery and Bootstrap dependencies first)
  gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/drmonty-chosen/js/chosen.jquery.js',
    'node_modules/typeahead.js/dist/typeahead.bundle.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
    'node_modules/bootstrap-accessibility-plugin/plugins/js/bootstrap-accessibility.js',
    'node_modules/tablesorter/dist/js/jquery.tablesorter.js',
    'node_modules/jquery-drilldown/dist/jquery.drilldown.js',
    'node_modules/Placeholdr/placeholdr.js',
    'node_modules/blueimp-gallery/js/jquery.blueimp-gallery.min.js',
    'node_modules/blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.min.js',
    'node_modules/moment/moment.js',
    'node_modules/pikaday/pikaday.js',
    'node_modules/twitter-timeline/index.js'
  ])
    .pipe($.concat('vendors.js'))
    .pipe(gulp.dest(config.framework.dest + '/js'))
    .pipe($.concat('vendors.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(config.framework.dest + '/js'));

  // FONTS SOURCES
  // Important to add the bootstrap fonts to avoid issues with the fonts include path
  gulp.src([
    'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
    'assets/fonts/*'
  ])
    .pipe(gulp.dest(config.framework.dest + '/fonts'));
});


/**
 * Build styles from SCSS files
 * With error reporting on compiling (so that there's no crash)
 */
gulp.task('styles', function() {
  if (!argv.dev) { console.log('[styles] Outputting minified styles.' ); }
  else { console.log('[styles] Processing styles for dev env. No minifying here, for sourcemaps!') }

  return gulp.src('src/assets/sass/admin.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.if(argv.dev, $.sourcemaps.init()))
    .pipe($.autoprefixer({
      browsers: config.autoprefixer
    }))
    .pipe($.if(argv.dev, $.sourcemaps.write()))
    .pipe($.if(!argv.dev, $.cleanCss()))
    .pipe(gulp.dest(config.framework.dest + '/css'));
});

gulp.task('print', function() {
  return gulp.src('src/assets/sass/print/print.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.if(argv.dev, $.sourcemaps.init()))
    .pipe($.autoprefixer({
      browsers: config.autoprefixer
    }))
    .pipe($.if(argv.dev, $.sourcemaps.write()))
    .pipe($.if(!argv.dev, $.cleanCss()))
    .pipe(gulp.dest(config.framework.dest + '/css'));
});

gulp.task('twitter-inject', function() {
  return gulp.src('src/assets/sass/twitter-inject.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.if(argv.dev, $.sourcemaps.init()))
    .pipe($.autoprefixer({
      browsers: config.autoprefixer
    }))
    .pipe($.if(argv.dev, $.sourcemaps.write()))
    .pipe($.if(!argv.dev, $.cleanCss()))
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
gulp.task('clean-twig', function(cb) {
  rimraf('src/views/pages', cb);
});

gulp.task('twig', ['clean-twig'], function() {
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

    // Build a dictionary using the filename as the main key
    translations.forEach(function(file) {
      var id = path.basename(file, path.extname(file));
      dictionary[id] = yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
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

          // Remove any digits coming from the component key prefix
          args = args.replace(/(\d+[\-\.]?)/g, '');

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
        replace: function(regex, newSubstr, str) {
          return str.replace(new RegExp(regex, 'g'), newSubstr);
        },
        modulo: function(index, divider, block) {
          if ((parseInt(index,10) + 1) % divider === 0) {
            return block.fn(this);
          }
        },
        // Remove number prefixes (01- or 01.02-)
        prefixless: function(value) {
          return value.replace(/(\d+[\-\.]?)+/ig, '');
        }
      }
    })
  }
  done();
});

// Copy all the required files to the styleguide folder
gulp.task('copy', ['copy:framework', 'copy:assets', 'copy:landing', 'copy:files']);

gulp.task('copy:framework', function() {
  return gulp.src([config.framework.dest + '/**/*'])
    .pipe(gulp.dest(config.styleguide.dest));
});

gulp.task('copy:assets', function() {
  return gulp.src(['styleguide-img/**/*'])
    .pipe(gulp.dest(config.styleguide.dest + '/styleguide-img'));
});

gulp.task('copy:landing', function() {
  return gulp.src(['src/index.html'])
    .pipe(gulp.dest(config.styleguide.dest));
});

gulp.task('copy:files', function() {
  return gulp.src(['src/assets/files/*'])
    .pipe(gulp.dest(config.styleguide.dest + '/files'));
});


// Build Fabricator style
gulp.task('styles:fabricator', function() {
  gulp.src(config.src.styles.fabricator)
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: config.autoprefixer
    }))
    .pipe($.if(!config.dev, $.cleanCss()))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.styleguide.dest + '/css'))
    .pipe($.if(config.dev, reload({stream:true})));
});

// Build Fabricator scripts
gulp.task('scripts:fabricator', function() {
  return gulp.src(config.src.javascript.fabricator)
    .pipe($.concat('fabricator.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(config.styleguide.dest + '/js'));
});


/**
 * Clean output directories
 */
gulp.task('clean', function(cb) {
  rimraf(config.styleguide.dest, cb);
});


/**
 * Serve
 */
gulp.task('serve', ['assemble-everything'], function () {
  browserSync({
    server: {
      baseDir: config.styleguide.dest
    },
    notify: false,
    open: false
  });

  gulp.task('assemble:watch', ['assemble-everything'], reload);
  gulp.watch(['src/**/*.{html,md,json,yml}'], ['assemble:watch']);

  gulp.watch(['src/assets/sass/**/*.scss', 'src/assets/fabricator/styles/**/*.scss'], function() {
    runSequence('styles', 'print', 'twitter-inject', 'assemble:watch');
  });
  gulp.watch(['src/assets/js/*.js', 'src/assets/fabricator/scripts/**/*.js'], function() {
    runSequence('scripts', 'assemble:watch');
  });
  gulp.watch(['src/assets/img/**/*.{jpg,png,gif,svg}'], function() {
    runSequence('build-images', 'assemble:watch');
  });
  gulp.watch(['src/assets/fonts/**/*.{eot,woff,woff2,ttf}'], function() {
    runSequence('build-fonts', 'assemble:watch');
  });
  gulp.watch(['src/example-pages/*.twig'], function() {
    runSequence('twig', 'assemble:watch');
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
  runSequence(
    'vendors',
    'styles',
    'print',
    'twitter-inject',
    'scripts',
    'twig',
    'build-images',
    'build-fonts',
    'styles:fabricator',
    'scripts:fabricator',
    'assemble',
    'copy',
    cb
  );
});
