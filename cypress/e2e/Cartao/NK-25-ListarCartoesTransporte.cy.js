/// <reference types="cypress" />
import * as Cartao from '../../integration/services/Cartao/requests/GET_Cartao.request';

describe('[CARTÕES] Listar cartões de transporte', () => {

    beforeEach(function () {
        cy.fixture('cartoes').as('cartoes');
                cy.ObterToken();
    });

it('Listar Cartões com todos os campos de retorno validados', function () {
    const data = this.cartoes.fisico_sucesso;

    Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
        expect(response.status).to.eq(data.expectedStatus);
        expect(response.body).to.be.an('array').that.is.not.empty;

        response.body.forEach(cartao => {
            // ===== Nível Cartão =====
            expect(cartao.idCartao).to.be.a('number');
            expect(cartao.apelidoCartao).to.be.a('string');
            expect(cartao.numeroCartao).to.be.a('string').and.match(/^\d+$/);
            expect(cartao.dataCadastro).to.be.a('string'); // validar formato ISO
            expect(cartao.ativo).to.be.a('boolean');
            expect(cartao.bloqueado).to.be.a('boolean');
            expect(cartao.favorito).to.be.a('boolean');
            expect(cartao.idUsuario).to.be.a('number');

            // ===== TipoCartao (objeto interno) =====
            expect(cartao.tipoCartao).to.have.property('id').that.is.a('number');
            expect(cartao.tipoCartao).to.have.property('descricao').that.is.a('string');
            expect(cartao.tipoCartao).to.have.property('dataCriacao').that.is.a('string');

            // ===== CategoriaCartaoOperadora (objeto interno) =====
            expect(cartao.categoriaCartaoOperadora).to.have.property('idCategoriaCartaoOperadora').that.is.a('number');
            expect(cartao.categoriaCartaoOperadora).to.have.property('sigla').that.is.a('string');
            expect(cartao.categoriaCartaoOperadora).to.have.property('tipoBasicoCartao').that.is.an('object');
            expect(cartao.categoriaCartaoOperadora).to.have.property('operadora').that.is.an('object');

            // ===== Operadora (objeto interno) =====
            const operadora = cartao.categoriaCartaoOperadora.operadora;
            expect(operadora.idOperadora).to.be.a('number');
            expect(operadora.nomeFantasia).to.be.a('string');
            expect(operadora.razaoSocial).to.be.a('string');
            expect(operadora.numeroCnpj).to.be.a('string').and.match(/^\d{14}$/);
            expect(operadora.ativo).to.be.a('boolean');
            expect(operadora.idRevenda).to.be.a('number');

            // ===== Cidade (objeto dentro de Operadora) =====
            expect(operadora.cidade).to.have.property('idCidade').that.is.a('number');
            expect(operadora.cidade).to.have.property('nomeCidade').that.is.a('string');
            expect(operadora.cidade).to.have.property('codigoIbge').that.is.a('string').and.match(/^\d+$/);

            // ===== Regras de Recarga (se existirem no retorno) =====
            if (operadora.regras) {
                expect(operadora.regras.valorMinimoRecarga).to.be.a('number');
                expect(operadora.regras.valorMaximoRecarga).to.be.a('number');
            }
        });
    });
});


    it('Listar Cartões Físicos com Sucesso', function () {
    const data = this.cartoes.fisico_sucesso;

    Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
        expect(response.status).to.eq(data.expectedStatus);
        expect(response.body).to.be.an('array').that.is.not.empty;

        response.body.forEach(cartao => {
            // Campos principais
            expect(cartao.idCartao).to.be.a('number');
            expect(cartao.numeroCartao).to.be.a('string').and.match(/^\d+$/);
            expect(cartao.apelidoCartao).to.be.a('string');
            expect(cartao.dataCadastro).to.be.a('string');
            expect(cartao.ativo).to.be.a('boolean');
            expect(cartao.bloqueado).to.be.a('boolean');
            expect(cartao.favorito).to.be.a('boolean');
            expect(cartao.idUsuario).to.be.a('number');

            // Tipo de Cartão
            expect(cartao.tipoCartao).to.have.property('id').that.is.a('number');
            expect(cartao.tipoCartao).to.have.property('descricao').that.is.a('string');

            // Categoria + Operadora
            expect(cartao.categoriaCartaoOperadora).to.have.property('idCategoriaCartaoOperadora').that.is.a('number');
            expect(cartao.categoriaCartaoOperadora.operadora).to.have.property('idOperadora').that.is.a('number');
            expect(cartao.categoriaCartaoOperadora.operadora.numeroCnpj).to.be.a('string').and.match(/^\d{14}$/);

            // Cidade
            const cidade = cartao.categoriaCartaoOperadora.operadora.cidade;
            expect(cidade.idCidade).to.be.a('number');
            expect(cidade.codigoIbge).to.be.a('string').and.match(/^\d+$/);
        });
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

        if (response.status === 400) {
            expect(response.body).to.have.property('code');
            expect(response.body).to.have.property('status', 400);
            expect(response.body).to.have.property('message').that.is.a('string');
            expect(response.body).to.have.property('errors').that.is.an('array');
        }
    });
});


// ========================
// Cartões Virtuais
// ========================
it('Listar Cartões Virtuais com Sucesso', function () {
    const data = this.cartoes.virtual_sucesso;

    Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
        expect(response.status).to.eq(data.expectedStatus);
        expect(response.body).to.be.an('array').that.is.not.empty;

        response.body.forEach(cartao => {
            expect(cartao.tipoCartao.descricao.toLowerCase()).to.eq('virtual');
        });
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

        if (response.status === 400) {
            expect(response.body).to.have.property('code');
            expect(response.body).to.have.property('status', 400);
            expect(response.body).to.have.property('message').that.is.a('string');
            expect(response.body).to.have.property('errors').that.is.an('array');
        }
    });
});


// ========================
// Cartões Inativos
// ========================
it('Listar Cartões Inativos com Sucesso', function () {
    const data = this.cartoes.inativo_sucesso;

    Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
        expect(response.status).to.eq(data.expectedStatus);
        expect(response.body).to.be.an('array').that.is.not.empty;

        response.body.forEach(cartao => {
            expect(cartao.ativo).to.be.false;
        });
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

        if (response.status === 400) {
            expect(response.body).to.have.property('code');
            expect(response.body).to.have.property('status', 400);
            expect(response.body).to.have.property('message').that.is.a('string');
            expect(response.body).to.have.property('errors').that.is.an('array');
        }
    });
});


// ========================
// Funcionalidades de Ação
// ========================
it('Acesso a Funcionalidades de Ação (Recarregar, Detalhes)', function () {
    const data = this.cartoes.com_acoes;

    Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
        expect(response.status).to.eq(data.expectedStatus);
        expect(response.body).to.be.an('array').that.is.not.empty;

        response.body.forEach(cartao => {
            expect(cartao).to.have.property('podeRecarregar').that.is.a('boolean');
            expect(cartao).to.have.property('podeVerDetalhes').that.is.a('boolean');
        });
    });
});

});