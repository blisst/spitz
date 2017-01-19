var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var gulpCopy = require('gulp-copy');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var uncss = require('gulp-uncss');
// var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');
var runningBuild;
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var fs = require('fs');
var path = require('path');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

/**
 * Build the Jekyll Site
 */
gulp.task('build', function(cb) {
    browserSync.notify(messages.jekyllBuild);
    cp.spawnSync('jekyll', ['build'], {
        stdio: 'inherit'
    });
    cb();
});

gulp.task('jekyll-build', ['css', 'build', 'copyassets'], function() {});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    // browserSync.reload();
    livereload.reload();
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

gulp.task('browser-sync-san_diego', ['jekyll-build'], function() {
    browserSync.init({
        server: {
            open: false,
            baseDir: '_site/san_diego'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function() {
    return gulp.src('_assets/css/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        // .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('css'));
});

/**
 * Autoprefix, minify, unCSS
 */
gulp.task('css', function(cb) {
    gulp.src('_assets/css/style.css')
        // .pipe(uncss({'./**/*.html'}))
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('_assets/css'));
    cb();
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
    livereload.listen();
    watch(['_config.yml', '_assets/**/*.*', '!_assets/css/style.min.css', '_layouts/**/*.*', '_includes/**/*.*', 'la/**/*.*', 'slc/**/*.*', 'san_diego/**/*.*', 'minnesota/**/*.*'], batch(function (events, done) {
        gulp.start('jekyll-rebuild', done);
    }));
    // gulp.watch(['_config.yml', '_assets/**/*.*', '_layouts/**/*.*', '_includes/**/*.*', 'la/**/*.*', 'slc/**/*.*', 'san_diego/**/*.*', 'minnesota/**/*.*'], ['jekyll-rebuild']);
});
gulp.task('build-watch', function() {
    cp.spawnSync('jekyll.bat', ['build --watch'], {
        stdio: 'inherit'
    });
    // gulp.watch(['_config.yml', '_assets/**/*.*', '_layouts/**/*.*', '_includes/**/*.*', 'la/**/*.*', 'slc/**/*.*', 'san_diego/**/*.*', 'minnesota/**/*.*'], ['jekyll-rebuild']);
});


gulp.task('copyassets', function(cb) {
    var task = gulp.src('_assets/**/*.*');
    var folders = getFolders('_site');

    folders.forEach(function(folder) {
        task.pipe(gulp.dest('_site/'+folder+'/assets'));
    });
    cb();
});


/**
 * SLC build
 */
gulp.task('slc', ['browser-sync-slc', 'watch']);

/**
 * LA build
 */
gulp.task('la', ['browser-sync-la', 'watch']);
gulp.task('san-diego', ['jekyll-build', 'watch']);


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);