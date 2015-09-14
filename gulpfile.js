'use strict';

var gulp = require('gulp');
var gulp_if = require('gulp-if');
var del = require('del');
var browserSync = require('browser-sync');
var closureCompiler = require('gulp-closure-compiler');
var ghPages = require('gulp-gh-pages');

var DEST = './build';
var CLOSURE_OPTS = {
  compilerPath: 'node_modules/closurecompiler/compiler/compiler.jar',
  continueWithWarnings: true,
  compilerFlags: {
    define: [
      'kivi.DEBUG=false'
    ],
    closure_entry_point: 'app',
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    language_in: 'ECMASCRIPT6_STRICT',
    language_out: 'ECMASCRIPT5_STRICT',
    use_types_for_optimization: true,
    only_closure_dependencies: true,
    output_wrapper: '(function(){%output%}).call();',
    warning_level: 'VERBOSE',
    jscomp_warning: ['*', 'reportUnknownTypes'],
    summary_detail_level: 3
  }
};

gulp.task('clean', del.bind(null, [DEST]));

gulp.task('js:original', function() {
  var opts = Object.create(CLOSURE_OPTS);
  opts.fileName = 'original.js';

  return gulp.src(['web/original.js', 'web/js/**/*.js', 'node_modules/kivi/src/**/*.js'])
      .pipe(closureCompiler(opts))
      .pipe(gulp.dest(DEST))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:new', function() {
  var opts = Object.create(CLOSURE_OPTS);
  opts.fileName = 'new.js';

  return gulp.src(['web/new.js', 'web/js/**/*.js', 'node_modules/kivi/src/**/*.js'])
    .pipe(closureCompiler(opts))
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', ['js:original', 'js:new']);

gulp.task('monitor-js', function() {
  gulp.src(['./web/memory-stats.js', './web/monitor.js'])
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
  gulp.src('./web/*.html')
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function() {
  gulp.src('./web/*.css')
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', ['default'], function() {
  browserSync({
    open: false,
    port: 3000,
    notify: false,
    server: 'build'
  });

  gulp.watch('./web/js/**/*.js', ['scripts']);
  gulp.watch('./web/**/*.html', ['html']);
  gulp.watch(['./web/memory-stats.js', './web/monitor.js'], ['monitor-js']);
  gulp.watch('./web/*.css', ['styles']);
});

gulp.task('deploy', ['default'], function () {
  return gulp.src(DEST + '/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['js', 'monitor-js', 'styles', 'html']);
