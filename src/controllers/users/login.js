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

    let sLogin = ( oReq.body.login || '' ).trim()
    let sPassword = ( oReq.body.password || '' ).trim()

    if ( !sLogin || !sPassword ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_PARAMS',
            message: 'You must provide a non empty password and login'
        }, 400 )
    }

    User
        .findOne( {
            where: {
                login: sLogin
            }
        } )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oUser ) => {
            if ( !oUser || oUser.password !== zouti.whirlpool( sPassword ) ) {
                return json.error( oReq, oRes, {
                    type: 'UNKNOWN_USER',
                    message: 'Sorry your credentials doesn‘t match any user'
                }, 404 )
            }

            oUser.token = zouti.sha256( oUser.id + '-' + oUser.updated_at.getTime() )
            oUser.save()

            return json.send( oReq, oRes, {
                user_id: oUser.id,
                user_token: oUser.token,
                user_login: oUser.login
            } )
        } )

}