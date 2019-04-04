    'use strict';

    const gulp = require('gulp'),
      watch = require('gulp-watch'),
      sass = require('gulp-sass'),
      babel = require('gulp-babel'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      surge = require('gulp-surge'),
      // rigger = require('rigger'),
      sourcemaps = require('gulp-sourcemaps'),
      cssnano = require('cssnano'),
      concat = require('gulp-concat'),
      rimraf = require('rimraf'),
      browserSync = require('browser-sync'),
      preprocess = require('gulp-preprocess'),
      reload = browserSync.reload;



    const path ={
      build:{ // куда складывать готовый проект
        html: 'todo-list/', // путь к проекту
        js: 'todo-list/js/', // путь к скриптам
        css: 'todo-list/style/', // путь к стилям
        img: 'todo-list/img/' // путь к картинкам
      },

      src:{ // где лежит проект
        html: 'src/*.html', // файлы страниц
        js: 'src/js/*.js', // скрипты
        css: 'src/style/main.*', // файл стилей, в котором мы подключаем все наши компоненты
        img: 'src/img/**/*.*' // путь к картинкам
      },

      watch:{ // за какими изменениями будем следить
        html: 'src/**/*.html',
        js: 'src/js/*.js',
        css: 'src/**/*.scss',
        img: 'src/img/**/*.*'
      },
      clean: './todo-list' // очистка папки с проектом
    };
    var config = {
      server: {
        baseDir: './todo-list' // папка c готовым проектом (для запуска локального сервера)
      },
      host: 'localhost',
      port: 9000,
      logPrefix: 'Frontend_Pavel'
    };


    gulp.task('html:build', function (callback){
      gulp
        .src(path.src.html)
        .pipe(preprocess()) // склейка шаблонов
        .pipe(gulp.dest(path.build.html)) // переписываем в папку build
        .pipe(reload({
          stream: true
        })); // перезагружаем сервер
      callback();
    });

    gulp.task('server:deploy', [], function (){
      return surge({
        project: './todo-list', // Path to your static build directory
        domain: 'tremendous-carriage.surge.sh' // Your domain or Surge subdomain
      });
    });


    gulp.task('js:build', function (callback){
      gulp
        .src(['src/js/todoModal.js','src/js/todoView.js','src/js/todoController.js', 'src/js/appInit.js'])
        .pipe(babel({
          presets: ['@babel/preset-env']
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        // .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
          stream: true
        }));
      callback();
    });

    gulp.task('css:build', function (callback){
      gulp
        .src(path.src.css)
        .pipe(sass().on('error', sass.logError)) // перегнали scss -> css
        .pipe(postcss([
          autoprefixer({
            browsers: ['last 2 versions']
          }),
          cssnano() // сжатие css
        ]))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({
          stream: true
        }));
      callback();
    });

    gulp.task('image:build', function (callback){
      gulp
        .src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({
          stream: true
        }));
      callback();
    });

    // gulp.task('fonts:build', function (callback){
    //   gulp.src(path.src.fonts)
    //     .pipe(gulp.dest(path.build.fonts));
    //   callback();
    // });

    // gulp.task('audio:build', function (callback){
    //   gulp.src(path.src.audio)
    //     .pipe(gulp.dest(path.build.audio));
    //   callback();
    // });

    gulp.task('build', [ // список тасков для команды build
      'html:build',
      'js:build',
      'css:build',
      'image:build',
      // 'server:deploy'
    ]);

    gulp.task('watch', function (callback){
      watch([path.watch.html], function (event, cb){
        gulp.start('html:build');
      });
      watch([path.watch.css], function (event, cb){
        gulp.start('css:build');
      });
      watch([path.watch.js], function (event, cb){
        gulp.start('js:build');
      });

      watch([path.watch.img], function (event, cb){
        gulp.start('image:build');
      });
      callback();
    });

    gulp.task('webserver', function (callback){
      browserSync(config);
      callback();
    });

    gulp.task('clean', function (cb){
      rimraf(path.clean, cb);
    });

    gulp.task('default', ['build', 'webserver', 'watch']);