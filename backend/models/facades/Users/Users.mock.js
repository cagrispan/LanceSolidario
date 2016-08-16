var q = require("q");
var sinon = require("sinon");

function UserMock() {
    this.facebookId = null;
    this.email = null;
    this.telephone = null;
    this.address = null;
    this.birthday = null;
    this.name = null;
    this.token = null;
    this.createOrUpdate = sinon.spy(function () {
        if (this.facebookId && this.email && this.telephone && this.address && this.birthday && this.name && this.token) {
            return q.when({dataValues: {id: 1}});
        } else {
            return q.reject();
        }
    });
}

module.exports = UserMock;