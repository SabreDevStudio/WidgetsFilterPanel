module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: [
        'dist/**/*',
        'build/**/*',
        'tmp/**/*'
      ]
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: ['app/src/**/*.js']
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'app/styles',
          cssDir: 'tmp/styles',
          imagesDir: 'img',
          javascriptsDir: 'app',
          sourcemap: true
        }
      }
    },

    cssmin: {
      options: {
        roundingPrecision: -1
      },
      cssbundle: {
        files: {
          'dist/css/WidgetsFilterPanel.min.css': [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'tmp/styles/**/*.css'
          ]
        }
      }
    },

    watch: {
      compass: {
        files: ['widgets/style/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false
        }
      }
    },

    copy: {
      bootstrap_glyphicons_fonts: {
        expand: true,
        cwd: 'bower_components/bootstrap/',
        src: ['fonts/*'],
        dest: 'dist/',
        options: {
          nonull: true
        }
      }
    },

    ngtemplates: {
      'WidgetsFilterPanel.templates': {
        cwd: 'tmp',
        src: '../app/src/**/*.tpl.html',
        dest: 'tmp/ngtemplates/templates.mod.js',
        options: {
          bootstrap:  function(module, templateCacheChargingScript) {
            return 'define(["angular"], function(angular) { ' +
                'angular.module("' + module + '", []).run(["$templateCache", function($templateCache) {' +
                templateCacheChargingScript + ' ' +
                '}]);' +
                '});';
          }
          , htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 true,
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true,
            keepClosingSlash:               true
          }
        }
      }
    },

    requirejs: {
      'compile': {
        options: (function () {
          var config = grunt.file.readJSON('r.compiler.options.json');
          // WARN: it cannot be just config.paths.angular="empty:", like in case of plain r optimiser.
          // See: https://github.com/requirejs/almond/issues/12:
          // jrburke: this is tricky because jquery loads before the define API exists in the page. What you could do is create a special adapter module that you use for 'jquery' in the paths config for the build (instead of the 'empty:') that looks like this:
          config.paths.angular="global.Angular.AMD.adapter";
          return config;
        })()
      },
      'compile-no-uglify': {
        options: (function () {
          var config = grunt.file.readJSON('r.compiler.options.json');
          config.optimize = "none";
          // WARN: it cannot be just config.paths.angular="empty:", like in case of plain r optimiser.
          // See: https://github.com/requirejs/almond/issues/12:
          // jrburke: this is tricky because jquery loads before the define API exists in the page. What you could do is create a special adapter module that you use for 'jquery' in the paths config for the build (instead of the 'empty:') that looks like this:
          config.paths.angular="global.Angular.AMD.adapter";
          config.out = "dist/WidgetsFilterPanel.js";
          return config;
        })()
      }
    }

  });

  grunt.registerTask('dist', [
    'clean:dist',
    'sources-pipeline',
    'static-resources',
    'requirejs:compile',
    'css-pipeline'
  ]);

  grunt.registerTask('dist-no-uglify', [
    'clean:dist',
    'sources-pipeline',
    'static-resources',
    'requirejs:compile-no-uglify',
    'css-pipeline'
  ]);

  grunt.registerTask('dist-all', [
    'clean:dist',
    'sources-pipeline',
    'static-resources',
    'requirejs:compile',
    'requirejs:compile-no-uglify',
    'css-pipeline'
  ]);

  grunt.registerTask('sources-pipeline', ['jshint', 'ngtemplates']);

  grunt.registerTask('css-pipeline', ['compass', 'cssmin:cssbundle']);

  grunt.registerTask('static-resources', ['copy:bootstrap_glyphicons_fonts']);

  grunt.registerTask('default', 'dist-all');

};