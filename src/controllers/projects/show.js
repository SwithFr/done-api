/**
 * done-api
 * show
 * Created by Swith on 31/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

let json = middleware.json
let Project = models.Project

module.exports = function( oReq, oRes ) {
    Project
        .findById( +oReq.params.id )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oProject ) => {
            if ( !oProject ) {
                return json.error( oReq, oRes, {
                    type: 'NO_PROJECT_FOUND',
                    message: 'Sorry but there are no project here'
                }, 404 )
            }

            return json.send( oReq, oRes, oProject )
        } )
}