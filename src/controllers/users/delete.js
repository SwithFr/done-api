/**
 * done-api
 * Created by Swith on 16/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

let json = middleware.json
let User = models.User
let Project = models.Project

const deleteUserProjects = ( user_id ) => {
    Project
        .findOne( {
            where: {
                'user_id': user_id
            }
        } )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oProject ) => {
            if ( !oProject ) {
                return
            } else {
                oProject.destroy()
            }
        } )

}

module.exports = ( oReq, oRes ) => {

    let user_id = oReq.params.id || null;

    if ( !user_id ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_REQ_PARAMS',
            message: 'You must provide a valid user id'
        }, 400 )
    } else {
        User
            .findOne( {
                where: {
                    'id': user_id
                }
            } )
            .catch( ( oError ) => {
                return json.error( oReq, oRes, oError, 500 )
            } )
            .then( ( oUser ) => {
                if ( !oUser ) {
                    return json.error( oReq, oRes, {
                        type: 'USER_NOT_FOUND',
                        message: 'Sorry this user doesn‘t exist'
                    }, 404 )
                }

                deleteUserProjects( user_id )

                oUser
                    .destroy()
                    .then( () => {
                        return json.send( oReq, oRes, {
                            id: user_id,
                            deleted: true
                        } )
                    } )
            } )
    }

}