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
  rewrite_polyfills: false,
};

function clean() {
  const del = require('del');
  return del(['build', 'docs']);
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

function bundle10kSvg(done) {
  return rollup.rollup({
    format: 'es6',
    entry: 'build/es6/10k_svg.js',
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
      dest: 'build/bundle_10k_svg.es6.js',
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
      .pipe(gulp.dest('docs'));
}

function compile10k() {
  return gulp.src(['build/bundle_10k.es6.js'])
      .pipe(closureCompiler(Object.assign({}, ClosureConfig, {
        js_output_file: 'bundle_10k.js',
      })))
      .pipe(gulp.dest('docs'));
}

function compile10kSvg() {
  return gulp.src(['build/bundle_10k_svg.es6.js'])
      .pipe(closureCompiler(Object.assign({}, ClosureConfig, {
        js_output_file: 'bundle_10k_svg.js',
      })))
      .pipe(gulp.dest('docs'));
}

function html() {
  return gulp.src(['./src/*.html'])
    .pipe(gulp.dest('docs'));
}

function deploy() {
  const ghPages = require('gulp-gh-pages');

  return gulp.src('docs/**/*')
    .pipe(ghPages());
}

const build = gulp.series(
  clean,
  html,
  compileTS,
  bundleMain,
  bundle10k,
  bundle10kSvg,
  compileMain,
  compile10k,
  compile10kSvg);

exports.build = build;
exports.build10k = gulp.series(compileTS, bundle10k, compile10k);
exports.build10kSvg = gulp.series(compileTS, bundle10kSvg, compile10kSvg);
