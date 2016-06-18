/**
 * Created by Swith on 18/06/2016.
 */

"use strict";

var _zouti = require("zouti");

var _zouti2 = _interopRequireDefault(_zouti);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_zouti2.default.clearConsole();
_zouti2.default.log("Lunching...", "done:API", _zouti2.default.GREEN);
_zouti2.default.bench("done:API");

require("./core/sequelize");
require("./core/express");
require("./core/connect");

_zouti2.default.bench("done:API");