var gulp = require('gulp'),
    sass = require('gulp-sass'),
    reddit = require('./lib/reddit_upload.js');

gulp.task('dist', function () {
    gulp.src('./assets/stylesheets/**/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('push', function (done) {
    return gulp.src('./dist/stylesheets/index.css')
               .pipe(reddit())
});

gulp.task('default', ['dist', 'push']);
