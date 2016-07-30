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
let Task = models.Task
let Tag = models.Tag

const getTags = ( oTaskData, fNext ) => {
    Tag.findAll( {
        where: {
            user_id: 1,
            id: {
                $in: oTaskData.aTagsId
            }
        }
    } ).then( ( oTags ) => {
        fNext( oTaskData, oTags )
    } )
}

const updateTask = ( oTaskData, aTags = null ) => {
    Saver( oTaskData, ( oError ) => {
        return json.error( glob.req, glob.res, oError, 500 )
    }, ( oSavedUpdatedTask ) => {
        if ( aTags ) {
            oSavedUpdatedTask.setTags( aTags ).then( () => {
                return send( oSavedUpdatedTask, aTags )
            } )
        } else {
            return send( oSavedUpdatedTask )
        }
    } )
}

const send = ( oSavedTask, aTags = [] ) => {
    return json.send( glob.req, glob.res, {
        id: oSavedTask.id,
        title: oSavedTask.title,
        user_id: oSavedTask.user_id,
        project_id: oSavedTask.project_id,
        tags: aTags
    } )
}

const getNewTaskData = () => {
    return {
        title: ( glob.req.body.title || '' ).trim(),
        note: ( glob.req.body.note || '' ).trim(),
        aTagsId: glob.req.body.tag_id || null,
        state_id: +glob.req.body.state_id || null,
        due_to: glob.req.body.due_to || null,
        project_id: +glob.req.body.project_id
    }
}

let glob = {}

module.exports = function( oReq, oRes ) {
    glob.req = oReq
    glob.res = oRes

    Task
        .findById( +oReq.params.id )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oTask ) => {
            if ( !oTask ) {
                return json.error( oReq, oRes, {
                    type: 'TASK_NOT_FOUND',
                    message: 'Task not found'
                }, 404 )
            }

            const oNewTaskData = getNewTaskData()

            if ( !oNewTaskData.title ) {
                return json.error( oReq, oRes, {
                    type: 'EMPTY_PARAMS',
                    message: 'You must provide a non empty title'
                }, 400 )
            }

            oTask.title = oNewTaskData.title
            oTask.note = oNewTaskData.note
            oTask.aTagsId = oNewTaskData.aTagsId
            oTask.state_id = oNewTaskData.state_id
            oTask.due_to = oNewTaskData.due_to
            oTask.project_id = oNewTaskData.project_id

            if ( oTask.aTagsId ) {
                getTags( oTask, updateTask  )
            } else {
                updateTask( oTask )
            }
        } )
}