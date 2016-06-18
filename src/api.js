/**
 * Created by Swith on 18/06/2016.
 */

"use strict"

import zouti from 'zouti'

zouti.clearConsole()
zouti.log( "Lunching...", "done:API", zouti.GREEN )
zouti.bench( "done:API" )

require( "./core/sequelize" )
require( "./core/express" )
require( "./core/connect" )

zouti.bench( "done:API" )
