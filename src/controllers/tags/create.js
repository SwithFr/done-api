/**
 * done-api
 * Created by Swith on 20/06/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import zouti from 'zouti'
import { models } from "../../core/sequelize"

let json = middleware.json
let Tag = models.Tag

module.exports = function( oReq, oRes ) {
    let oTag = Tag.build()

    let sName = ( oReq.body.name || '' ).trim()

    if ( !sName ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_PARAMS',
            message: 'You must provide a non empty name'
        }, 400 )
    }

    oTag.name = sName
    oTag.user_id = +oReq.headers.userid

    oTag
        .validate()
        .then( function( oValidationReport ) {
            if( oValidationReport ) {
                return json.error( oReq, oRes, oValidationReport.errors, 400 )
            }

            oProject
                .save()
                .catch( function( oError ) {
                    return json.error( oReq, oRes, oError, 500 )
                } )
                .then( function( oSavedTag ) {
                    oSavedTag && json.send( oReq, oRes, {
                        id: oSavedTag.id,
                        name: oSavedTag.name,
                        user_id: oSavedTag.user_id
                    } )
                } )
        } )
}