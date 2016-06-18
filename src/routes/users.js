/**
 * Created by Swith on 18/06/2016.
 */

"use strict"

exports.init = function( oApp ) {

    oApp.get( '/users', require( '../controllers/users/list' ) )

}
