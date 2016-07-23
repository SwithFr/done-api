/**
 * done-api
 * Created by Swith on 21/06/2016.
 */

"use strict"

import middleware from "../core/middleware"

exports.init = function( oApp ) {
    // Create state
    oApp.post( '/states', middleware.isAuthenticated, require( '../controllers/states/create' ) )

    // List all user's states
    oApp.get( '/states', middleware.isAuthenticated, require( '../controllers/states/list' ) )
}
