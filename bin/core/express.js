/**
 * Created by Swith on 18/06/2016.
 */

"use strict";

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oApp = void 0;

oApp = (0, _express2.default)();

oApp.use(_bodyParser2.default.json());
oApp.use(_bodyParser2.default.urlencoded({
  extended: true
}));

// Load routes
require("../routes/users").init(oApp);

oApp.listen(23456);