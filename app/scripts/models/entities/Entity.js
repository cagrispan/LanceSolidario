(function (angular) {
    'use strict';

    /* jshint -W074 */ //This function's cyclomatic complexity is too high.
    angular.module('entity', []).factory('Entity', ['$log', function ($log) {

        function Entity() {
        }

        Entity.prototype._get = function () {
            var entity = {};
            for (var ix in this) {
                if (this.hasOwnProperty(ix) && ix.substr(0, 1) !== '_') {
                    entity[ix] = angular.copy(this[ix]);
                }
            }
            return entity;
        };

        Entity.prototype._set = function (data) {
            for (var ix in this) {
                if (data && this.hasOwnProperty(ix)) {
                    if (data[ix] !== undefined) {
                        this[ix] = data[ix];
                    } else if (this._map && data[this._map[ix]] !== undefined) {
                        this[ix] = data[this._map[ix]];
                    }
                }
            }
            return this;
        };

        Entity.prototype._reset = function () {
            var clean = new this.constructor();
            this._set(clean._get());
            return this;
        };

        /**
         *
         * @param {[]} fields - The fields we want
         * @param {boolean} [lax] - If true, ignore missing fields
         * @return {{}}
         * @private
         */
        Entity.prototype._getFields = function (fields, lax) {
            var data = this._get();
            var entity = {};
            for (var ix in fields) {
                var field = fields[ix];
                var def = null;
                var dName = field;

                if (Array.isArray(field)) {
                    def = field[1];
                    dName = field[2] || field[0];
                    field = field[0];

                }

                var fieldData = recursiveGet(data, field, def);

                if (!lax && (fieldData === null || fieldData === undefined)) {
                    $log.error('Mandatory field missing: ' + field, data);
                    throw new Error('Mandatory field missing: ' + field + ' - ' + def);
                } else {
                    entity[dName] = fieldData;
                }

            }
            return entity;
        };

        Entity.prototype.toUpperFields = function (obj, fieldsArray) {
            for (var x in fieldsArray) {
                obj[fieldsArray[x]] = angular.uppercase(obj[fieldsArray[x]]);
            }
        };

        function recursiveGet(obj, name, def) {

            var splitName = name.split('.');

            if (obj[name] !== undefined && obj[name] !== null) {

                return obj[name];

            } else if (splitName.length > 1 && obj[splitName[0]]) {

                obj = obj[splitName[0]];
                splitName.shift();

                return recursiveGet(obj, splitName.join('.'), def);

            } else {

                return def;

            }
        }

        return Entity;
    }]);
})(angular);
