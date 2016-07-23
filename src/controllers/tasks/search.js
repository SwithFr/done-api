/**
 * done-api
 * search
 * Created by Swith on 23/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

let json = middleware.json
let Task = models.Task
let User = models.User
let State = models.State
let Tag = models.Tag

module.exports = ( oReq, oRes ) => {
    Task
        .findAll( {
            include: [
                { model: User },
                { model: State },
                { model: Tag }
            ],
            where: {
                $or: [
                    {
                        title: {
                            $like: '%' + oReq.body.query + '%'
                        }
                    },
                    {
                        note: {
                            $like: '%' + oReq.body.query + '%'
                        }
                    }
                ]
            }
        } )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oTasks ) => {
            if ( !oTasks ) {
                return json.error( oReq, oRes, {
                    type: 'NO_TASKS_FOUND',
                    message: 'Sorry but there are no task matching that query'
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
                    },
                    tags: oTask.Tags.map( ( oTag ) => {
                        return {
                            id: oTag.id,
                            name: oTag.name
                        }
                    } )
                }
            } ) )
        } )
}