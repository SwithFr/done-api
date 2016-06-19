/**
 * Created by Swith on 19/06/2016.
 */

"use strict";

var _sequelize = require("./sequelize");

var _zouti = require("zouti");

var _zouti2 = _interopRequireDefault(_zouti);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _sequelize.models.User;
var _json = void 0,
    _log = void 0;

exports.log = function (oReq, oRes, next) {
    var sDate = new Date().toTimeString();

    _zouti2.default.log("(" + sDate + ") - [" + oReq.method + "] - " + oReq.url, "done:api", _zouti2.default.BLUE);
    next();
};

exports.json = _json = {
    send: function send(oReq, oRes, mData, iStatusCode) {
        oRes.status(iStatusCode || 200).json({
            "url": "[" + oReq.method + "] - " + oReq.url,
            "status": iStatusCode || 200,
            "error": false,
            "data": mData
        });
    },
    error: function error(oReq, oRes, oError, iStatusCode) {
        oRes.status(iStatusCode || 500).json({
            "url": "[" + oReq.method + "] - " + oReq.url,
            "status": iStatusCode || 500,
            "error": oError,
            "data": null
        });
    }
};

exports.isAuthenticated = function (oReq, oRes, next) {
    var iUserId = +oReq.headers.userid;
    var sUserToken = oReq.headers.usertoken;

    if (!iUserId || !sUserToken) {
        return _json.error(oReq, oRes, {
            type: 'UNAUTHORIZED',
            message: 'You must be logged in in order to use this API'
        }, 401);
    }

    User.findById(iUserId).then(function (oUser) {
        if (oUser && oUser.token === sUserToken) {
            oRes.locals.user = oUser;
            next();
        } else {
            return _json.error(oReq, oRes, {
                type: 'INVALID_TOKEN',
                message: 'Your token was expired'
            }, 401);
        }
    });
};