/**
 * done-api
 * delte
 * Created by Swith on 24/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

let json = middleware.json
let State = models.State

module.exports = ( oReq, oRes ) => {
    State
        .findById( +oReq.params.id )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oDestroyedState ) => {
            oDestroyedState && json.send( oReq, oRes, {
                id: oDestroyedState.id,
                deleted: true
            } )
        } )
}