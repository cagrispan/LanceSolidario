'use strict';

var userEntity = require('../../entities/User');
var addressEntity = require('../../entities/Address');
var contactEntity = require('../../entities/Contact');

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

    this.createOrUpdate = function () {
        var userFacade = this;
        var obj = null;

        return userEntity.findOrCreate({where: {facebookId: userFacade.facebookId}, defaults: userFacade})
            .spread(function (resolution, created) {
                userEntity = resolution;
                if (created) {
                    obj = created;
                }
            }).then(function () {
                return userEntity.getAddresses({
                    where: {
                        street: userFacade.address.street,
                        number: userFacade.address.number,
                        complement: userFacade.address.complement,
                        neighborhood: userFacade.address.neighborhood,
                        city: userFacade.address.city,
                        state: userFacade.address.state
                    }
                });
            })
            .then(function (existedAddress) {
                if (existedAddress.length > 0) {
                    return userEntity.addAddress(existedAddress[0].dataValues.id);
                } else {
                    return userEntity.createAddress(userFacade.address)
                }
            })
            .then(function () {
                return userEntity.getContacts({
                    where: {
                        email: userFacade.email,
                        telephone: userFacade.telephone
                    }
                });
            })
            .then(function (existedContact) {
                if (existedContact.length > 0) {
                    return userEntity.addContact(existedContact[0].dataValues.id);
                } else {
                    return userEntity.createContact({email: userFacade.email, telephone: userFacade.telephone});
                }
            }).then(function () {
                return userEntity.update(userFacade, {where: {facebookId: userFacade.facebookId}});
            }).catch(function (err) {
                console.log(err);
            });
    }
}

UserFacade.constructor = UserFacade;
module.exports = UserFacade;