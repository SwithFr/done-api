/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

module.exports = function( oSequelize, DataTypes ) {
    let oColumns, oProperties

    oColumns = {
        project_id: {
            type: DataTypes.INTEGER
        }
    }

    oProperties = {
        tablename: "user_projects",
        paranoid: true,
        underscored: true
    }

    return oSequelize.define( 'UserProjects', oColumns, oProperties )
}