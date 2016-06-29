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
let User = models.User
let State = models.State

module.exports = function( oReq, oRes ) {
    Task
        .findAll( {
            include: [ {
                model: User
            }, {
                model: State
            } ],
            where: {
                project_id: +oReq.params.projectId
            },
            order: 'updated_at DESC'
        } )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oTasks ) => {
            if ( !oTasks ) {
                return json.error( oReq, oRes, {
                    type: 'NO_TASKS_FOUND',
                    message: 'Sorry but there are no task in this project'
                }, 404 )
            }

            return json.send( oReq, oRes, oTasks.map( ( oTask ) => {
                return {
                    id: oTask.id,
                    title: oTask.title,
                    note: oTask.note,
                    created_at: oTask.created_at,
                    user: {
                        id: oTask.User.id,
                        login: oTask.User.login
                    },
                    state: {
                        id: oTask.State && oTask.State.id,
                        name: oTask.State && oTask.State.name
                    }
                }
            } ) )
        } )
}