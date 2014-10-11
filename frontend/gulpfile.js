var gulp = require('gulp');

var concat = require('gulp-concat');
var prefix = require('gulp-autoprefixer');
var cssmin = require("gulp-cssmin");
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var size = require('gulp-size');

var fs = require('fs');
var path = require("path");
var del = require('del');

var Notification = require('node-notifier');
var notifier = new Notification();

var handleError = function(title, err) {
  notifier.notify({
    "title": "Woodlove",
    "subtitle": title,
    "message": err
  });
  console.error(err);
};


var paths = {
  styles: ['styles/**/*.less'],
  // Order is important!
  vendor: [
    'scripts/core/vendor/*.js',
    'scripts/core/namespace/*.js',
    'scripts/core/configs/*.js',
    'scripts/core/tools/*.js',
    'scripts/core/features/*.js',
    'scripts/core/user/*.js',
    'scripts/core/**/*.js'
  ],
  modules: [
    //'javascripts/dev/modules/**/*.js',

    // Somewhat safe to load
    'scripts/modules/**/*.js',

    // Loaders
    'scripts/loader/loadScriptsConfig.js',
    'scripts/loader/loadScripts.js',
    'scripts/loader/initApp.js'
  ]
};

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

var frontendVersionBuildingInProgress = false;
gulp.task('version', function(){
  if (frontendVersionBuildingInProgress === true) {
      return;
  }
  frontendVersionBuildingInProgress = true;
  var sys = require('sys')
  var exec = require('child_process').exec;

    function puts(error, stdout, stderr) {
        sys.puts(stdout);
        frontendVersionBuildingInProgress = false;
    }
  var command = 'filename="../config/frontend_version.yml";' +
                'rm -f ../config/frontend_version.yml;' +
                'printf \'version: "\'>> $filename \r;' +
                //'res=$(git describe --always --tag);' +
                'res=$(date +%s);' +
                'printf $res >> $filename \r;' +
                'printf \'"\' >> $filename \r;';
  exec(command, puts);
});

gulp.task('styles', function() {
  return gulp.src('styles/global.less')
    //.pipe(sourcemaps.init())
    .pipe(less())
    .on('error', function(err) {
      handleError('LESS error', err);
    })
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    //.pipe(cssmin())
    .pipe(size())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest("../public/styles"));
});

gulp.task('styles-admin', function() {
    return gulp.src('styles/admin.less')
        //.pipe(sourcemaps.init())
        .pipe(less())
        .on('error', function(err) {
            handleError('LESS ADMIN error', err);
        })
        .pipe(prefix("last 1 version", "> 1%", "ie 8"))
        //.pipe(cssmin())
        .pipe(size())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("../public/styles"));
});

gulp.task('watch', ['version'], function() {
  /*gulp.watch(paths.vendor, ['vendor', 'version']);
  gulp.watch(paths.modules, ['modules', 'version']);*/
  gulp.watch(paths.styles, ['styles', 'styles-admin', 'version']);
});

gulp.task('watch-local', ['version'], function() {
  gulp.watch(paths.vendor, ['vendor-local', 'version']);
  gulp.watch(paths.modules, ['modules-local', 'version']);
  gulp.watch(paths.styles, ['styles', 'version']);
});

gulp.task('vendor', function() {
  return gulp.src(paths.vendor)
    .pipe(sourcemaps.init())
    .pipe(concat('core.js'))
    //.pipe(uglify())
    .pipe(size())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('../public/javascript'));
});

gulp.task('vendor-local', function() {
  return gulp.src(paths.vendor)
    .pipe(concat('core.js'))
    .pipe(size())
    .pipe(gulp.dest('../public/javascript'));
});

gulp.task('modules', function() {
  return gulp.src(paths.modules)
    .pipe(sourcemaps.init())
    .pipe(concat('modules.js'))
    .pipe(uglify())
    .on('error', function(err) {
      handleError('Uglify error', err);
    })
    .pipe(size())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('../public/javascript'));
});

gulp.task('modules-local', function() {
  return gulp.src(paths.modules)
    .pipe(concat('modules.js'))
    .pipe(size())
    .pipe(gulp.dest('../public/javascript'));
});

gulp.task('default', ['watch', 'styles', 'styles-admin']);
gulp.task('local', ['watch-local', 'styles', 'vendor-local', 'modules-local']);
