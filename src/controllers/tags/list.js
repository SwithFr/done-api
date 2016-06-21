/**
 * done-api
 * Created by Swith on 20/06/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import zouti from 'zouti'
import { models } from "../../core/sequelize"

let json = middleware.json
let Tag = models.Tag
let User = models.User

module.exports = function( oReq, oRes ) {
    Tag
        .findAll( {
            include: [ {
                model: User
            } ],
            where: {
                user_id: +oReq.headers.userid
            },
            order: 'updated_at DESC'
        } )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oTags ) => {
            if ( !oTags ) {
                return json.error( oReq, oRes, {
                    type: 'NO_TAGS_FOUND',
                    message: 'Sorry but there are no tag here'
                }, 404 )
            }

            return json.send( oReq, oRes, oTags.map( ( oTag ) => {
                return {
                    id: oTag.id,
                    name: oTag.name,
                    user: {
                        id: oTag.User.id,
                        login: oTag.User.login
                    }
                }
            } ) )
        } )
}