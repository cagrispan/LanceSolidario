'use strict';

var expect = require('chai').expect;

describe('UsuarioPF Tests', function () {

  var CPF = require("cpf_cnpj").CPF;

  var usuarioPFFacade = require('./UsersFacade');
  var usuarioPFInfos = {
    Usuario: 'Usuario foobar',
    CPFConsumidor: CPF.generate(),
    DataNascConsumidor: Date.now(),
    NomeConsumidor: 'Consumidor foobar',
    Sexo: 'F',
    CEPConsumidor: '99999-999',
    UFConsumidor: 'PR',
    CidadeConsumidor: 'Curitiba',
    BairroConsumidor: 'Pinheirinho',
    TipoLogradouroConsumidor: 'Tipo Logradouro foobar',
    LogradouroConsumidor: 'Logradouro foobar',
    NrEnderConsumidor: '123ABC',
    ComplEnderConsumidor: 'Complemento foobar',
    DDDCelular: 12,
    FoneCelular: 12345678,
    DDDFixo: 12,
    FoneFixo: 12345678,
    EmailConsumidor: 'test@gmail.com',
    AceitaMaterialInformativo: 's',
    AceitaUsodosDados: 's',
    AceitaCorreio: 's',
    AceitaFone: 's',
    AceitaSMS: 's',
    AceitaEmail: 's',
    ControlePSW: 'controle-foobar'
  };

  var usuarioPFInfosToUpdate = {
    Usuario: 'abc123 updated',
    NomeConsumidor: 'abc 123 updated'
  };

  it('should insert a record on database', function (done) {
    usuarioPFFacade.create(usuarioPFInfos).then(function (itemInserted) {
        expect(itemInserted.dataValues.Usuario).to.equal(usuarioPFInfos.Usuario);
        usuarioPFInfos = itemInserted.dataValues;
        done();
      })
      .catch(function () {
        expect(true).to.equal(false);
        done();
      });
  });

  it('should not insert a record on database: validation error', function (done) {
    usuarioPFFacade.create({}).then(function () {
        expect(true).to.equal(false);
        done();
      })
      .catch(function (err) {
        expect(err.name).to.equal('SequelizeValidationError');
        done();
      });
  });

  it('should not insert a record on database: invalid field type', function (done) {
    var usuarioPFInfosInvalid = Object.assign({}, usuarioPFInfos);
    usuarioPFInfosInvalid.CPFConsumidor = new Date();

    usuarioPFFacade.create(usuarioPFInfosInvalid).then(function () {
        expect(true).to.equal(false);
        done();
      })
      .catch(function (err) {
        expect(err.name).to.equal('SequelizeValidationError');
        expect(err.message).to.equal('string violation: CPFConsumidor cannot be an array or an object');
        done();
      });
  });

  it('should update a record on database', function (done) {
    usuarioPFFacade.update(usuarioPFInfosToUpdate, {CPFConsumidor: usuarioPFInfos.CPFConsumidor})
      .then(function (affectedRows) {
        expect(affectedRows[0]).to.equal(1);
        usuarioPFInfos.Usuario = usuarioPFInfosToUpdate.Usuario;
        usuarioPFInfos.NomeConsumidor = usuarioPFInfosToUpdate.NomeConsumidor;
        done();
      })
      .catch(function () {
        expect(true).to.equal(false);
        done();
      });
  });

  it('should not update a record on database: record not found', function (done) {
    usuarioPFFacade.update(usuarioPFInfosToUpdate, {CPFConsumidor: '0'}).then(function (affectedRows) {
        expect(affectedRows[0]).to.equal(0);
        done();
      })
      .catch(function () {
        expect(true).to.equal(false);
        done();
      });
  });

  it('should get a record on database', function (done) {
    usuarioPFFacade.get({CPFConsumidor: usuarioPFInfos.CPFConsumidor}).then(function (result) {
        expect(result[0].Id).to.equal(usuarioPFInfos.Id);
        done();
      })
      .catch(function () {
        expect(true).to.equal(false);
        done();
      });
  });

  it('should not get a record on database: record not found', function (done) {
    usuarioPFFacade.get({CPFConsumidor: '0'}).then(function (result) {
        expect(result).to.be.empty;
        done();
      })
      .catch(function () {
        expect(true).to.equal(false);
        done();
      });
  });

  it('should get a record by CPFConsumidor on database', function (done) {
    usuarioPFFacade.getByCpf(usuarioPFInfos.CPFConsumidor).then(function (result) {
        expect(result[0].CPFConsumidor).to.not.empty;
        done();
      })
      .catch(function () {
        expect(true).to.equal(false);
        done();
      });
  });
});