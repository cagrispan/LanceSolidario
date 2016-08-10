'use strict';
// var User  = require('../../models/entities/User');
var pag, pagseguro;
pagseguro = require('pagseguro');
pag = new pagseguro({
    email: 'brunofaczz2@gmail.com',
    token: 'A1989D4C3F044A83B1C03B0332DBB071'
});

function PaymentsController() {
    this.get = function (req, res) {
    };

    this.add = function (req, res) {
        //Inicializar a função com o e-mail e token


        //Configurando a moeda e a referência do pedido
        pag.currency('BRL');
        pag.reference('12345');

        //Adicionando itens
        pag.addItem({
            id: 1,
            description: 'Descrição do primeiro produto',
            amount: "4230.00",
            quantity: 3,
            weight: 2342
        });

        //Configurando a entrega do pedido

        pag.shipping({
            type: 1,
            street: 'Rua Alameda dos Anjos',
            number: '367',
            complement: 'Apto 307',
            district: 'Parque da Lagoa',
            postalCode: '01452002',
            city: 'São Paulo',
            state: 'RS',
            country: 'BRA'
        });

        //Configuranto URLs de retorno e de notificação (Opcional)
        //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
        pag.setRedirectURL("http://www.lojamodelo.com.br/retorno");
        pag.setNotificationURL("http://www.lojamodelo.com.br/notificacao");

        //Enviando o xml ao pagseguro
        pag.send(function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log(res);
        });
    };

    this.update = function (req, res) {
        var user = new User();
        user.cpf = '1234';
        user.update('12345');
    };

    this.getSpecific = function (req, res) {
        var user = new User();
        user.cpf = '1234';
        user.get().then(function (data) {
            console.log(data.dataValues);
        });
    };

    this.remove = function (req, res) {
        var user = new User();
        user.cpf = '1234';
        user.destroy().then(function (data) {
            console.log('deu');
        });
    };
}

PaymentsController.constructor = PaymentsController;
module.exports = PaymentsController;
