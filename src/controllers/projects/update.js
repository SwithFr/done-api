/**
 * done-api
 * update
 * Created by Swith on 30/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"
import { Saver } from "../../models/global"

let json = middleware.json
let Project = models.Project

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

            Saver( oUpdatedProject, ( oError ) => {
                return json.error( oReq, oRes, oError, 500 )
            }, ( oSavedUpdatedProject ) => {
                return json.send( oReq, oRes, oSavedUpdatedProject )
            } )
        } )
}