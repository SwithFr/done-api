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
    User: oSequelize.import( "../models/user.js" ),
    Project: oSequelize.import( "../models/project.js" ),
    UserProjects: oSequelize.import( "../models/user_projects.js" ),
    Tag: oSequelize.import( "../models/tag.js" ),
    Task: oSequelize.import( "../models/task.js" )
}

// Relations
oModels.Project.belongsTo( oModels.User )
oModels.User.hasMany( oModels.UserProjects )
oModels.Task.belongsTo( oModels.Project )
oModels.Task.belongsTo( oModels.User )
oModels.Tag.belongsTo( oModels.User )