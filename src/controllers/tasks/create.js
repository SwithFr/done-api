/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import zouti from 'zouti'
import { models } from "../../core/sequelize"

let json = middleware.json
let Task = models.Task

module.exports = function( oReq, oRes ) {
    let oTask = Task.build()

    let sTitle = ( oReq.body.title || '' ).trim()
    let sNote = ( oReq.body.note || '' ).trim()

    if ( !sTitle ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_PARAMS',
            message: 'You must provide a non empty title'
        }, 400 )
    }

    oTask.title = sTitle
    oTask.note = sNote
    oTask.user_id = +oReq.headers.userid
    oTask.project_id = +oReq.params.projectId

    oTask
        .validate()
        .then( function( oValidationReport ) {
            if( oValidationReport ) {
                return json.error( oReq, oRes, oValidationReport.errors, 400 )
            }

            oTask
                .save()
                .catch( function( oError ) {
                    return json.error( oReq, oRes, oError, 500 )
                } )
                .then( function( oSavedTask ) {
                    oSavedTask && json.send( oReq, oRes, {
                        id: oSavedTask.id,
                        title: oSavedTask.title,
                        user_id: oSavedTask.user_id,
                        project_id: oSavedTask.project_id
                    } )
                } )
        } )
}