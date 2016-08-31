var q = require("q");
var sinon = require("sinon");

function ProductMock() {
    this.title = null;
    this.description = null;
    this.category = null;
    this.tags = null;
    this.isUsed = null;
    this.images = null;
    this.auctions = null;
    this.buyerUser = null;
    this.donorUser = null;

    this.create = sinon.spy(function () {
        if(this.title){
            return q.when({dataValues: {id: 1}})
        } else {
            return q.reject();
        }
    });

}

module.exports = ProductMock;