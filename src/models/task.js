/**
 * done-api
 * Created by Swith on 19/06/2016.
 */

"use strict"

export default function( oSequelize, DataTypes  ) {

    let oColumns, oProperties

    oColumns = {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dueTo: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }

    oProperties = {
        tablename: "tasks",
        paranoid: true,
        underscored: true
    }

    return oSequelize.define( "Task", oColumns, oProperties )
}