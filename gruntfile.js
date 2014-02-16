module.exports = function (grunt) {

    grunt.initConfig({
        'gh-pages': {
            options: {
                base: 'build'
            },
            src: '**/*'
        },
        copy: {
            components: {
                files: [{
                        expand: true,
                        cwd: 'src/',
                        src: ['components/**/*.min.js', 'components/**/*.min.js.map'],
                        dest: 'build/'
                    },{
                        expand: true,
                        cwd: 'src/',
                        src: 'components/foundation/css/**.css',
                        dest: 'build/'
                    },{
                        expand: true,
                        cwd: 'src/',
                        src: 'public/images/**/*',
                        dest: 'build/'
                    },

                ]
            }
        },
        uglify: {
            options: {
                compress: false,
                beautify: true,
                mangle: false,
                sourceMap: 'build/public/javascripts/main.min.js.map'

            },
            my_target: {
                files: {
                    'build/public/javascripts/main.min.js': ['src/public/javascripts/app/**/*.js']
                }
            }
        },
        jade: {
            compile: {
                options:{
                    pretty: true
                },
                files: {
                    'build/index.html': 'src/views/index.jade'
                }
            }
        },
        sass: {
            main: {
                options: {
                    compass: true
                },
                files: {
                    'build/public/stylesheets/style.css': 'src/public/stylesheets/sass/main/style.sass'
                }
            }
        },
        watch: {
            jade: {
                files: ['src/views/**/*.jade'],
                tasks: ['jade'],
                options: {
                    //
                }
            },
            compass: {
                files: ['src/public/stylesheets/sass/**/*.sass'],
                tasks: ['compass'],
                options: {
                    //
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('publish', ['build', 'gh-pages']);

    grunt.registerTask('default', ['build', 'watch']);

    grunt.registerTask('build', ['uglify', 'copy', 'jade', 'sass']);

};
