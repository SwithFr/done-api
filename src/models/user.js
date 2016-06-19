/**
 * Created by Swith on 18/06/2016.
 */

"use strict"

import zouti from 'zouti'

export default function( oSequelize, DataTypes  ) {

    let oColumns, oProperties

    oColumns = {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            set: function( sValue ) {
                this.setDataValue( "password", sValue.trim()  && zouti.whirlpool( sValue ) )
            }
        },
        token: {
            type: DataTypes.STRING
        }
    }

    oProperties = {
        tablename: "users",
        paranoid: true,
        underscored: true
    }

    return oSequelize.define( "User", oColumns, oProperties )
}