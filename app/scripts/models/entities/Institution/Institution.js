/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.institution.institution', ['lanceSolidario.institution.institutionResource'])
        .factory('Institution', ['institutionResource', 'Entity', function (institutionResource, Entity) {

            angular.extend(Institution.prototype, Entity.prototype);
            Institution.prototype.constructor = Institution;

            function Institution() {

                this.institutionId = null;
                this.name = null;
                this.email = null;
                this.about = null;
                this.logo = null;
                this.responsible = null;
                this.telephone = null;
                this.state = null;
                this.city = null;
                this.page = null;

                /*
                 Methods
                 */
                this._load = function () {
                    var institution = this;
                    return institutionResource.load(institution)
                        .then(function (result) {
                            institution._set(result);
                        });
                };

            }

            Institution._listAll = function () {
                var institutionListToReturn = [];

                return institutionResource.loadAll().then(function (response) {
                    var institutionList = [];

                    if (response.institutions) {
                        institutionList = response.institutions;
                    }

                    if (institutionList && institutionList[0]) {
                        var institution;
                        for (var i in institutionList) {
                            institution = new Institution();
                            institution._set(institutionList[i]);
                            institutionListToReturn.push(institution);
                        }
                    }
                    return institutionListToReturn;
                });
            };

            return Institution;
        }]);
})(angular);

