var sinon = require("sinon");

exports.sign = sinon.spy(function (id, word, alg, callback) {
    if (id && word && alg && callback) {
        callback(null, 'tokenTest');
    }
});

exports.verify = sinon.spy(function (token, word) {
    return {id: 'teste123456'};
});