const gulp = require('gulp');
const typescript = require('typescript');
const ts = require('gulp-typescript');
const tslint = require("gulp-tslint");
const rollup = require('rollup');
const rollupReplace = require('rollup-plugin-replace');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const closureCompiler = require('google-closure-compiler').gulp();

const ClosureConfig = {
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

function clean() {
  const del = require('del');
  return del(['build', 'dist']);
}

function compileTS() {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: "verbose",
    }))
    .pipe(ts(Object.assign(require('./tsconfig.json').compilerOptions, {
      typescript: require('typescript'),
    })))
    .pipe(gulp.dest('build/es6'));
}

function bundleMain(done) {
  return rollup.rollup({
    format: 'es6',
    entry: 'build/es6/main.js',
    plugins: [
      rollupReplace({
        delimiters: ['<@', '@>'],
        values: {
          KIVI_DEBUG: 'DEBUG_DISABLED',
        },
      }),
      rollupNodeResolve({jsnext: true}),
    ]
  }).then(function(bundle) {
    return bundle.write({
      format: 'es',
      dest: 'build/bundle.es6.js',
      intro: 'goog.module("main");',
      sourceMap: 'inline',
    });
  });
}

function bundleIncremental(done) {
  return rollup.rollup({
    format: 'es6',
    entry: 'build/es6/incremental.js',
    plugins: [
      rollupReplace({
        delimiters: ['<@', '@>'],
        values: {
          KIVI_DEBUG: 'DEBUG_DISABLED',
        },
      }),
      rollupNodeResolve({jsnext: true}),
    ]
  }).then(function(bundle) {
    return bundle.write({
      format: 'es',
      dest: 'build/bundle_incremental.es6.js',
      intro: 'goog.module("main");',
      sourceMap: 'inline',
    });
  });
}

function bundle10k(done) {
  return rollup.rollup({
    format: 'es6',
    entry: 'build/es6/10k.js',
    plugins: [
      require('rollup-plugin-replace')({
        delimiters: ['<@', '@>'],
        values: {
          KIVI_DEBUG: 'DEBUG_DISABLED',
        },
      }),
      require('rollup-plugin-node-resolve')({jsnext: true}),
    ]
  }).then(function(bundle) {
    return bundle.write({
      format: 'es',
      dest: 'build/bundle_10k.es6.js',
      intro: 'goog.module("main");',
      sourceMap: 'inline',
    });
  });
}

function compileMain() {
  return gulp.src(['build/bundle.es6.js'])
      .pipe(closureCompiler(Object.assign({}, ClosureConfig, {
        js_output_file: 'bundle.js',
      })))
      .pipe(gulp.dest('dist'));
}

function compileIncremental() {
  return gulp.src(['build/bundle_incremental.es6.js'])
      .pipe(closureCompiler(Object.assign({}, ClosureConfig, {
        js_output_file: 'bundle_incremental.js',
      })))
      .pipe(gulp.dest('dist'));
}

function compile10k() {
  return gulp.src(['build/bundle_10k.es6.js'])
      .pipe(closureCompiler(Object.assign({}, ClosureConfig, {
        js_output_file: 'bundle_10k.js',
      })))
      .pipe(gulp.dest('dist'));
}

function html() {
  return gulp.src(['./src/*.html'])
    .pipe(gulp.dest('dist'));
}

function deploy() {
  const ghPages = require('gulp-gh-pages');

  return gulp.src('dist/**/*')
    .pipe(ghPages());
}

const build = gulp.series(
  clean,
  html,
  compileTS,
  bundleMain,
  bundleIncremental,
  bundle10k,
  compileMain,
  compileIncremental,
  compile10k);

exports.build = build;
exports.build10k = gulp.series(compileTS, bundle10k, compile10k);
exports.deploy = deploy;