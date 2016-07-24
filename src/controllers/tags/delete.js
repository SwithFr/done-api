/**
 * done-api
 * delete
 * Created by Swith on 24/07/2016.
 */

"use strict"

import middleware from "../../core/middleware"
import { models } from "../../core/sequelize"

let json = middleware.json
let Tag = models.Tag

module.exports = ( oReq, oRes ) => {
    Tag
        .findById( +oReq.params.id )
        .catch( ( oError ) => {
            return json.error( oReq, oRes, oError, 500 )
        } )
        .then( ( oDestroyedTag ) => {
            oDestroyedTag && json.send( oReq, oRes, {
                id: oDestroyedTag.id,
                deleted: true
            } )
        } )
}