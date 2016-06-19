/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import zouti from 'zouti'
import { models } from "../../core/sequelize"

let json = middleware.json
let User = models.User

module.exports = function( oReq, oRes ) {
    let oUser = User.build()

    let sLogin = ( oReq.body.login || '' ).trim()
    let sPassword = ( oReq.body.password || '' ).trim()

    if ( !sLogin || !sPassword ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_PARAMS',
            message: 'You must provide a non empty password and login'
        }, 400 )
    }

    oUser.login = sLogin
    oUser.password = sPassword

    oUser
        .validate()
        .then( function( oValidationReport ) {
            if( oValidationReport ) {
                return json.error( oReq, oRes, oValidationReport.errors, 400 )
            }

            oUser
                .save()
                .catch( function( oError ) {
                    return json.error( oReq, oRes, oError, 500 )
                } )
                .then( function( oSavedUser ) {
                    oSavedUser && json.send( oReq, oRes, {
                        id: oSavedUser.id,
                        login: oSavedUser.login
                    } )
                } )
        } )
}