var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    cssnano = require('gulp-cssnano'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

var sassOptions = {
    defaultEncoding: 'UTF-8',
    lineNumbers: true,
    outputStyle: 'compressed',
    precision: 8
};

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    gulp.src('src/assets/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions']
        })]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('scripts', function () {
    return gulp.src([
            'src/assets/js/main.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('fonts', function () {
    return gulp.src([
            'src/assets/fonts/**/*'
        ])
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('video', function () {
    return gulp.src('src/assets/video/*')
        .pipe(gulp.dest('dist/assets/video'));
});

gulp.task('images', function () {
    return gulp.src('src/assets/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('build', ['html', 'sass', 'scripts', 'video', 'images', 'fonts']);

gulp.task('default', ['build']);

gulp.task('serve', [], function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/assets/scss/**/*.scss', ['sass']);
    gulp.watch('src/assets/**/*.js', ['scripts']);
    gulp.watch('dist/assets/images/**/*', ['images']);

    gulp.watch('src/**/*.html').on('change', reload);
    gulp.watch('dist/main.js').on('change', reload);
});
