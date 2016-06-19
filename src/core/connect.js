/**
 * Created by Swith on 18/06/2016.
 */

"use strict"

import oSequelize from './sequelize'
import zouti from 'zouti'
import fs from 'fs'

fs.stat( './db-sync.stub', ( oError, oStats ) => {
    if ( oError ) {
        oSequelize.db.options.logging = false

        zouti.log( "connect to database", "done:API", zouti.GREEN )
        zouti.bench( "done:db" )

        oSequelize.db
            .sync( {
                force: true
            } )
            .catch( function( oError ) {
                zouti.log( oError, "done:db:syncing", zouti.ERROR )
                zouti.bench( "done:db" )
                process.exit( 1 )
            } )
            .then( function() {
                zouti.bench( "done:db" )
                fs.writeFile( "./db-sync.stub", "1", {
                    encoding: "utf-8"
                } )
                oSequelize.db.options.logging = console.log;
            } )
    }
} )