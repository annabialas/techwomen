var
gulp            = require('gulp'),
sass            = require('gulp-sass'),
shell           = require('gulp-shell'),
data            = require('gulp-data'),
nunjucksRender  = require('gulp-nunjucks-render'),
browserSync     = require('browser-sync'),
file            = require('gulp-file'),
plumber         = require('gulp-plumber'),
packagejson     = require('./package.json'),
siteData        = require('./source/data/data.json');



gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'public' // This is the DIST folder browsersync will serve
    },
    open: false
  })
})

gulp.task('sass', function() {
  return gulp.src('source/sass/**/*.scss') // Gets all files ending with .scss in source/sass
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('img', function() {
  return gulp.src('source/img/**/*')
  .pipe(plumber())
  .pipe(gulp.dest('public/img'))
  .pipe(browserSync.stream());
});

gulp.task('libJs', function() {
  return gulp.src('node_modules/govlab-styleguide/dist/js/**/*')
  .pipe(plumber())
  .pipe(gulp.dest('source/js/lib'))
  .pipe(browserSync.stream());
});

gulp.task('js', ['libJs'], function() {
  return gulp.src('source/js/**/*')
  .pipe(plumber())
  .pipe(gulp.dest('public/js'))
  .pipe(browserSync.stream());
});


// Nunjucks
gulp.task('nunjucks', function() {

  return gulp.src('source/templates/**/*.+(html|nunjucks)')
  // .pipe(plumber())
  // Adding data to Nunjucks
  .pipe(data(function(f) {
    return siteData;
  }))
  .pipe(nunjucksRender({
    path: 'source/templates',
  }))
  .pipe(gulp.dest('public'))
  .pipe(browserSync.reload({
    stream: true
  }))
});



gulp.task('deploy', ['sass', 'nunjucks', 'js', 'img'], shell.task([
  'git subtree push --prefix public origin gh-pages'
  ])
);

gulp.task('default', ['browserSync', 'sass', 'nunjucks', 'js', 'img'], function (){
  gulp.watch('source/sass/**/*.scss', ['sass']);
  gulp.watch('source/templates/**/*.html', ['nunjucks']);
  gulp.watch('source/img/**/*', ['img']);
  gulp.watch('source/js/**/*', ['js']);
});
