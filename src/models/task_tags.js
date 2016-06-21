/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

module.exports = function( oSequelize, DataTypes ) {
    let oColumns, oProperties

    oColumns = {
        tag_id: {
            type: DataTypes.INTEGER
        }
    }

    oProperties = {
        tablename: "task_tags",
        paranoid: true,
        underscored: true
    }

    return oSequelize.define( 'TaskTags', oColumns, oProperties )
}