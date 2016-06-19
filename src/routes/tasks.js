/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

"use strict"

import middleware from "../core/middleware"

exports.init = function( oApp ) {
    // Create task
    oApp.post( '/tasks', middleware.isAuthenticated, require( '../controllers/tasks/create' ) )

    // List all project's tasks
    oApp.get( '/tasks', middleware.isAuthenticated, require( '../controllers/tasks/list' ) )
}
