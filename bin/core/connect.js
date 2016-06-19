/**
 * Created by Swith on 18/06/2016.
 */

"use strict";

var _sequelize = require('./sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _zouti = require('zouti');

var _zouti2 = _interopRequireDefault(_zouti);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fs2.default.stat('./db-sync.stub', function (oError, oStats) {
    if (oError) {
        _sequelize2.default.db.options.logging = false;

        _zouti2.default.log("connect to database", "done:API", _zouti2.default.GREEN);
        _zouti2.default.bench("done:db");

        _sequelize2.default.db.sync({
            force: true
        }).catch(function (oError) {
            _zouti2.default.log(oError, "done:db:syncing", _zouti2.default.ERROR);
            _zouti2.default.bench("done:db");
            process.exit(1);
        }).then(function () {
            _zouti2.default.bench("done:db");
            _fs2.default.writeFile("./db-sync.stub", "1", {
                encoding: "utf-8"
            });
            _sequelize2.default.db.options.logging = console.log;
        });
    }
});