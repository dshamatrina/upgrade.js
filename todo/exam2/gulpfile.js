var gulp = require('gulp'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat');

gulp.task('build', function() {
  return gulp.src('./dev/style/style.less')
    .pipe(less())
    .pipe(gulp.dest('./dest/'));
});

gulp.task('css', function() {
  return gulp.src(['./dev/style/font/stylesheet.css', './dest/style.css'])
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dest/'));
});

gulp.task('buildcss', gulp.series(['build', 'css']));

gulp.task('pug', function () {
    return gulp.src('./dev/index.pug')
    .pipe(pug({
            doctype: 'html',
            pretty: false
            }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch('./dev/index.pug', gulp.series(['pug']));
    gulp.watch('./dev/style/style.less', gulp.series(['buildcss']));
});

gulp.task('default', gulp.series(['pug', 'buildcss', 'watch']));