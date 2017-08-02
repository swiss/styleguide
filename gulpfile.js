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
  styleguide: {
    src: 'src/styleguide',
    dest: 'styleguide'
  },
  framework: {
    src: 'src/framework',
    dest: 'build'
  },
  locales: yaml.safeLoad(fs.readFileSync('src/styleguide/data/locales.yml', 'utf-8')),
  autoprefixer: ['last 2 versions', 'safari 8', 'ie 9', 'ff 28']
};

/**
 * Build vendors dependencies
 */
gulp.task('framework:vendors', function() {

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
    'node_modules/pikaday/pikaday.js'
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
    'framework/fonts/*'
  ])
    .pipe(gulp.dest(config.framework.dest + '/fonts'));
});


/**
 * Build styles from SCSS files
 * With error reporting on compiling (so that there's no crash)
 */
gulp.task('framework:styles', function() {
  if (!argv.dev) { console.log('[styles] Outputting minified styles.' ); }
  else { console.log('[styles] Processing styles for dev env. No minifying here, for sourcemaps!') }

  return gulp.src(config.framework.src + '/sass/admin.scss')
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
  return gulp.src(config.framework.src + '/sass/print/print.scss')
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
gulp.task('framework:scripts', function() {
  return gulp.src([config.framework.src + '/js/*.js'])
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
gulp.task('framework:images', function() {
  return gulp.src([config.framework.src + '/img/**'])
    .pipe(gulp.dest(config.framework.dest + '/img'));
});


/**
 * Copy fonts to build
 */
gulp.task('framework:fonts', function() {
  return gulp.src([config.framework.src + '/fonts/**'])
    .pipe(gulp.dest(config.framework.dest + '/fonts'));
});


/**
 * Compile TWIG example pages
 */
gulp.task('styleguide:clean-twig', function(cb) {
  rimraf(config.styleguide.src + '/views/pages', cb);
});

gulp.task('styleguide:twig', ['styleguide:clean-twig'], function() {
  return gulp.src([
    config.styleguide.src + '/example-pages/*.twig',
    '!' + config.styleguide.src + '/example-pages/layout.twig'
  ])
    .pipe($.twig())
    .pipe(gulp.dest(config.styleguide.src + '/views/pages'));
});


/**
 * FABRICATOR
 */
// Build the style guide
gulp.task('styleguide:build', function(cb) {
  runSequence('styleguide:clean', 'styleguide:assemble', 'styleguide:copy', 'styleguide:styles', 'styleguide:scripts', cb);
});

gulp.task('styleguide:assemble', function(done) {
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
    var translations = globby.sync(config.styleguide.src + '/locales/' + locale.code + '/*.yml');

    // Build a dictionary using the filename as the main key
    translations.forEach(function(file) {
      var id = path.basename(file, path.extname(file));
      dictionary[id] = yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
    });

    // Assemble the style guide
    assemble({
      layouts: config.styleguide.src + '/views/layouts/*',
      layoutIncludes: config.styleguide.src + '/views/layouts/includes/*',
      views: [
        config.styleguide.src + '/views/**/*',
        '!' + config.styleguide.src + '/views/+(layouts)/**'
      ],
      materials: config.styleguide.src + '/materials/**/*',
      data: config.styleguide.src + '/data/**/*.{json,yml}',
      docs: config.styleguide.src + '/docs/**/*.md',
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
          var fileName = config.styleguide.src + '/materials-data/' + path + file,
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
gulp.task('styleguide:copy', [
  'styleguide:copy:framework',
  'styleguide:copy:assets',
  'styleguide:copy:landing',
  'styleguide:copy:files'
]);

gulp.task('styleguide:copy:framework', function() {
  return gulp.src([config.framework.dest + '/**/*'])
    .pipe(gulp.dest(config.styleguide.dest));
});

gulp.task('styleguide:copy:assets', function() {
  return gulp.src([config.styleguide.src + '/assets/img/**/*'])
    .pipe(gulp.dest(config.styleguide.dest + '/styleguide-img'));
});

gulp.task('styleguide:copy:landing', function() {
  return gulp.src([config.styleguide.src + '/index.html'])
    .pipe(gulp.dest(config.styleguide.dest));
});

gulp.task('styleguide:copy:files', function() {
  return gulp.src([config.styleguide.src + '/assets/files/*'])
    .pipe(gulp.dest(config.styleguide.dest + '/files'));
});


// Build Fabricator style
gulp.task('styleguide:styles', function() {
  gulp.src(config.styleguide.src + '/assets/fabricator/styles/fabricator.scss')
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
gulp.task('styleguide:scripts', function() {
  return gulp.src([
    'node_modules/prismjs/prism.js',
    config.styleguide.src + '/assets/fabricator/scripts/*.js'
  ])
    .pipe($.concat('fabricator.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(config.styleguide.dest + '/js'));
});


/**
 * Clean output directories
 */
gulp.task('styleguide:clean', function(cb) {
  rimraf(config.styleguide.dest, cb);
});


/**
 * Serve
 */
gulp.task('styleguide:serve', ['assemble-everything'], function () {
  browserSync({
    server: {
      baseDir: config.styleguide.dest
    },
    notify: false,
    open: false
  });

  gulp.task('assemble:watch', ['assemble-everything'], reload);
  gulp.watch([config.styleguide.src + '/**/*.{html,md,json,yml}'], ['assemble:watch']);

  gulp.watch([config.framework.src + '/sass/**/*.scss', config.styleguide.src + '/assets/fabricator/styles/**/*.scss'], function() {
    runSequence('styles', 'print', 'assemble:watch');
  });
  gulp.watch([config.framework.src + '/js/*.js', config.styleguide.src + '/assets/fabricator/scripts/**/*.js'], function() {
    runSequence('scripts', 'assemble:watch');
  });
  gulp.watch([config.framework.src + '/img/**/*.{jpg,png,gif,svg}'], function() {
    runSequence('build-images', 'assemble:watch');
  });
  gulp.watch([config.framework.src + '/fonts/**/*.{eot,woff,woff2,ttf}'], function() {
    runSequence('build-fonts', 'assemble:watch');
  });
  gulp.watch([config.styleguide.src + '/example-pages/*.twig'], function() {
    runSequence('twig', 'assemble:watch');
  });
});


/**
 * Deploy to GH pages
 */
gulp.task('styleguide:deploy', function () {
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

gulp.task('framework:build', function(cb) {
  runSequence(
    'framework:vendors',
    'framework:styles',
    'print',
    'framework:scripts',
    'framework:images',
    'framework:fonts',
    cb
  );
});

gulp.task('styleguide:build', ['styleguide:clean'], function(cb) {
  runSequence(
    'styleguide:twig',
    'styleguide:styles',
    'styleguide:scripts',
    'styleguide:assemble',
    'styleguide:copy',
    cb
  );
});


gulp.task('build', function(cb) {
  runSequence('framework:build', 'styleguide:build', cb);
});

/**
 * Default task build the style guide
 */
gulp.task('default', ['build']);
