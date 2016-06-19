/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import zouti from 'zouti'
import { models } from "../../core/sequelize"

let json = middleware.json
let Project = models.Project

module.exports = function( oReq, oRes ) {
    let oProject = Project.build()

    let sName = ( oReq.body.name || '' ).trim()

    if ( !sName ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_PARAMS',
            message: 'You must provide a non empty name'
        }, 400 )
    }

    oProject.name = sName
    oProject.user_id = +oReq.headers.userid

    oProject
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
                .then( function( oSavedProject ) {
                    oSavedProject && json.send( oReq, oRes, {
                        id: oSavedProject.id,
                        name: oSavedProject.name,
                        user_id: oSavedProject.user_id
                    } )
                } )
        } )
}