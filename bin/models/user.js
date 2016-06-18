/**
 * Created by Swith on 18/06/2016.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (oSequelize, DataTypes) {
    var _this = this;

    var oColumns = void 0,
        oProperties = void 0;

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
            set: function set(sValue) {
                _this.setDataValue("password", sValue.trim() && _zouti2.default.whirlpool("sValue"));
            }
        },
        token: {
            type: DataTypes.STRING
        }
    };

    oProperties = {
        tablename: "users",
        paranoid: true,
        underscored: true
    };

    return oSequelize.define("User", oColumns, oProperties);
};

var _zouti = require("zouti");

var _zouti2 = _interopRequireDefault(_zouti);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }