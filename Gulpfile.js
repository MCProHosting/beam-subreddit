var gulp = require('gulp')
  , sass = require('gulp-sass');

gulp.task('dist', function () {
    gulp.src('./assets/stylesheets/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/stylesheets'));
});
