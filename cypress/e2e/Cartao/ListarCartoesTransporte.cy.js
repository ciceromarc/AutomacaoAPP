/// <reference types="cypress" />
import * as Cartao from '../../integration/services/Cartao/requests/GET_Cartao.request';

describe('[CARTÕES] Listar cartões de transporte', () => {

    beforeEach(() => {
        cy.ObterTokenCartaoTransporte();
        cy.fixture('cartoes').as('cartoes');
    });

    it('Listar Cartões Físicos com Sucesso', function () {
        const data = this.cartoes.fisico_sucesso;

        Cartao.CartaoTransporteusuario(data.tipoCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.not.empty;

            response.body.forEach(cartao => {
                expect(cartao).to.have.all.keys(
                    'operadora',
                    'apelidoCartao',
                    'numeroCartao',
                    'tipoCartao',
                    'status'
                );
            });

            cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
        });
    });



    it('Erro ao Listar Cartões Físicos', function () {
        const data = this.cartoes.fisico_erro;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.be.oneOf(data.expectedStatus);
            expect(response.body).to.have.any.keys('error', 'message');
            cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
        });
    });

    it('Listar Cartões Virtuais com Sucesso', function () {
        const data = this.cartoes.virtual_sucesso;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.not.empty;

            response.body.forEach(cartao => {
                expect(cartao).to.have.all.keys(
                    'operadora',
                    'apelidoCartao',
                    'numeroCartao',
                    'tipoCartao',
                    'status'
                );
                expect(cartao.tipoCartao).to.eq('VIRTUAL');
            });

            cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
        });
    });

    it('Listar Cartões Virtuais sem Resultados', function () {
        const data = this.cartoes.virtual_vazio;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.empty;
            cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
        });
    });

    it('Erro ao Listar Cartões Virtuais', function () {
        const data = this.cartoes.virtual_erro;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.be.oneOf(data.expectedStatus);
            expect(response.body).to.have.any.keys('error', 'message');
            cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
        });
    });


    it('Listar Cartões Inativos com Sucesso', function () {
        const data = this.cartoes.inativo_sucesso;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.not.empty;

            response.body.forEach(cartao => {
                expect(cartao).to.have.all.keys(
                    'operadora',
                    'apelidoCartao',
                    'numeroCartao',
                    'tipoCartao',
                    'status'
                );
                expect(cartao.status).to.eq('INATIVO');
            });

            cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
        });
    });

    it('Listar Cartões Inativos sem Resultados', function () {
        const data = this.cartoes.inativo_vazio;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.empty;
            cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
        });
    });


    it('Erro ao Listar Cartões Inativos', function () {
        const data = this.cartoes.inativo_erro;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.be.oneOf(data.expectedStatus);
            expect(response.body).to.have.any.keys('error', 'message');
            cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
        });
    });

    it('Listar Todos os Cartões (sem filtros)', function () {
        Cartao.CartaoTransporteusuario().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');

            response.body.forEach(cartao => {
                expect(cartao).to.have.all.keys(
                    'operadora',
                    'apelidoCartao',
                    'numeroCartao',
                    'tipoCartao',
                    'status'
                );
            });

            cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
        });
    });



});