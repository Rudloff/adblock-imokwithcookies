/*jslint node: true */
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig(
        {
            jslint: {
                Gruntfile: {
                    src: ['Gruntfile.js']
                }
            },
            jsonlint: {
                manifests: {
                    src: '*.json',
                    options: {
                        format: true
                    }
                }
            },
            fixpack: {
                package: {
                    src: 'package.json'
                }
            },
            shell: {
                sort: {
                    //This is the easiest way but we might want to find a way to have a correct alphabetical order
                    command: 'sort -Vru filters.txt -o filters.txt'
                }
            },
            gitcommit: {
                options: {
                    message: 'New filter'
                },
                commit: {
                    files: {
                        src: 'filters.txt'
                    }
                }
            },
            gitpush: {
                push: {

                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-fixpack');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-git');

    grunt.registerTask('lint', ['jslint', 'fixpack', 'jsonlint', 'shell:sort']);
    grunt.registerTask('commit', 'Quickly commit a new filter', ['lint', 'gitcommit', 'gitpush']);
};
