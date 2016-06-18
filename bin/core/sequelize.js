"use strict";

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oSequelize = void 0,
    oModels = void 0;

// Connexion
/**
 * Created by Swith on 18/06/2016.
 */

exports.db = oSequelize = new _sequelize2.default("done", "root", "root", {
    "host": "localhost",
    "dialect": "mysql"
});

// Models
exports.models = oModels = {
    "User": oSequelize.import("../models/user.js")
};

// Relations