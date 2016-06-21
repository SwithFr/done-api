/**
 * done-api
 * Created by Swith on 20/06/2016.
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
        tablename: "tags",
        paranoid: true,
        underscored: true
    }

    return oSequelize.define( "Tags", oColumns, oProperties )
}