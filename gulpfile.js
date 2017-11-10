const argv = require('yargs').argv;
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const del = require('del');
const deploy = require('gulp-gh-pages');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const spawn = require('child_process').spawn;
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const when = require('gulp-if');


// Compile sass into CSS & auto-inject into browsers
gulp.task('styles', function () {
    return gulp.src("./assets/scss/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest("./assets/css"))
        .pipe(when(argv.prod, cssnano()))
        .pipe(when(argv.prod, gulp.dest('dist/assets/stylesheets')))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src("./assets/js/*.js")
        .pipe(plumber())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest("./assets/js"))
        .pipe(when(argv.prod, uglify()))
        .pipe(when(argv.prod, concat('index.js')))
        .pipe(when(argv.prod, gulp.dest('dist/assets/javascripts')))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['styles'], function () {
    browserSync.init({
        server: "./",
    });
    gulp.watch("./assets/scss/**/*.scss", ['styles']);
    gulp.watch(["./*.html", "./assets/js/*.js"]).on('change', browserSync.reload);
});

// Gulp auto-reload
gulp.task('auto-reload', function () {
    spawn('gulp', [], {
        stdio: 'inherit'
    });
    process.exit();
});
gulp.task('watch', function () {
    gulp.watch('gulpfile.js', ['auto-reload']);
});

// Call the plumber
gulp.task('plumber', ['styles'], function () {
    gulp.src('./src/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist'));
});

// Build tasks
gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('./*.html')
    .pipe(useref())
    .pipe(when(/\.js$/, uglify({compress: {drop_console: true}})))
    .pipe(when(/\.css$/, cssnano({safe: true, autoprefixer: false})))
    .pipe(when(/\.html$/, htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: {compress: {drop_console: true}},
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('assets/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('build', ['clean', 'html', 'images']);

// Deploy GH Pages
gulp.task('deploy', ['build'], function () {
    return gulp.src('./dist/**/*')
        .pipe(deploy());
});

gulp.task('default', ['serve', 'watch']);
