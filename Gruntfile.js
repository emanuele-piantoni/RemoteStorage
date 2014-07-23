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
					watch: ['server']
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

		watch: {
			serverTest: {
				files: ['server/**/*'],
				tasks: ['mochaTest']
			}
		},

		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true 
				}
			}

		}

	});

	//permette di eseguire grunt concurrent come grunt
	//posso specificare come default più tasks -> questi vengono eseguiti in serie
	grunt.registerTask('default', ['concurrent']);
};