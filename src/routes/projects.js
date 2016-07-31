/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

import middleware from "../core/middleware"

exports.init = function( oApp ) {
    // Create project
    oApp.post( '/projects', middleware.isAuthenticated, require( '../controllers/projects/create' ) )

    // List all user's projects
    oApp.get( '/projects', middleware.isAuthenticated, require( '../controllers/projects/list' ) )

    // get projects and tasks
    oApp.get( '/projects/:projectId/tasks', middleware.isAuthenticated, require( '../controllers/tasks/list' ) )

    // Get one project
    oApp.get( '/projects/:id', middleware.isAuthenticated, require( '../controllers/projects/show' ) )

    // Update project
    oApp.patch( '/projects/:id', middleware.isAuthenticated, require( '../controllers/projects/update' ) )
}
