/**
 * Created by smoseley on 11/18/2015.
 */
'use strict';

const gulp = require('gulp');
const inject = require('gulp-inject');
const webserver = require('gulp-webserver');

gulp.task('inject', () => {
    let files = []
        .concat(
            './src/**/*.module.js',
            './src/**/*.js',
            '!./src/**/*.spec.js'
        );

    const jsFiles = gulp.src(files);
const htmlFile = gulp.src('./index.html');
const destination = gulp.dest('./');

return htmlFile
    .pipe(inject(jsFiles))
    .pipe(destination);
});


gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});
