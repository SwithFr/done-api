/**
 * done-api
 * update
 * Created by Swith on 30/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"
import { Saver } from "../../models/global"

let json = middleware.json
let Tag = models.Tag

module.exports = ( oReq, oRes ) => {
    let sName = ( oReq.body.name || '' ).trim()

    if ( !sName ) {
        return json.error( oReq, oRes, {
            type: 'EMPTY_PARAMS',
            message: 'You must provide a non empty name'
        }, 400 )
    }

    Tag
        .findById( +oReq.params.id )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oUpdatedTag ) => {
            if ( !oUpdatedTag ) {
                return json.error( oReq, oRes, {
                    type: 'TAG_NOT_FOUND',
                    message: 'Tag not found'
                }, 404 )
            }

            oUpdatedTag.name = sName

            Saver( oUpdatedTag, ( oError ) => {
                return json.error( oReq, oRes, oError, 500 )
            }, ( oSavedUpdatedTag ) => {
                return json.send( oReq, oRes, oSavedUpdatedTag )
            } )
        } )
}