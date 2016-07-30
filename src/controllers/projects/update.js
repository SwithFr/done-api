/**
 * done-api
 * update
 * Created by Swith on 30/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

let json = middleware.json
let Project = models.Project

const saveUpdatedProject = ( oProjectData, onError, onSuccess ) => {
    oProjectData
        .save()
        .catch( ( oError ) => {
            return onError( oError )
        } )
        .then( ( oSavedUpdatedProject ) => {
            onSuccess( oSavedUpdatedProject )
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

    Project
        .findById( +oReq.params.id )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oUpdatedProject ) => {
            if ( !oUpdatedProject ) {
                return json.error( oReq, oRes, {
                    type: 'PROJECT_NOT_FOUND',
                    message: 'Project not found'
                }, 404 )
            }

            oUpdatedProject.name = sName

            saveUpdatedProject( oUpdatedProject, ( oError ) => {
                return json.error( oReq, oRes, oError, 500 )
            }, ( oSavedUpdatedProject ) => {
                return json.send( oReq, oRes, oSavedUpdatedProject )
            } )
        } )
}