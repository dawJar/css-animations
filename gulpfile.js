var gulp                = require('gulp'),
    merge               = require('merge-stream'),
    babelPreset         = require('./.babelrc');
    browserSync         = require('browser-sync').create();
    plugins             = require("gulp-load-plugins")({
                            	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
                            	replaceString: /\bgulp[\-.]/
                          });

var src                = 'src/',
    dest               = 'dest/';


// js scripts
gulp.task('js', function () {

  var filterBowerForJsDependencies = plugins.filter('**/*.js', { restore: true });

	return gulp.src(plugins.mainBowerFiles().concat(src + 'js/*'))
                .pipe(filterBowerForJsDependencies)
            		.pipe(plugins.plumber())
                .pipe(plugins.babel(babelPreset))
                .pipe(plugins.uglify())
                .pipe(plugins.concat('main.js'))
                .pipe(plugins.rename({ suffix: '.min' }))
                .pipe(gulp.dest(dest + 'js'))
                .pipe(browserSync.reload({ stream: true }))
                .pipe(plugins.notify({ message: 'JS task complete' }));
});

// styles
gulp.task('styles', function () {

    var filterForLessDependencies = plugins.filter('**/*.less', { restore: true });
    var filterForSassDependencies = plugins.filter('**/*.scss', { restore: true });
    var filterForCssDependencies = plugins.filter('**/*.css', { restore: true });

    var cssStream = gulp.src(plugins.mainBowerFiles().concat(src + 'styles/*.css'))
               .pipe(filterForCssDependencies)
               .pipe(plugins.plumber())
               .pipe(plugins.concat('css.css'));

    var lessStream = gulp.src(plugins.mainBowerFiles().concat(src + 'styles/*.less'))
               .pipe(filterForLessDependencies)
               .pipe(plugins.plumber())
               .pipe(plugins.less())
               .pipe(plugins.concat('less.css'));


    var sassStream = gulp.src(plugins.mainBowerFiles().concat(src + 'styles/*.scss'))
               .pipe(filterForSassDependencies)
               .pipe(plugins.plumber())
               .pipe(plugins.sass())
               .pipe(plugins.concat('sass.css'));

    return merge(lessStream, sassStream, cssStream)
               .pipe(plugins.autoprefixer({
                 browsers: ['last 2 versions'],
                 cascade: false
                }))
               .pipe(plugins.concat('styles.css'))
               .pipe(plugins.rename({ suffix: '.min' }))
               .pipe(plugins.minifyCss())
               .pipe(gulp.dest(dest + 'css'))
               .pipe(browserSync.reload({ stream: true }))
               .pipe(plugins.notify({ message: 'Styles task complete' }));

});

// images
gulp.task('imagemin', function () {

    var imgSrc = src + 'images/**/*.+(png|jpg|gif)';

    return gulp.src(src + 'images/*')
               .pipe(plugins.changed(dest + 'img'))
               .pipe(plugins.imagemin())
               .pipe(gulp.dest(dest + 'img'))
               .pipe(browserSync.reload({ stream: true }))
               .pipe(plugins.notify({ message: 'Imagemin task complete' }));

});

// html
gulp.task('html', function () {
    return gulp.src(src + '**/*.html')
               .pipe(gulp.dest(dest))
               .pipe(browserSync.reload({ stream: true }))
               .pipe(plugins.notify({ message: 'Html task complete' }));
});

// clean
gulp.task('clean', function() {
  return gulp.src([dest + 'css', dest + 'js', dest + 'images'], { read: false })
    .pipe(plugins.clean());
});

// default
gulp.task('default', [ 'clean', 'browserSync', 'html', 'styles', 'js', 'imagemin'],
   function () {

   gulp.watch(src + 'styles/*', ['styles'])
   gulp.watch(src + 'js/*', ['js'])
   gulp.watch(src + '**/*.html', ['html'])
   gulp.watch(src + 'images/*', ['imagemin']);
});

gulp.task('browserSync', function() {
   return browserSync.init({
      server: {
         baseDir: dest
      }
   })
});
