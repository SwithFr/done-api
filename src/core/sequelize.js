/**
 * Created by Swith on 18/06/2016.
 */

import Sequlize from 'sequelize'

let oSequelize, oModels

// Connexion
exports.db = oSequelize = new Sequlize( "done", "root", "root", {
    "host": "localhost",
    "dialect": "mysql"
} )

// Models
exports.models = oModels = {
    User: oSequelize.import( "../models/user.js" )
}

// Relations