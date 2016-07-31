/**
 * done-api
 * show
 * Created by Swith on 31/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

let json = middleware.json
let Task = models.Task

module.exports = function( oReq, oRes ) {
    console.log('okkkkkk');
    Task
        .findById( +oReq.params.id )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oTask ) => {
            if ( !oTask ) {
                return json.error( oReq, oRes, {
                    type: 'NO_TASK_FOUND',
                    message: 'Sorry but there are no task here'
                }, 404 )
            }

            return json.send( oReq, oRes, oTask )
        } )
}