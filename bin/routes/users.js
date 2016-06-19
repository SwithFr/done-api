/**
 * Created by Swith on 18/06/2016.
 */

"use strict";

var _middleware = require("../core/middleware");

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.init = function (oApp) {

  oApp.post('/users/login', require('../controllers/users/login'));
};