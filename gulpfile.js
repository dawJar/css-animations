var   gulp                = require('gulp'),
      gulpLoadPlugins     = require('gulp-load-plugins'),
      sass                = require('gulp-sass'),
      rename              = require('gulp-rename')
      notify              = require('gulp-notify'),
      imagemin            = require('gulp-imagemin'),
      cleanCSS            = require('gulp-clean-css'),
      autoprefixer        = require('gulp-autoprefixer'),
      minifyCSS           = require('gulp-minify-css'),
      concat              = require('gulp-concat'),
      uglify              = require('gulp-uglify'),
      changed             = require('gulp-changed'),
      clean               = require('gulp-clean'),
      babel               = require('gulp-babel'),
      bower               = require('gulp-bower'),
      plumber             = require('gulp-plumber'),
      filter              = require('gulp-filter'),
      merge               = require('merge-stream'),
      mainBowerFiles      = require('main-bower-files'),
      browserSync         = require('browser-sync').create();

var   plugins             = require("gulp-load-plugins")({
                                pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
                                replaceString: /\bgulp[\-.]/
                            });

var   dist                = 'dist/',
      distJsFile          = 'main.js',
      distCssFile         = 'styles.css',
      distImg             = dist + 'images',
      src                 = 'src/',
      htmlFiles           = src + '**/*.html',
      jsFiles             = src + 'js/*',
      cssFiles            = src + 'styles/*',
      sassFiles           = src + 'styles/*.scss',
      imgFiles            = src + 'images/*',
      suffix              = { suffix: '.min' },
      reloadStream        = { stream: true },
      prefixData          = { browsers: ['last 2 versions'], cascade: false }
      babelPreset         = require('./.babelrc');


// js scripts
gulp.task('js', function () {
   gulp.src(plugins.mainBowerFiles().concat(jsFiles))
      .pipe(plugins.plumber())
      .pipe(plugins.babel(babelPreset))
      .pipe(plugins.concat(distJsFile))
      .pipe(plugins.rename(suffix))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(dist + 'js/'))
      .pipe(notify({ message: 'JS task complete' }))
      .pipe(browserSync.reload(reloadStream));
});

// styles
gulp.task('styles', function () {

   var sassStream = gulp.src(sassFiles)
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('sass-styles.css'));

  var cssStream = gulp.src(plugins.mainBowerFiles().concat(cssFiles))
      .pipe(plugins.filter('*.css'))
      .pipe(plugins.concat('css-styles.css'));

  var mergeStream = merge(sassStream, cssStream)
      .pipe(autoprefixer(prefixData))
      .pipe(concat(distCssFile))
      .pipe(rename(suffix))
      .pipe(minifyCSS())
      .pipe(gulp.dest(dist + 'css/'))
      .pipe(notify({ message: 'Styles task complete' }))
      .pipe(browserSync.reload(reloadStream));

});

// images
gulp.task('imagemin', function () {
   var imgSrc = src + 'images/**/*.+(png|jpg|gif)';

   gulp.src(imgFiles)
      .pipe(changed(distImg))
      .pipe(imagemin())
      .pipe(gulp.dest(distImg))
      .pipe(notify({ message: 'Imagemin task complete' }))
      .pipe(browserSync.reload(reloadStream));

});

// html
gulp.task('html', function () {
  gulp.src(htmlFiles)
      .pipe(gulp.dest(dist))
      .pipe(notify({ message: 'Html task complete' }))
      .pipe(browserSync.reload(reloadStream));
});

// clean
gulp.task('clean', function() {
  return gulp.src([dist + 'css', dist + 'js', dist + 'images'], { read: false })
    .pipe(clean());
});

// default
gulp.task('default', [
            'browserSync',
            'clean',
            'html',
            'styles',
            'imagemin',
            'js'], function () {

   gulp.watch(cssFiles, ['styles']);

   gulp.watch(jsFiles, ['js']);

   gulp.watch(htmlFiles, ['html']);

   gulp.watch(imgFiles, ['imagemin']);
});

gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: dist
      },
   })
});
