'use strict';

var userEntity = require('../../entities/User');
var addressEntity = require('../../entities/Address');
var contactEntity = require('../../entities/Contact');
var clone = require('clone');
var jwt = require('jsonwebtoken');
var q = require('q');

userEntity.hasMany(addressEntity);
userEntity.hasMany(contactEntity);

function UserFacade() {
    this.facebookId = null;
    this.facebookToken = null;
    this.name = null;
    this.birthday = null;
    this.email = null;
    this.address = null;
    this.telephone = null;
    this.token = null;

    this.get = function () {
        var userFacade = this;

        return userEntity.findOne({where: {facebookId: userFacade.facebookId}});
    };

    this.facebookLogin = function () {
        var userFacade = this;

        if (!userFacade.address) {
            userFacade.address = {};
        }
        return userEntity.findOne({where: {facebookId: userFacade.facebookId}})
            .then(function (resolution) {
                if (resolution) {
                    userFacade.token = resolution.dataValues.token;
                    userFacade.name = resolution.dataValues.name;
                    userFacade.birthday = resolution.dataValues.birthday;
                    return userEntity.update(userFacade, {where: {facebookId: userFacade.facebookId}})
                        .then(function () {
                            return userEntity.findOne({where: {facebookId: userFacade.facebookId}});
                        });
                } else {
                    var token = jwt.sign({id: userFacade.facebookId}, 'banana', {algorithm: 'HS256'});
                    userFacade.token = token;
                    return userFacade.createOrUpdate();
                }
            });
    };

    this.createOrUpdate = function () {
        var userFacade = this;
        var userToUpdate;

        return userEntity.findOrCreate({where: {facebookId: userFacade.facebookId}, defaults: userFacade})
            .spread(function (resolution) {
                userToUpdate = resolution;
            }).then(function () {
                return userToUpdate.getAddresses();
            })
            .then(function (existedAddress) {
                if (existedAddress.length > 0) {
                    addressEntity.destroy({where:{id: existedAddress[0].dataValues.id}, truncate: true});
                    userToUpdate.removeAddress(existedAddress[0]);
                }
                return userToUpdate.createAddress(userFacade.address);
            })
            .then(function () {
                return userToUpdate.getContacts({
                    where: {
                        email: userFacade.email,
                        telephone: userFacade.telephone
                    }
                });
            })
            .then(function (existedContact) {
                if (existedContact.length > 0) {
                    contactEntity.destroy({where:{id: existedContact[0].dataValues.id}, truncate: true});
                    userToUpdate.removeContact(existedContact[0]);
                }
                return userToUpdate.createContact({telephone: userFacade.telephone, email: userFacade.email});
            }).then(function () {
                return userToUpdate.update(userFacade, {where: {facebookId: userFacade.facebookId}});
            }).catch(function (err) {
                console.log(err);
            });
    }
}

UserFacade.constructor = UserFacade;
module.exports = UserFacade;