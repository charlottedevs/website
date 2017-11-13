const argv = require('yargs').argv;
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const run = require('gulp-run-command');
const runSequence = require('gulp-run-sequence');
const sass = require('gulp-sass');
const spawn = require('child_process').spawn;
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const when = require('gulp-if');


// Compile sass into CSS & auto-inject into browsers
gulp.task('styles', function () {
    return gulp.src("./assets/stylesheets/scss/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest("./assets/stylesheets/css"))
        .pipe(when(argv.prod, gulp.dest('dist/assets/stylesheets')))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src("./assets/javascripts/*.js")
        .pipe(plumber())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest("./assets/javascripts"))
        .pipe(when(argv.prod, concat('index.js')))
        .pipe(when(argv.prod, gulp.dest('dist/assets/javascripts')))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['styles'], function () {
    browserSync.init({
        server: "./",
    });
    gulp.watch("./assets/stylesheets/scss/**/*.scss", ['styles']);
    gulp.watch(["./*.html", "./assets/javascripts/*.js"]).on('change', browserSync.reload);
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
// gulp.task('plumber', ['styles'], function () {
//     gulp.src('./src/*.scss')
//         .pipe(plumber())
//         .pipe(sass())
//         .pipe(uglify())
//         .pipe(plumber.stop())
//         .pipe(gulp.dest('./dist'));
// });

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

gulp.task('build', function () {
    runSequence('clean', 'images', 'html');
});

// Deploy GH Pages
// gulp.task('deploy', ['build'], function () {
//     return gulp.src('./dist/**/*')
//         .pipe(deploy());
// });

// Manual Deploy GH Pages
// Make sure to git add and commit first
gulp.task('deploy', ['build'], run('git subtree push --prefix dist origin gh-pages'));
/* Command Reference:
git add dist && git commit -m "Initial dist subtree commit"
git subtree push --prefix dist origin gh-pages
*/

gulp.task('default', ['serve', 'watch']);
