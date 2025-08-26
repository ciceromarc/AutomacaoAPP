/// <reference types="cypress" />
import * as Cartao from '../../integration/services/Cartao/requests/GET_Cartao.request';

describe('[CARTÕES] Listar cartões de transporte', () => {

    beforeEach(function () {
        cy.fixture('cartoes').as('cartoes');
                cy.ObterToken();
    });

    it('Listar Cartões Físicos com Sucesso', function () {
        const data = this.cartoes.fisico_sucesso;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.not.null;
            // expect(response.body).to.have.length.greaterThan(0);
            cy.log('Status:', response.status);
        });
    });

    it('Listar Cartões Físicos sem Resultados', function () {
        const data = this.cartoes.fisico_vazio;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

    it('Erro ao Listar Cartões Físicos', function () {
        const data = this.cartoes.fisico_erro;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.be.oneOf(data.expectedStatus);
            expect(response.body).to.have.property('error').or.property('message');
        });
    });

    it('Listar Cartões Virtuais com Sucesso', function () {
        const data = this.cartoes.virtual_sucesso;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.not.null;
        });
    });

    it('Listar Cartões Virtuais sem Resultados', function () {
        const data = this.cartoes.virtual_vazio;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

    it('Erro ao Listar Cartões Virtuais', function () {
        const data = this.cartoes.virtual_erro;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.be.oneOf(data.expectedStatus);
            expect(response.body).to.have.property('error').or.property('message');
        });
    });

    it('Listar Cartões Inativos com Sucesso', function () {
        const data = this.cartoes.inativo_sucesso;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.not.null;
        });
    });

    it('Listar Cartões Inativos sem Resultados', function () {
        const data = this.cartoes.inativo_vazio;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

    it('Erro ao Listar Cartões Inativos', function () {
        const data = this.cartoes.inativo_erro;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.be.oneOf(data.expectedStatus);
            expect(response.body).to.have.property('error').or.property('message');
        });
    });

    it('Acesso a Funcionalidades de Ação (Recarregar, Detalhes)', function () {
        const data = this.cartoes.com_acoes;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.not.null;

            response.body.forEach(cartao => {
                expect(cartao).to.haveOwnProperty('podeRecarregar').that.is.a('boolean');
                expect(cartao).to.haveOwnProperty('podeVerDetalhes').that.is.a('boolean');
            });
        });
    });

});