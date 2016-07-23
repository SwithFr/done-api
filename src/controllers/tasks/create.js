/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

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

const createTask = ( oTaskData, aTags = null ) => {
    let oTask = Task.build( oTaskData )

    oTask
        .validate()
        .then( ( oValidationReport ) => {
            if( oValidationReport ) {
                return json.error( glob.req, glob.res, oValidationReport.errors, 400 )
            }

            oTask
                .save()
                .catch( ( oError ) => {
                    return json.error( glob.req, glob.res, oError, 500 )
                } )
                .then( ( oSavedTask ) => {
                    if ( aTags ) {
                        oSavedTask.setTags( aTags ).then( () => {
                            return send( oSavedTask, aTags )
                        } )
                    } else {
                        return send( oSavedTask )
                    }
                } )
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

let glob = {}

module.exports = function( oReq, oRes ) {
    glob.req = oReq
    glob.res = oRes

    let oTaskData = {
        title: ( oReq.body.title || '' ).trim(),
        note: ( oReq.body.note || '' ).trim(),
        aTagsId: oReq.body.tag_id || null,
        user_id: +oReq.headers.userid,
        state_id: +oReq.body.state_id || null,
        project_id: +oReq.body.project_id
    }

    if ( !oTaskData.title ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_PARAMS',
            message: 'You must provide a non empty title'
        }, 400 )
    }

    if ( oTaskData.aTagsId ) {
        getTags( oTaskData, createTask  )
    } else {
        createTask( oTaskData )
    }
}