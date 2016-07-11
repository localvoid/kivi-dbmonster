'use strict';

var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var tslint = require("gulp-tslint");
var rollup = require('rollup');
var closureCompiler = require('google-closure-compiler').gulp();
var ghPages = require('gulp-gh-pages');

var CLOSURE_OPTS = {
  compilation_level: 'ADVANCED',
  entry_point: 'goog:main',
  dependency_mode: 'STRICT',
  language_in: 'ECMASCRIPT6_STRICT',
  language_out: 'ECMASCRIPT5_STRICT',
  use_types_for_optimization: true,
  assume_function_wrapper: true,
  output_wrapper: '(function(){%output%}).call();',
  summary_detail_level: 3,
  warning_level: 'QUIET',
};

gulp.task('clean', del.bind(null, ['build', 'dist']));

gulp.task('ts', function() {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
    .pipe(ts(Object.assign(require('./tsconfig.json').compilerOptions, {
      typescript: require('typescript'),
    })))
    .pipe(gulp.dest('build/es6'));
});

gulp.task('js:bundle', ['ts'], function(done) {
  return rollup.rollup({
    format: 'es6',
    entry: 'build/es6/main.js',
    plugins: [
      require('rollup-plugin-replace')({
        delimiters: ['<@', '@>'],
        values: {
          KIVI_DEBUG: 'DEBUG_DISABLED'
        }
      }),
      require('rollup-plugin-node-resolve')({
        jsnext: true,
      })
    ]
  }).then(function(bundle) {
    return bundle.write({
      format: 'es6',
      dest: 'build/bundle.es6.js',
      intro: 'goog.module("main");',
      sourceMap: 'inline',
    });
  });
});

gulp.task('js:bundle_incremental', ['ts'], function(done) {
  return rollup.rollup({
    format: 'es6',
    entry: 'build/es6/incremental.js',
    plugins: [
      require('rollup-plugin-replace')({
        delimiters: ['<@', '@>'],
        values: {
          KIVI_DEBUG: 'DEBUG_DISABLED'
        }
      }),
      require('rollup-plugin-node-resolve')({
        jsnext: true,
      })
    ]
  }).then(function(bundle) {
    return bundle.write({
      format: 'es6',
      dest: 'build/bundle_incremental.es6.js',
      intro: 'goog.module("main");',
      sourceMap: 'inline',
    });
  });
});

gulp.task('js:bundle_10k', ['ts'], function(done) {
  return rollup.rollup({
    format: 'es6',
    entry: 'build/es6/10k.js',
    plugins: [
      require('rollup-plugin-replace')({
        delimiters: ['<@', '@>'],
        values: {
          KIVI_DEBUG: 'DEBUG_DISABLED'
        }
      }),
      require('rollup-plugin-node-resolve')({
        jsnext: true,
      })
    ]
  }).then(function(bundle) {
    return bundle.write({
      format: 'es6',
      dest: 'build/bundle_10k.es6.js',
      intro: 'goog.module("main");',
      sourceMap: 'inline',
    });
  });
});

gulp.task('js:optimize', ['js:bundle'], function() {
  var opts = Object.create(CLOSURE_OPTS);
  opts['js_output_file'] = 'bundle.js';

  return gulp.src(['build/bundle.es6.js'])
      .pipe(closureCompiler(opts))
      .pipe(gulp.dest('dist'));
});

gulp.task('js:optimize_incremental', ['js:bundle_incremental'], function() {
  var opts = Object.create(CLOSURE_OPTS);
  opts['js_output_file'] = 'bundle_incremental.js';

  return gulp.src(['build/bundle_incremental.es6.js'])
      .pipe(closureCompiler(opts))
      .pipe(gulp.dest('dist'));
});

gulp.task('js:optimize_10k', ['js:bundle_10k'], function() {
  var opts = Object.create(CLOSURE_OPTS);
  opts['js_output_file'] = 'bundle_10k.js';

  return gulp.src(['build/bundle_10k.es6.js'])
      .pipe(closureCompiler(opts))
      .pipe(gulp.dest('dist'));
});

gulp.task('js', ['js:optimize', 'js:optimize_incremental', 'js:optimize_10k']);

gulp.task('statics', function() {
  gulp.src(['./src/*.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['default'], function () {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['statics', 'js']);