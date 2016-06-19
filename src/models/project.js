/**
 * done-api
 * Created by Swith on 18/06/2016.
 */

"use strict"

export default function( oSequelize, DataTypes  ) {

    let oColumns, oProperties

    oColumns = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        }
    }

    oProperties = {
        tablename: "projects",
        paranoid: true,
        underscored: true
    }

    return oSequelize.define( "Project", oColumns, oProperties )
}