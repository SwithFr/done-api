/**
 * done-api
 * Created by Swith on 20/06/2016.
 */

"use strict"

import middleware from "../core/middleware"

exports.init = function( oApp ) {
    // Create tag
    oApp.post( '/tags', middleware.isAuthenticated, require( '../controllers/tags/create' ) )

    // List all user's tags
    oApp.get( '/tags', middleware.isAuthenticated, require( '../controllers/tags/list' ) )

    // Delete tag
    oApp.delete( '/tags/:id', middleware.isAuthenticated, require( '../controllers/tags/delete' ) )
}
