const gulp          = require('gulp'),
      notify        = require('gulp-notify'),
      imagemin      = require('gulp-imagemin'),
      sass          = require('gulp-sass');
      cleanCSS      = require('gulp-clean-css'),
      autoprefixer  = require('gulp-autoprefixer'),
      minifyCSS     = require('gulp-minify-css'),
      rename        = require('gulp-rename')
      concat        = require('gulp-concat'),
      uglify        = require('gulp-uglify'),
      changed       = require('gulp-changed'),
      clean         = require('gulp-clean'),
      babel         = require('gulp-babel'),
      browserSync   = require('browser-sync').create();


// scripts
gulp.task('js', function () {
   gulp.src('./src/js/**/*.js')
      .pipe(babel({
          presets: ['es2015']
       }))
      .pipe(concat('script.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js/'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(notify({ message: 'JS task complete' }))
      .pipe(browserSync.reload({
         stream: true
      }));
});

// styles
gulp.task('styles', function () {
   gulp.src('./src/styles/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
      }))
      .pipe(concat('styles.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('./dist/css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(notify({ message: 'Styles task complete' }))
      .pipe(browserSync.reload({
         stream: true
      }));
});

// images
gulp.task('imagemin', function () {
   var imgSrc = './src/images/**/*.+(png|jpg|gif)',
   imgDst = './dist/images';

   gulp.src('./src/images/*')
      .pipe(changed(imgDst))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDst))
      .pipe(notify({ message: 'Imagemin task complete' }))
      .pipe(browserSync.reload({
         stream: true
      }));

});

// html
gulp.task('html', function () {
  gulp.src('./src/**/*.html')
      .pipe(gulp.dest('./dist/'))
      .pipe(notify({ message: 'Html task complete' }))
      .pipe(browserSync.reload({
           stream: true
      }));
});

// clean
gulp.task('clean', function() {
  return gulp.src(['./dist/styles', './dist/scripts', './dist/images'], {read: false})
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

   gulp.watch('./src/js/**/*', ['js']);

   gulp.watch('./src/styles/**/*.scss', ['styles']);

   gulp.watch('./src/images/**/*', ['imagemin']);

  //  gulp.watch('./src/*.html').on('change', browserSync.reload);
   gulp.watch('./src/*.html', ['html']);

});

gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: './dist'
      },
   })
});
