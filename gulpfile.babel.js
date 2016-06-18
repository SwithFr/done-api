"use strict"

import gulp from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'

gulp.task( 'babel', () => {
    return gulp.src( 'src/**/*.js' )
        .pipe( babel( {
            presets: [ 'es2015' ]
        } ) )
        .pipe( gulp.dest( 'bin' ) )
} )

gulp.task( 'watch', () => {
    gulp.watch( 'src/**/*.js', [ 'babel' ] )
} )

gulp.task( 'default', [ 'watch', 'babel' ] )