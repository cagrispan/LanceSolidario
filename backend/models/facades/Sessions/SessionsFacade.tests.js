'use strict';

var expect = require('chai').expect;
describe('Sessoes', function () {

  var SessionsFacade = require('./SessionsFacade');

  it('should insert a record on database', function (done) {
    var sessao = {
      CPF: '12345678910',
      Password: 'senha'
    };
    SessionsFacade.create(sessao)
      .then(function (data) {
        return data.Token;
      })
      .then(SessionsFacade.removeByToken)
      .then(function (data) {
        expect(data).to.equal(1);
        done();
      }, function () {
        expect(false).to.equal(true);
        done();
      });
  });

  it('should update a record on database', function (done) {

    var sessao = {
      CPF: '22345678910',
      Password: 'senha'
    };

    var update = {
      Password: 'senha123'
    };

    var token = '';

    SessionsFacade.create(sessao)
      .then(function (data) {
        token = data.Token;
      })
      .then(SessionsFacade.update.bind(null, update, {Token: token}))
      .then(function (data) {
        expect(data).to.equal(1);
      }, function () {
        expect(false).to.equal(true);
      })
      .then(SessionsFacade.removeByToken.bind(null, token))
      .then(function () {
        done();
      }, function () {
        done();
      });
  });

  it('isValid should return a resolved promise', function (done) {

    var sessao = {
      CPF: '42345678910',
      Password: 'senha'
    };
    var token = '';
    SessionsFacade.create(sessao)
      .then(function (data) {
        token = data.Token;
        return data.Token;
      })
      .then(SessionsFacade.isValidByToken)
      .then(function (data) {
        expect(data).to.equal(true);
      }, function () {
        expect(false).to.equal(true);
      })
      .then(SessionsFacade.removeByToken.bind(null, token))
      .then(function () {
        done();
      }, function () {
        done();
      });
  });

  it('isValid should return a rejected promise', function (done) {

    var sessao = {
      CPF: '42345678910',
      Password: 'senha'
    };
    var update = {
      UltimoLogin: new Date(new Date() - (30 * 60 * 60 * 1000))
    };
    var token = '';

    SessionsFacade.create(sessao)
      .then(function (data) {
        token = data.Token;
      })
      .then(SessionsFacade.update.bind(null, update, {CPF: sessao.CPF}))
      .then(SessionsFacade.isValidByToken.bind(null, token))
      .then(function () {
        expect(false).to.equal(true);
      }, function (err) {
        expect(err).to.equal('invalid session');
      })
      .then(SessionsFacade.removeByToken.bind(null, token))
      .then(function () {
        done();
      }, function () {
        done();
      });
  });

  it('revalidateByCPF should update the session', function (done) {

    var sessao = {
      CPF: '72345678910',
      Password: 'senha'
    };
    var update = {
      UltimoLogin: new Date(new Date() - (30 * 60 * 60 * 1000))
    };
    var token = '';

    SessionsFacade.create(sessao)
      .then(function (data) {
        token = data.Token;
      })
      .then(SessionsFacade.update.bind(null, update, {CPF: sessao.CPF}))
      .then(SessionsFacade.isValidByToken.bind(null, token))
      .then(function () {
        expect(false).to.equal(true);
      }, function (err) {
        expect(err).to.equal('invalid session');
      })
      .then(SessionsFacade.revalidateByToken.bind(null, token))
      .then(function (data) {
        expect(data).to.equal(1);
      }, function () {
        expect(false).to.equal(true);
      })
      .then(SessionsFacade.removeByToken.bind(null, token))
      .then(function () {
        done();
      }, function (err) {
        console.log(token);
        console.log(err);
        done();
      });
  });
});