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
let TaskTag = models.TaskTags

const saveTaskTagRelation = ( iTaskId, iTagId, oReq, oRes ) => {
    let oTaskTag = TaskTag.build()

    oTaskTag.task_id = iTaskId
    oTaskTag.tag_id = iTagId

    oTaskTag
        .save()
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oSavedTaskTagRelation ) => {
            return oSavedTaskTagRelation
        })
}

module.exports = function( oReq, oRes ) {
    let oTask = Task.build()

    let sTitle = ( oReq.body.title || '' ).trim()
    let sNote = ( oReq.body.note || '' ).trim()
    let iTagId = +oReq.body.tag_id || null

    if ( !sTitle ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_PARAMS',
            message: 'You must provide a non empty title'
        }, 400 )
    }

    oTask.title = sTitle
    oTask.note = sNote
    oTask.user_id = +oReq.headers.userid
    oTask.project_id = +oReq.body.project_id

    if ( +oReq.body.state_id ) {
        oTask.state_id = +oReq.body.state_id
    }

    oTask
        .validate()
        .then( ( oValidationReport ) => {
            if( oValidationReport ) {
                return json.error( oReq, oRes, oValidationReport.errors, 400 )
            }

            oTask
                .save()
                .catch( ( oError ) => {
                    return json.error( oReq, oRes, oError, 500 )
                } )
                .then( ( oSavedTask ) => {
                    let taskTagRelation = null

                    if ( iTagId ) {
                        taskTagRelation = saveTaskTagRelation( oSavedTask.id, iTagId, oReq, oRes )
                    }

                   return json.send( oReq, oRes, {
                        id: oSavedTask.id,
                        title: oSavedTask.title,
                        user_id: oSavedTask.user_id,
                        project_id: oSavedTask.project_id,
                        tags: taskTagRelation || null
                    } )
                } )
        } )
}