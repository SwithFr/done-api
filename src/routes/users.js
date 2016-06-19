/**
 * Created by Swith on 18/06/2016.
 */

"use strict"

import middleware from "../core/middleware"

exports.init = function( oApp ) {
    // Log user
    oApp.post( '/users/login', require( '../controllers/users/login' ) )

    // Create user
    oApp.post( '/users', require( '../controllers/users/create' ) )
}
