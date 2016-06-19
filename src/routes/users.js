/**
 * Created by Swith on 18/06/2016.
 */

"use strict"

import middleware from "../core/middleware"

exports.init = function( oApp ) {

    oApp.post( '/users/login', require( '../controllers/users/login' ) )

}
