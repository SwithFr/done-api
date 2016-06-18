/**
 * Created by Swith on 18/06/2016.
 */

"use strict";

var _sequelize = require('./sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _zouti = require('zouti');

var _zouti2 = _interopRequireDefault(_zouti);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sequelize2.default.db.options.logging = false;

_zouti2.default.log("connect to database", "done:API", _zouti2.default.GREEN);
_zouti2.default.bench("done:db");

_sequelize2.default.db.sync({
    force: true
}).catch(function (oError) {
    _zouti2.default.log(oError, "done:db:connect", _zouti2.default.ERROR);
    _zouti2.default.bench("done:db");
    process.exit(1);
}).then(function () {
    _zouti2.default.bench("done:db");
    _sequelize2.default.db.options.logging = console.log;
});