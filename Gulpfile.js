var gulp = require('gulp')
  , sass = require('gulp-sass');

gulp.task('dist', function () {
    gulp.src('./assets/stylesheets/**/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./dist/stylesheets'));
});
