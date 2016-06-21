/**
 * done-api
 * Created by Swith on 21/06/2016.
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
        tablename: "State",
        paranoid: true,
        underscored: true
    }

    return oSequelize.define( "State", oColumns, oProperties )
}