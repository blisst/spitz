module.exports = function (grunt) {
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: {
                    'css/style.css': 'css/stylesprebuild.css'
                }
            }
        },
        cssmin: {
          target: {
            files: {
              'css/style.css': 'css/style.css'
            }
          }
        },
        watch: {
            styles: {
                files: ['css/stylesprebuild.css'],
                tasks: ['autoprefixer','cssmin']
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};