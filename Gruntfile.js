module.exports = function (grunt) {
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: {
                    'public/css/style.css': 'public/css/stylesprebuild.css'
                }
            }
        },
        cssmin: {
          target: {
            files: {
              'public/css/style.css': 'public/css/style.css'
            }
          }
        },
        watch: {
            styles: {
                files: ['public/css/stylesprebuild.css'],
                tasks: ['autoprefixer','cssmin']
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};