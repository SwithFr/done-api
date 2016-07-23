/**
 * done-api
 * delete task
 * Created by Swith on 23/07/2016.
 */

"use strict"



import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

let json = middleware.json
let Task = models.Task

module.exports = function( oReq, oRes ) {

    Task
        .findOne( {
            where: {
                id: +oReq.params.id
            }
        } )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oTask ) => {
            if ( !oTask ) {
                return json.error( oReq, oRes, {
                    type: 'NO_TASK_FOUND',
                    message: 'Sorry but there are no task for this ID'
                }, 404 )
            }

            oTask
                .destroy()
                .catch( ( oError ) => {
                    return json.error( oReq, oRes, oError, 500 )
                } )
                .then( ( oDestroyedTask ) => {
                    return json.send( oReq, oRes, {
                        id: oDestroyedTask.id,
                        deleted: true
                    } )
                } )
        } )


}