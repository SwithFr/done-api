/**
 * done-api
 * Created by Swith on 21/06/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import zouti from 'zouti'
import { models } from "../../core/sequelize"

let json = middleware.json
let State = models.State

module.exports = function( oReq, oRes ) {
    let oState = State.build()

    let sName = ( oReq.body.name || '' ).trim()

    if ( !sName ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_PARAMS',
            message: 'You must provide a non empty name'
        }, 400 )
    }

    oState.name = sName
    oState.user_id = +oReq.headers.userid

    oState
        .validate()
        .then( function( oValidationReport ) {
            if( oValidationReport ) {
                return json.error( oReq, oRes, oValidationReport.errors, 400 )
            }

            oState
                .save()
                .catch( function( oError ) {
                    return json.error( oReq, oRes, oError, 500 )
                } )
                .then( function( oSavedState ) {
                    oSavedState && json.send( oReq, oRes, {
                        id: oSavedState.id,
                        name: oSavedState.name,
                        user_id: oSavedState.user_id
                    } )
                } )
        } )
}