/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

import middleware from "../core/middleware"

exports.init = function( oApp ) {
    // Create project
    oApp.post( '/projects', middleware.isAuthenticated, require( '../controllers/projects/create' ) )
}
