/**
 * Created by Swith on 19/06/2016.
 */

"use strict"

import { models } from "./sequelize"
import zouti from 'zouti'

let User = models.User
let _json, _log

exports.log = ( oReq, oRes, next ) => {
    const sDate = ( new Date() ).toTimeString()

    zouti.log( "(" + sDate + ") - [" + oReq.method + "] - " + oReq.url, "done:api", zouti.BLUE )
    next()
}

exports.json = _json = {
    send: function( oReq, oRes, mData, iStatusCode ) {
        oRes.status( iStatusCode || 200 ).json( {
            "url": "[" + oReq.method + "] - " + oReq.url,
            "status": iStatusCode || 200,
            "error": false,
            "data": mData
        } );
    },
    error: function( oReq, oRes, oError, iStatusCode ) {
        oRes.status( iStatusCode || 500 ).json( {
            "url": "[" + oReq.method + "] - " + oReq.url,
            "status": iStatusCode || 500,
            "error":  oError || ( oError.errors && oError.errors[ 0 ].message ) || oError.message,
            "data": null
        } );
    }
}

exports.isAuthenticated = ( oReq, oRes, next ) => {
    let iUserId = +oReq.headers.userid
    let sUserToken = oReq.headers.usertoken

    if( !iUserId || !sUserToken ) {
        return _json.error( oReq, oRes, new Error( "UNAUTHORIZED" ), 401 )
    }

    User
        .findById( iUserId )
        .then( function( oUser ) {
            if( oUser && oUser.token === sUserToken ) {
                oRes.locals.user = oUser
                next()
            } else {
                return _json.error( oReq, oRes, new Error( "INVALID_TOKEN" ), 401 )
            }
        } )
}