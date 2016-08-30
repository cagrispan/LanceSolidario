var q = require("q");
var sinon = require("sinon");

function UserMock() {
    this.facebookId = null;
    this.email = null;
    this.telephone = null;
    this.address = null;
    this.birthday = null;
    this.name = null;
    this.facebookToken = null;
    this.token = null;
    this.createOrUpdate = sinon.spy(function () {
        if (this.facebookId && this.email && this.telephone && this.address && this.birthday && this.name && this.facebookToken) {
            return q.when({dataValues: {id: 1}});
        } else {
            return q.reject();
        }
    });

    this.facebookLogin = sinon.spy(function () {
        return q.when({dataValues: {token: 1}});
    });
}

module.exports = UserMock;