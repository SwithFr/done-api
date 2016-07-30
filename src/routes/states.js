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

    // Delete state
    oApp.delete( '/states/:id', middleware.isAuthenticated, require( '../controllers/states/delete' ) )

    // Update state
    oApp.patch( '/states/:id', middleware.isAuthenticated, require( '../controllers/states/update' ) )
}
