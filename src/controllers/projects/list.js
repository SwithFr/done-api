/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import zouti from 'zouti'
import { models } from "../../core/sequelize"

let json = middleware.json
let Project = models.Project
let User = models.User

module.exports = function( oReq, oRes ) {
    Project
        .findAll( {
            include: [
                { model: User },
            ],
            where: {
                user_id: +oReq.headers.userid
            },
            order: 'updated_at DESC'
        } )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oProjects ) => {
            if ( !oProjects ) {
                return json.error( oReq, oRes, {
                    type: 'NO_PROJECTS_FOUND',
                    message: 'Sorry but there are no project here'
                }, 404 )
            }

            return json.send( oReq, oRes, oProjects.map( ( oProject ) => {
                return {
                    id: oProject.id,
                    name: oProject.name,
                    user: {
                        id: oProject.User.id,
                        login: oProject.User.login
                    }
                }
            } ) )
        } )
}