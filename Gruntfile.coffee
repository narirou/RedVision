module.exports = ( grunt ) ->
	'use strict'

	grunt.initConfig (

		# Watch
		watch:
			options:
				spawn: true
				dateFormat: ( time ) ->
					grunt.log.writeln( 'The watch finished in ' + time.toFixed( 2 ) + 'ms.' )
					grunt.log.writeln( '' )

			compass:
				files: [ 'styles/{,*/}*.{sass,scss}' ]
				tasks: [ 'compass:compile' ]

			autoprefixer:
				files: [ '.tmp/{,*/}*.css' ]
				tasks: [ 'autoprefixer:compile' ]

			livereload:
				options:
					livereload: true
				files: [
					'views/{,*/}*.jade'
					'public/css/{,*/}*.css'
					'public/js/{,*/}*.js'
					'public/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]

			express:
				options:
					livereload: true
					spawn: false
				files: [
					'app.js'
					'routes/{,*/}*.js'
				]
				tasks: [ 'express:server' ]

		# Compass
		compass:
			compile:
				options:
					sassDir: 'styles'
					cssDir: '.tmp'
					relativeAssets: true
					noLineComments: true

		# Autoprefixer
		autoprefixer:
			compile:
				options:
					browsers: [ 'last 2 version' ]
				files:
					'public/css/styles.css' : '.tmp/styles.css'

		# Sever
		express:
			server:
				options:
					port: process.env.PORT || 3000
					script: 'app.js'

		# SVGMin
		svgmin:
			collections:
				files: [
					expand: true,
					cwd: 'collections/',
					src: ['*/*.svg'],
					dest: 'collections/',
					ext: '.svg'
				]
			public:
				files: [
					expand: true,
					cwd: 'public/',
					src: ['*/*.svg'],
					dest: 'public/',
					ext: '.svg'
				]

		# ImageMin
		imagemin:
			collections:
				options:
					optimizationLevel: 7
				files: [
					expand: true
					cwd: 'collections/',
					src: ['*/*.png'],
					dest: 'collections/',
					ext: '.png'
				]
			public:
				files: [
					expand: true,
					cwd: 'public/',
					src: ['*/*.png'],
					dest: 'public/',
					ext: '.png'
				]

		# Backup
		copy:
			backup:
				files: [
					expand: true
					src: ['collections/**']
					dest: '.tmp/'
				]

	)

	# Load GruntTasks
	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks )

	# Tasks
	grunt.registerTask 'default', [
		'compass:compile'
		'autoprefixer:compile'
		'express'
		'watch'
	]

	grunt.registerTask 'minify', [
		'copy:backup'
		'svgmin:collections'
		'svgmin:public'
		'imagemin:collections'
		'imagemin:public'
	]
