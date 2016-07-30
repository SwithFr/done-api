/**
 * done-api
 * Global
 * Created by Swith on 30/07/2016.
 */

"use strict"

exports.Saver = ( oData, fOnError, fOnSuccess ) => {
    oData
        .save()
        .catch( ( oError ) => {
            return fOnError( oError )
        } )
        .then( ( oSavedData ) => {
            return fOnSuccess( oSavedData )
        } )
}