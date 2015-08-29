var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var gulpCopy = require('gulp-copy');
// var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var runningBuild;

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('build', function() {
    browserSync.notify(messages.jekyllBuild);
    /*    if (runningBuild) {
            console.log('build cancelled');
            runningBuild.kill('SIGTERM');
        }

        runningBuild = cp.spawnSync('jekyll.bat', ['build'], {
            stdio: 'inherit'
        });

        runningBuild = null;
        return runningBuild;*/
    return cp.spawnSync('jekyll.bat', ['build'], {
        stdio: 'inherit'
    });
});

gulp.task('jekyll-build', function(callback) {
    runSequence('build', 'prefix', 'copyassets', callback);
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
gulp.task('browser-sync-slc', ['jekyll-build'], function() {
    browserSync.init({
        server: {
            open: false,
            baseDir: '_site/slc'
        }
    });
});
gulp.task('browser-sync-la', ['jekyll-build'], function() {
    browserSync.init({
        server: {
            open: false,
            baseDir: '_site/la'
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
gulp.task('prefix', function(cb) {
    return gulp.src('_site/css/style.css')
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('.'));
    // cb(err);
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
    // gulp.watch(['_sass/*.scss','css/*.scss'], ['sass']);

    gulp.watch(['_sass/*.scss', '_config.yml', 'css/*.scss', 'css/*.css', '_layouts/**/*.*', '_includes/**/*.*', 'la/**/*.*', 'slc/**/*.*'], ['jekyll-rebuild']);
});

/**
 * Copy CSS
 */
// gulp.task('copyassets', function() {
//     gulp.src('_site/css/**/*.*')
//         .pipe(gulpCopy('_site/la/css', {
//             prefix: 2
//         }))
//         .pipe(gulpCopy('_site/slc/css', {
//             prefix: 2
//         }));
//     gulp.src('_site/assets/**/*.*')
//         .pipe(gulpCopy('_site/slc', {
//             prefix: 2
//         }))
//         .pipe(gulpCopy('_site/la', {
//             prefix: 2
//         })); 
// });
// 
gulp.task('copyassets', function() {
    gulp.src('_site/css/**/*.*')
        .pipe(gulp.dest('_site/la/css'))
        .pipe(gulp.dest('_site/slc/css'));
    return gulp.src('_site/assets/**/*.*')
        .pipe(gulp.dest('_site/la/assets'))
        .pipe(gulp.dest('_site/slc/assets'));
    // return gulp.src('_site/**/*.*').pipe(gulp.dest('_parse/public'));
});


/**
 * SLC build
 */
gulp.task('slc', ['browser-sync-la', 'watch']);

/**
 * LA build
 */
gulp.task('la', ['browser-sync-la', 'watch']);

/**
 * LA build with Parse
 */
gulp.task('la', ['browser-sync-la', 'watch']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);