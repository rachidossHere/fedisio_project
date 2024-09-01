const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const changed = require('gulp-changed');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const htmlBeautify = require('gulp-html-beautify');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const convertEncoding = require('gulp-convert-encoding');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const wait = require('gulp-wait');
const browserSync = require('browser-sync').create();

const options = {
    outPath: './build/',
    inPath: './src'
};

const supported = [
    'Android >= 2.3',
    'BlackBerry >= 7',
    'Chrome >= 9',
    'Firefox >= 2',
    'Explorer >= 8',
    'iOS >= 5',
    'Opera >= 11',
    'Safari >= 5',
    'ChromeAndroid >= 9',
    'FirefoxAndroid >= 4',
    'ExplorerMobile >= 9'
];

function clean() {
    return del(options.outPath);
}

function html() {
    return gulp.src(options.inPath + '/*.html')
        .pipe(changed(options.outPath))
        .pipe(convertEncoding({ to: 'utf-8' }))
        .pipe(htmlBeautify())
        .pipe(gulp.dest(options.outPath))
        .pipe(browserSync.stream());
}

function fonts() {
    return gulp.src(options.inPath + '/assets/fonts/**/*{ttf,otf,eot,woff,woff2,svg}')
        .pipe(changed(options.outPath + '/assets/fonts'))
        .pipe(gulp.dest(options.outPath + '/assets/fonts'));
}

function medias() {
    return gulp.src(options.inPath + '/medias/**/*{jpg,jpeg,png,gif,svg}')
        .pipe(changed(options.outPath + '/medias'))
        .pipe(gulp.dest(options.outPath + '/medias'));
}

function img() {
    return gulp.src(options.inPath + '/assets/img/**/*{jpg,jpeg,png,gif,svg,ico}')
        .pipe(changed(options.outPath + '/assets/img'))
        .pipe(gulp.dest(options.outPath + '/assets/img'));
}

function js() {
    return gulp.src([options.inPath + '/assets/js/lib/*.js', options.inPath + '/assets/js/plugin/*.js', options.inPath + '/assets/js/*.js'])
        .pipe(plumber())
        .pipe(changed(options.outPath + '/assets/js'))
        .pipe(gulp.dest(options.outPath + '/assets/js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(options.outPath + '/assets/js'))
        .pipe(browserSync.stream());
}

function sassTask() {
    return gulp.src(options.inPath + '/assets/sass/*.scss')
        .pipe(plumber())
        .pipe(wait(500))
        .pipe(sass().on('error', sass.logError))
        .pipe(convertEncoding({ to: 'utf-8' }))
        .pipe(cssnano({
            autoprefixer: { browsers: supported, add: true }
        }))
        .pipe(gulp.dest(options.outPath + '/assets/css'))
        .pipe(browserSync.stream());
}

function mediasmin() {
    return gulp.src(options.inPath + '/medias/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(options.outPath + '/medias'));
}

function imgmin() {
    return gulp.src(options.inPath + '/assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(options.outPath + '/assets/img'));
}

function server() {
    browserSync.init({
        server: {
            baseDir: options.outPath,
            directory: true
        },
        localOnly: true,
        reloadOnRestart: true,
        port: 8080,
        open: true,
        notify: false
    });
}

function watcher() {
    gulp.watch(options.inPath + '/*.html', html);
    gulp.watch(options.inPath + '/assets/sass/**/*.scss', sassTask);
    gulp.watch(options.inPath + '/assets/js/**/*.js', js);
    gulp.watch(options.inPath + '/assets/img/**/*{jpg,jpeg,png,gif,svg,ico}', img);
    gulp.watch(options.inPath + '/medias/**/*{jpg,jpeg,png,gif,svg}', medias);
    gulp.watch(options.inPath + '/assets/fonts/*{ttf,otf,eot,woff,woff2,svg}', fonts);
    gulp.watch(options.outPath + '/**/*').on('change', browserSync.reload);
}

const build = gulp.series(clean, gulp.parallel(html, sassTask, js, img, medias, fonts));
const opt = gulp.series(imgmin, mediasmin);
const defaultTask = gulp.series(build, gulp.parallel(server, watcher));

exports.default = defaultTask;
exports.build = build;
exports.opt = opt;
