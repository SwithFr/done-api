/**
 * Created by Swith on 18/06/2016.
 */

"use strict"

import express from 'express'
import bodyParser from 'body-parser'

let oApp

oApp = express()

oApp.use( bodyParser.json() )
oApp.use( bodyParser.urlencoded( {
    extended: true
} ) )

oApp.use( require( "./middleware").log )

// Load routes
require( "../routes/users" ).init( oApp )
require( "../routes/projects" ).init( oApp )
require( "../routes/tasks" ).init( oApp )

oApp.listen( 23456 )