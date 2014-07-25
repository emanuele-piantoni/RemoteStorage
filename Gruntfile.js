//come un qualunque module di node
//esporto la configurazione
module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		//lo informo dove si trova il file package.json
		pkg: grunt.file.readJSON('package.json'),


		//keyword la recupere 99% da github oppure dal sito o dai sorgenti
		nodemon: {
			dev: {
				script: 'server/app.js',
				options: {
					watch: ['server'],
					callback: function(nodemon){
						nodemon.on('restart', function(){
							require('fs').writeFileSync('tmp/.rebooted', 'rebooted');
						});
					}
				}
			},
			dist: {
				script: 'server/app.js',
				options: {
					env: {
						NODE_ENV: 'dist'
					}
				}
			}
		},

		//** indica folder interne (ricorsivamente)
		mochaTest: {
			test: {
				src: ['server/test/**/*.js'],
				options: {
					reporter: 'spec'
				}
			}
		},

		mocha: {
			test: {
				src: ['client/test/runner.html'],
				options: {
					run: true,
					log: true
				}
			}
		},

		watch: {
			serverTest: {
				files: ['server/**/*'],
				tasks: ['mochaTest']
			},
			clientTest: {
				files: ['client/**/*'],
				tasks: ['mocha']
			},
			buildSass:{
				files: ['client/scss/**/*'],
				tasks: ['sass:dev']
			},
			livereload: {
				files: ['client/**/*', 'tmp/.rebooted'],
				options: {
					livereload: true
				}
			}
		},

		concurrent: {
			dev: {
				tasks: ['nodemon:dev', 'watch'],
				options: {
					logConcurrentOutput: true 
				}
			}
		},

		sass: {
			dev: {
				files: {
					//file di destinzione -> file di partenza
					//ho la possibilita di scrivere un pattern
					'client/css/app.css': 'client/scss/app.scss'
				},
				options: {
					//per mostrare i scss in chrome
					sourcemap: true
				}
			},
			dist: {
				files: {
					'client-dist/app.css': 'client/scss/app.scss'
				},
				options: {
					style: 'compressed'
				}
			}
		},

		ngAnnotate: {
			dist: {
				files: {
					'tmp/client/app.js': 
						['client/js/app.js', 
						 'client/js/resources/*.js', 
						 'client/js/controllers/*.js', 
						 'client/js/directives/*.js']
				}
				
			}
		},

		uglify: {
			dist: {
				files: {
					'client-dist/app.js' : [
					 	'client/components/angular/angular.js',
					 	'client/components/angular-resource/angular-resource.js',
					 	'tmp/client/app.js'
					 	]
 				}
			}
		},

		processhtml: {
			dist: {
				files: {
					'client-dist/index.html': ['client/index.html'] 
				}
			}
		}

	});

	//permette di eseguire grunt concurrent come grunt
	//posso specificare come default più tasks -> questi vengono eseguiti in serie
	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('build', ['ngAnnotate', 'uglify', 'sass:dist', 'processhtml']);
};