var gulp = require('gulp');
var format = require('./gulp-stringify');

gulp.task('format', function() {
  gulp
    .src('data/**/*.json', {base: './data'})
    .pipe(format(2))
    .pipe(gulp.dest('./data'));
});
