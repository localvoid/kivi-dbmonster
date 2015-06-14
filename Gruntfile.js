module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build'],
    connect: {
      server: {
        options: {
          base: ['build/', 'web/', './'],
          port: 3000
        }
      }
    },
    watch: {
      html: {
        files: '*.html'
      },
      css: {
        files: '*.css'
      },
      js: {
        files: 'web/**/*.js',
        tasks: ['closurecompiler:dev']
      }
    },
    closurecompiler: {
      dist: {
        files: {
          "build/main.js": ['web/**/*.js', 'node_modules/kivi/src/**/*.js']
        },
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          warning_level: 'VERBOSE',
          jscomp_warning: 'reportUnknownTypes',
          summary_detail_level: 3,
          language_in: 'ECMASCRIPT5_STRICT',
          output_wrapper: '(function(){%output%}).call();',
          use_types_for_optimization: true,
          only_closure_dependencies: true,
          closure_entry_point: 'app'
        }
      },
      dev: {
        files: {
          "build/main.js": ['web/**/*.js', 'node_modules/kivi/src/**/*.js']
        },
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          warning_level: 'VERBOSE',
          jscomp_warning: 'reportUnknownTypes',
          summary_detail_level: 3,
          language_in: 'ECMASCRIPT5_STRICT',
          output_wrapper: '(function(){%output%}).call();\n//# sourceMappingURL=/main.js.map',
          use_types_for_optimization: true,
          only_closure_dependencies: true,
          closure_entry_point: 'app',
          create_source_map: 'build/main.js.map'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-closurecompiler');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('scripts', ['closurecompiler:dist']);
  grunt.registerTask('default', ['scripts']);
  grunt.registerTask('serve', ['closurecompiler:dev', 'connect', 'watch']);
};
