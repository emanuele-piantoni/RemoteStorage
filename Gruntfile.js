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
				tasks: ['sass']
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
				tasks: ['nodemon', 'watch'],
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
			}
		}

	});

	//permette di eseguire grunt concurrent come grunt
	//posso specificare come default più tasks -> questi vengono eseguiti in serie
	grunt.registerTask('default', ['concurrent']);
};