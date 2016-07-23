/**
 * done-api
 * list
 * Created by Swith on 23/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

let json = middleware.json
let State = models.State

module.exports = function( oReq, oRes ) {
    State
        .findAll( {
            where: {
                user_id: +oReq.headers.userid
            },
            order: 'updated_at DESC'
        } )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oStates ) => {
            if ( !oStates ) {
                return json.error( oReq, oRes, {
                    type: 'NO_STATES_FOUND',
                    message: 'Sorry but there are no sates here'
                }, 404 )
            }

            return json.send( oReq, oRes, oStates.map( ( oState ) => {
                return {
                    id: oState.id,
                    name: oState.name
                }
            } ) )
        } )
}