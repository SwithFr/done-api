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

/*    // List all project's tasks
    oApp.get( '/tasks/:projectId', middleware.isAuthenticated, require( '../controllers/tasks/list' ) )*/

    // Get one task
    oApp.get( '/tasks/:id', middleware.isAuthenticated, require( '../controllers/tasks/show' ) )

    // Delete tasks
    oApp.delete( '/tasks/:id', middleware.isAuthenticated, require( '../controllers/tasks/delete' ) )

    // Update task
    oApp.patch( '/tasks/:id', middleware.isAuthenticated, require( '../controllers/tasks/update' ) )

    // Search tasks
    oApp.post( '/tasks/search', middleware.isAuthenticated, require( '../controllers/tasks/search' ) )
}
