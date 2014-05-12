module.exports = function (grunt) {

  'use strict';

  var gruntConfig = {};

  var pkg = 'package.json';

  var mod, counter, modNameNoPrefix;

  gruntConfig.pkg = grunt.file.readJSON(pkg);

  gruntConfig.open = {
    options:{
      delay: 5 // seconds
    },
    dev: {
      path: 'http://localhost:3000/',
      app: 'Google Chrome'
    }
  };

  gruntConfig.bower = {
    install: {
      options: {
        targetDir: "app/assets/core/vendor"
      }
    }
  };

  gruntConfig.meta = {
    views: 'app/views/',
    assets: 'app/assets/core',
    build: 'public',
    banner: '/*!\n' + ' * <%= pkg.title %> v<%= pkg.version %>\n' + ' * Generated on <%= grunt.template.today() %>\n' + ' * <%= pkg.author.name %>\n' + ' */\n\n'
  };

  gruntConfig.modules = (function () {
    var modules = grunt.file.expand({}, [gruntConfig.meta.views + 'app-*']);
    return grunt.util._.map(modules, function (n) {
      return n.split(gruntConfig.meta.views).join('');
    });
  })();

  gruntConfig.totalModules = gruntConfig.modules.length;

  gruntConfig.bumpup = {
    files: ['package.json', 'bower.json']
  };

  gruntConfig.changelog = {
    options: {
      repository: gruntConfig.pkg.repository.url,
      version: grunt.file.readJSON(pkg).version,
      dest: 'CHANGELOG.md',
      bump: false
    }
  };

  gruntConfig.tagrelease = {
    file: pkg,
    commit: true,
    message: 'Release %version%',
    prefix: 'v',
    annotate: true
  };

  gruntConfig.jade = {
    build: {
      options: {
        pretty: true,
        data: {
          appcache: null,
          title: '<%= pkg.title %>',
          i18n: grunt.file.readJSON('app/config/locales/' + gruntConfig.pkg.preferredLanguage + '.json')
        }
      },
      files: [{
        expand: true,
        src: ["*.jade"],
        ext: ".html",
        cwd: "<%= meta.views %>/core/",
        dest: "<%= meta.build %>/"
      }, {
        expand: true,
        src: ["app-*/*.jade"],
        ext: ".html",
        cwd: "<%= meta.views %>/",
        dest: "<%= meta.build %>/partials/"
      }]
    }
  };

  gruntConfig.less = {
    build: {
      files: {
        // --------
        // CORE CSS
        // --------
        '<%= meta.build %>/stylesheets/app.css': '<%= meta.assets %>/stylesheets/app.less'
      }
    }
  };

  // -----------
  // MODULES CSS
  // -----------
  for (counter = 0; counter < gruntConfig.totalModules; counter += 1) {
    mod = gruntConfig.modules[counter];
    gruntConfig.less.build.files['<%= meta.build %>/stylesheets/' + mod + '.css'] = 'app/assets/' + mod + '/stylesheets/app.less';
  }

  gruntConfig.jshint = {
    options: {
      jshintrc: '.jshintrc'
    },
    files: ['.jshintrc', '.bowerrc', 'bower.json', 'package.json', 'Gruntfile.js', 'app/server.js', 'app/i18n/*.js', 'app/assets/**/javascripts/**/*.js']
  };

  gruntConfig.concat = {
    modernizr: {
      src: ['<%= meta.assets %>/vendor/modernizr/modernizr.js'],
      dest: '<%= meta.build %>/javascripts/libs/modernizr.js'
    },
    vendor: {
      src: [
        // ------
        // JQUERY
        // ------
        '<%= meta.assets %>/vendor/jquery/jquery.js',
        // -----------
        // BOOTSTRAP 3
        // -----------
        '<%= meta.assets %>/vendor/bootstrap/js/transition.js',
        '<%= meta.assets %>/vendor/soundmanager/script/soundmanager2-jsmin.js'
      ],
      dest: '<%= meta.build %>/javascripts/libs/vendor.js'
    },
    app: {
      options: {
        banner: '<%= meta.banner %>'
      },
      src: ['<%= meta.assets %>/javascripts/app.js'],
      dest: '<%= meta.build %>/javascripts/app.js'
    },
    core: {
      options: {
        banner: '<%= meta.banner %>'
      },
      src: [
        // ---------------------
        // YOUR JAVASCRIPT FILES
        // ---------------------
        '<%= meta.assets %>/javascripts/load-image.js',
        '<%= meta.assets %>/javascripts/check-environment.js',
        '<%= meta.assets %>/javascripts/cookie.js',
        '<%= meta.assets %>/javascripts/video.js',
        '<%= meta.assets %>/javascripts/audio.js',
        '<%= meta.assets %>/javascripts/tab.js',
        '<%= meta.assets %>/javascripts/scroll.js',
        '<%= meta.assets %>/javascripts/add-preferences.js',
        '<%= meta.assets %>/javascripts/animate-page.js'
      ],
      dest: '<%= meta.build %>/javascripts/core.js'
    }
  };

  for (counter = 0; counter < gruntConfig.totalModules; counter += 1) {
    mod = gruntConfig.modules[counter];
    modNameNoPrefix = mod.split('app-')[1].replace(/-/g, '_');
    gruntConfig.concat[modNameNoPrefix] = {
      src: ['app/assets/' + mod + '/javascripts/*.js'],
      dest: '<%= meta.build %>/javascripts/' + mod + '.js'
    };
  }

  gruntConfig.uglify = {
    options: {
      report: 'gzip'
    },
    modernizr: {
      files: {
        '<%= meta.build %>/javascripts/libs/modernizr.min.js': ['<%= concat.modernizr.dest %>']
      }
    },
    vendor: {
      files: {
        '<%= meta.build %>/javascripts/libs/vendor.min.js': ['<%= concat.vendor.dest %>']
      }
    },
    core: {
      files: {
        '<%= meta.build %>/javascripts/core.min.js': ['<%= concat.core.dest %>']
      }
    }
  };

  // ----------
  // MODULES JS
  // ----------
  for (counter = 0; counter < gruntConfig.totalModules; counter += 1) {
    mod = gruntConfig.modules[counter];
    modNameNoPrefix = mod.split('app-')[1].replace(/-/g, '_');
    gruntConfig.uglify[modNameNoPrefix] = {
      options: {
        report: 'min'
      },
      files: {}
    };
    gruntConfig.uglify[modNameNoPrefix].files['<%= meta.build %>/javascripts/' + mod + '.min.js'] = '<%= concat.' + modNameNoPrefix + '.dest %>';
  }

  gruntConfig.copy = {
    icons: {
      files: [{
        src: ["favicon.png"],
        expand: true,
        cwd: "<%= meta.assets %>/ico/",
        dest: "<%= meta.build %>"
      }]
    },
    humans: {
      files: [{
        src: ["*.txt"],
        expand: true,
        cwd: "<%= meta.assets %>/humans/",
        dest: "<%= meta.build %>"
      }]
    },
    robots: {
      files: [{
        src: ["*.txt"],
        expand: true,
        cwd: "<%= meta.assets %>/robots/",
        dest: "<%= meta.build %>"
      }]
    },
    fonts: {
      files: [{
        src: ["**/*"],
        expand: true,
        cwd: "<%= meta.assets %>/fonts/",
        dest: "<%= meta.build %>/fonts/"
      }]
    },
    flash: {
      files: [{
        src: ["**/*"],
        expand: true,
        cwd: "<%= meta.assets %>/flash/",
        dest: "<%= meta.build %>/flash/"
      }]
    },
    videos: {
      files: [{
        src: ["**/*"],
        expand: true,
        cwd: "<%= meta.assets %>/videos/",
        dest: "<%= meta.build %>/videos/"
      }]
    },
    audios: {
      files: [{
        src: ["**/*"],
        expand: true,
        cwd: "<%= meta.assets %>/audios/",
        dest: "<%= meta.build %>/audios/"
      }]
    },
    images: {
      files: [{
        src: ["**/*"],
        expand: true,
        cwd: "<%= meta.assets %>/images/",
        dest: "<%= meta.build %>/images/app/"
      }]
    },
    css3pie: {
      files: [{
        src: ["PIE.php", "PIE.htc"],
        expand: true,
        cwd: "<%= meta.assets %>/vendor/css3pie",
        dest: "<%= meta.build %>/"
      }]
    },
    soundmanager: {
      files: [{
        src: ["*.swf"],
        expand: true,
        cwd: "<%= meta.assets %>/vendor/soundmanager/swf",
        dest: "<%= meta.build %>/flash/"
      }]
    }
  };

  gruntConfig.watch = {
    core: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat']
    },
    vendor: {
      files: ['<%= concat.vendor.src %>'],
      tasks: ['concat']
    },
    jade: {
      files: ['app/views/**/*.jade'],
      tasks: ['jade']
    },
    less: {
      files: ['app/assets/**/stylesheets/**/*.less'],
      tasks: ['less:build']
    },
    images: {
      files: ['app/assets/**/images/**/*'],
      tasks: ['copy:images']
    },
    icons: {
      files: ['<%= meta.assets %>/icons/**/*'],
      tasks: ['copy:icons']
    },
    humans: {
      files: ['<%= meta.assets %>/humans/**/*'],
      tasks: ['copy:humans']
    },
    robots: {
      files: ['<%= meta.assets %>/robots/**/*'],
      tasks: ['copy:robots']
    },
    fonts: {
      files: ['<%= meta.assets %>/fonts/**/*'],
      tasks: ['copy:fonts']
    },
    videos: {
      files: ['<%= meta.assets %>/videos/**/*'],
      tasks: ['copy:videos']
    },
    audios: {
      files: ['<%= meta.assets %>/audios/**/*'],
      tasks: ['copy:audios']
    },
    flash: {
      files: ['<%= meta.assets %>/flash/**/*'],
      tasks: ['copy:flash']
    }
  };

  gruntConfig.usemin = {
    html: '<%= meta.build %>/*.html',
    options: {
      patterns: {
        html: [
          [
            /<script.+src=['"]([^"']+)["']/gm,
            'Update the HTML with the new javascript filenames'
          ],
          [
            /<link[^\>]+href=['"]([^"']+)["']/gm,
            'Update the HTML with the new css filenames'
          ]
        ]
      }
    }
  };

  gruntConfig.cssmin = {
    compress: {
      expand: true,
      cwd: '<%= meta.build %>/stylesheets/',
      dest: '<%= meta.build %>/stylesheets/',
      src: ['*.css', '!*.min.css'],
      ext: '.min.css',
      options: {
        keepSpecialComments: 0
      }
    }
  };

  gruntConfig.imagemin = {
    jpg: {
      options: {
        progressive: true
      },
      files: [{
        expand: true,
        src: ["**/*.jpg"],
        ext: ".jpg",
        cwd: "<%= meta.build %>/images/",
        dest: "<%= meta.build %>/images/"
      }]
    },
    png: {
      options: {
        optimizationLevel: 2,
        pngquant: true
      },
      files: [{
        expand: true,
        src: ["**/*.png"],
        ext: ".png",
        cwd: "<%= meta.build %>/images/",
        dest: "<%= meta.build %>/images/"
      }]
    },
    gif: {
      files: [{
        expand: true,
        src: ["**/*.gif"],
        ext: ".gif",
        cwd: "<%= meta.build %>/images/",
        dest: "<%= meta.build %>/images/"
      }]
    }
  };

  gruntConfig.shell = {
    options: {
      stdout: true
    },
    start: {
      command: 'node app/server.js'
    },
    prepare: {
      command: [
        'mkdir <%= meta.build %>',
        'cd <%= meta.build %>',
        'git init',
        'git remote add origin <%= pkg.repository.url %>',
        'git checkout -b gh-pages',
        'git pull origin gh-pages',
        'rm -rf ./*'
      ].join(' && ')
    },
    deploy: {
      command: [
        "HASH=`git log --pretty=format:'%h - %s' -n 1`",
        'cd <%= meta.build %>',
        'git add -A .',
        'git commit -m "Deploy from $HASH"',
        'git push --force origin gh-pages'
      ].join(' && ')
    },
    pushtags: {
      command: function () {
        // once again parse package.json
        // after it's version has been bumped
        var v = grunt.file.readJSON(pkg).version;
        // Commands queue
        var cmds = [];
        // git push release commit
        cmds.push('git push origin master');
        // git push actual tag
        cmds.push('git push origin v' + v);
        // return commands
        return cmds.join(' && ');
      }
    }
  };

  gruntConfig.clean = {
    options: {
      force: true
    },
    build: {
      src: ['<%= meta.build %>']
    }
  };

  gruntConfig.notify = {
    options: {
      title: '<%= pkg.title %>'
    },
    build: {
      options: {
        message: 'Build Complete'
      }
    },
    deploy: {
      options: {
        message: 'Deploy Complete'
      }
    },
    optimized: {
      options: {
        message: 'Optimized Build Complete'
      }
    }
  };

  gruntConfig.nodemon = {
    server: {
      script: 'app/server.js',
      options: {
        ignore: ['README.md', 'node_modules/**', 'assets/**'],
        watch: ['app/*.js', 'app/*.json']
      }
    }
  };

  gruntConfig.concurrent = {
    start: {
      tasks: ['nodemon', 'watch', 'open'],
      options: {
        logConcurrentOutput: true
      }
    }
  };

  gruntConfig['gh-pages'] = {
    options: {
      base: 'public',
      repo: gruntConfig.pkg.repository.url
    },
    src: ['**']
  };

  grunt.initConfig(gruntConfig);

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('release', function (type) {
    if (!type) {
      throw new Error('Grunt release task needs a type (patch, minor, major)');
    }
    var read = require('deferred').promisify(require('read'));
    var done = this.async();
    grunt.log.writeln('Current version is "' + gruntConfig.pkg.version + '"');
    read({
      prompt: 'Confirm "' + type + '" version bump ? (y/n)'
    }).then(function (a) {
      if (a[0].toLowerCase() === 'y') {
        grunt.task.run(['bumpup:' + type, 'changelog', 'tagrelease', 'shell:pushtags']);
      } else {
        grunt.log.warn('Cancelled..');
      }
      done();
    });
  });

  grunt.registerTask('deploy', ['optimize:true', 'gh-pages', 'notify:deploy']);



  grunt.registerTask('optimize', function (prepare) {
    var tasks = [];
    tasks.push('build:' + prepare);
    tasks.push('usemin', 'cssmin', 'imagemin', 'uglify');
    tasks.push('notify:optimized');
    grunt.task.run(tasks);
  });

  grunt.registerTask('build', function (prepare) {
    var tasks = [];
    tasks.push('bower', 'jshint', 'clean:build');
    if (prepare) {
      tasks.push('shell:prepare');
    }
    tasks.push('concat', 'less', 'copy', 'jade');
    tasks.push('notify:build');
    grunt.task.run(tasks);
  });

  grunt.registerTask('start', ['build', 'server']);

  grunt.registerTask('server', ['concurrent:start']);

  grunt.registerTask('default', ['build']);

};
