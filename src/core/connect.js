/**
 * Created by Swith on 18/06/2016.
 */

"use strict"

import oSequelize from './sequelize'
import zouti from 'zouti'

oSequelize.db.options.logging = false

zouti.log( "connect to database", "done:API", zouti.GREEN )
zouti.bench( "done:db" )

oSequelize.db
    .sync( {
        force: true
    } )
    .catch( function( oError ) {
        zouti.log( oError, "done:db:connect", zouti.ERROR )
        zouti.bench( "done:db" )
        process.exit( 1 )
    } )
    .then( function() {
        zouti.bench( "done:db" )
        oSequelize.db.options.logging = console.log;
    } )