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

// JS vendors concat and minify
gulp.task('js_vendors', function() {
  gulp.src([
      './bower_components/jquery/jquery.js',
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

// CSS vendors concat and minify
gulp.task('css_vendors', function() {
  gulp.src([
      ''
    ])
    .pipe(concat('vendors.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['./styleguide/**/*.html'], {
      proxy: 'localhost',
      open: false,
      debounce: 400
    });
});

gulp.task('hologram', function () {
  gulp.src('./build')
    .pipe(shell('hologram'));
});

gulp.task('build', function() {
  return gulp.src(['assets/img/**'])
          .pipe(gulp.dest('build/img'));
});

gulp.task('buildFonts', function() {
  return gulp.src(['assets/fonts/**'])
          .pipe(gulp.dest('build/fonts'));
});

gulp.task('default', ['styles', 'watch', 'browser-sync', 'build', 'js_vendors']);

gulp.task('watch', function() {
  gulp.watch('./assets/sass/*.scss', ['styles']);
  gulp.watch('./assets/js/*.js', ['scripts']);
  gulp.watch('./build/**/*.{js,css}', ['hologram']);
  gulp.watch('./assets/**/*.md', ['hologram']);
  gulp.watch(['assets/img/**/*.{jpg,png,gif,svg}'], ['build']);
  // gulp.watch(['assets/fonts/**/*.{eot,svg,woff,ttf}'], ['buildFonts']);
});