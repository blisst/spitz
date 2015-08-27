var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function(done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {
            stdio: 'inherit'
        })
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync-slc', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site/la'
        }
    });
});
gulp.task('browser-sync-la', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site/slc'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function() {
    return gulp.src('css/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('css'));
});

/**
 * Autoprefix
 */
gulp.task('prefix', function() {
    return gulp.src('_site/**/css/*.css')
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.reload({
            stream: true
        }));
        // .pipe(gulp.dest('css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
    // gulp.watch(['_sass/*.scss','css/*.scss'], ['sass']);
    gulp.watch(['_sass/*.scss','css/*.scss','index.html', '_layouts/*.html', '_posts/*','la','slc'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);