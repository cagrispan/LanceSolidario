var sinon = require("sinon");

function JwtMock() {
    this.sign = sinon.spy(function(id, word, alg, callback) {
        if(id && word && alg && callback) {
            callback(null, 'tokenTest');
        }
    })
}

module.exports = JwtMock;