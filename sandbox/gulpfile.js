var gulp = require('gulp');
var sass = sass = require('gulp-sass');
var exec = require('child_process').exec;

gulp.task('copy', function () {
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('./public/css'));
    gulp.src('./bower_components/jquery/dist/jquery.js')
        .pipe(gulp.dest('./public/js'));
    gulp.src('./bower_components/bootstrap/dist/js/bootstrap.js')
        .pipe(gulp.dest('./public/js'));
});
gulp.task('sass', function () {
    gulp.src('./public/scss/sudoku.scss')
        .pipe(sass({sourceComments: 'map'}))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('assets', ['sass', 'copy']);

gulp.task('default', function() {
    // place code for your default task here
});