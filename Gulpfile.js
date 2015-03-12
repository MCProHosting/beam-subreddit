var gulp = require('gulp'),
    sass = require('gulp-sass'),
    reddit = require('./lib/reddit_upload.js');

var path = {
    stylesheets: {
        src: './assets/stylesheets/**/*.scss',
        dest: './dist/stylesheets'
    },
    dist: './dist/stylesheets/index.css'
};

gulp.task('watch', function () {
    gulp.watch(path.stylesheets.src, ['dist', 'push']);
});

gulp.task('dist', function () {
    gulp.src(path.stylesheets.src)
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest(path.stylesheets.dest));
});

gulp.task('push', function (done) {
    return gulp.src(path.dist)
               .pipe(reddit())
});

gulp.task('default', ['dist', 'push']);
