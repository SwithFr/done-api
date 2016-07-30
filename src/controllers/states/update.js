/**
 * done-api
 * update
 * Created by Swith on 30/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

let json = middleware.json
let State = models.State

const saveUpdatedState = ( oStateData, onError, onSuccess ) => {
    oStateData
        .save()
        .catch( ( oError ) => {
            return onError( oError )
        } )
        .then( ( oSavedUpdatedState ) => {
            onSuccess( oSavedUpdatedState )
        } )
}

module.exports = ( oReq, oRes ) => {
    let sName = ( oReq.body.name || '' ).trim()

    if ( !sName ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_PARAMS',
            message: 'You must provide a non empty name'
        }, 400 )
    }

    State
        .findById( +oReq.params.id )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oUpdatedState ) => {
            if ( !oUpdatedState ) {
                return json.error( oReq, oRes, {
                    type: 'STATE_NOT_FOUND',
                    message: 'State not found'
                }, 404 )
            }

            oUpdatedState.name = sName

            saveUpdatedState( oUpdatedState, ( oError ) => {
                return json.error( oReq, oRes, oError, 500 )
            }, ( oSavedUpdatedState ) => {
                return json.send( oReq, oRes, oSavedUpdatedState )
            } )
        } )
}