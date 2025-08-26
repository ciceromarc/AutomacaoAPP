/// <reference types="cypress" />
import * as CartaoExtrato from '../../integration/services/Cartao/requests/POST_detalharExtratoCartao.request';

describe('[CARTÕES] Detalhar extrato de cartão de transporte de um usuário', () => {
    let dadosExtrato; // Variável para armazenar os dados do fixture

    before(() => {
        cy.fixture('extrato-cartao').then((fixture) => {
            dadosExtrato = fixture; // Carrega os dados uma vez antes dos testes
        });
    });

    beforeEach(() => {
        cy.ObterToken();
    });

    it('Consultar extrato de cartão com operadora integrada via TACOM', () => {
        const { cartaoValido } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = dadosExtrato.operadoras.padrao; // '1'
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            cy.log('Resposta completa:', JSON.stringify(response));

            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.be.an('array').and.not.empty;

            const extrato = response.body;

            extrato.forEach((item, index) => {
                cy.log(`🔎 Validando item do extrato #${index + 1}`);

                expect(item).to.have.property('numeroCartao', numeroCartao);

                expect(item).to.have.property('dataUtilizacao').that.is.a('string');
                expect(item).to.have.property('valorDebitado').that.is.a('number');
                expect(item).to.have.property('saldoBanco').that.is.a('number');
                expect(item).to.have.property('descTipoUtilizacao').that.is.a('string');

                if (item.operadoraDto) {
                    expect(item.operadoraDto).to.have.property('id').that.is.a('number');
                }

                if (item.dataUsoInicial) {
                    expect(item.dataUsoInicial).to.eq(dataUsoInicial);
                }
                if (item.dataUsoFinal) {
                    expect(item.dataUsoFinal).to.eq(dataUsoFinal);
                }
                if (item.codigoCargaInicial) {
                    expect(item.codigoCargaInicial).to.eq(codigoCargaInicial);
                }
                if (item.codigoCargaFinal) {
                    expect(item.codigoCargaFinal).to.eq(codigoCargaFinal);
                }
            });
        });
    });

    it('Consultar extrato de cartão em Vitória com operadora integrada', () => {
        const { cartaoVitoria } = dadosExtrato; // Supondo que você tenha esse cartão no JSON
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoVitoria || dadosExtrato.cartaoValido;
        const idOperadora = dadosExtrato.operadoras.vitoria; // '157'
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.be.an('array').and.not.empty;

            response.body.forEach((registro) => {
                expect(registro).to.have.property('numeroCartao', numeroCartao);
                expect(registro).to.have.nested.property('operadoraDto.id', 157);
                expect(registro).to.have.property('dataUtilizacao').that.is.a('string');
                expect(registro).to.have.property('valorDebitado').that.is.a('number');
                expect(registro).to.have.property('descTipoUtilizacao').that.is.a('string');
            });

            cy.log('Extrato retornado:', JSON.stringify(response.body, null, 2));
        });
    });

    it('Consultar extrato de cartão sem registros de uso', () => {
        const { cartaoSemUso } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoSemUso;
        const idOperadora = dadosExtrato.operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.not.be.null;

            expect(response.body).to.have.property('code', 'MSG-CARTOES-E-100005');
            expect(response.body).to.have.property('status', 400);
            expect(response.body).to.have.property('description', 'Bad Request');
            expect(response.body).to.have.property('message', 'Não existem informações para detalhar no extrato do cartão.');
            expect(response.body).to.have.property('dateTime').that.matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);

            cy.log('Resposta de erro:', JSON.stringify(response.body, null, 2));
        });
    });

    it('Tentar consultar extrato com token inválido', () => {
        const { cartaoValido } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = dadosExtrato.operadoras.padrao;
        const timeout = 30000;

        cy.api({
            method: 'GET',
            url: `cartao/api/v1/cartao/extrato?numeroCartao=${numeroCartao}&dataUsoInicial=${dataUsoInicial}&dataUsoFinal=${dataUsoFinal}&codigoCargaInicial=${codigoCargaInicial}&codigoCargaFinal=${codigoCargaFinal}`,
            headers: {
                'accept': 'application/json',
                'idOperadora': idOperadora,
                'Authorization': `Bearer token-invalido-123`
            },
            failOnStatusCode: false,
            timeout: timeout
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('codigoErro', 'GLB-E-100001');
            cy.log('Resposta com token inválido:', JSON.stringify(response.body, null, 2));
        });
    });

    it('Tentar consultar extrato com número de cartão inválido', () => {
        const { cartaoInvalido } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoInvalido;
        const idOperadora = dadosExtrato.operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.not.be.null;
            cy.log('Resposta com cartão inválido:', JSON.stringify(response.body, null, 2));
        });
    });

    it('Tentar consultar extrato de cartão não vinculado ao usuário', () => {
        const { cartaoNaoVinculado } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoNaoVinculado;
        const idOperadora = dadosExtrato.operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(200); // 403
            expect(response.body).to.not.be.null;
            cy.log('Resposta - cartão não vinculado:', JSON.stringify(response.body, null, 2));
        });
    });

    it('Tentar consultar extrato de cartão em São Paulo sem integração', () => {
        const { cartaoValido } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = dadosExtrato.operadoras.semIntegracao; // '99'
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body).to.not.be.null;
            cy.log('Resposta - sem integração:', JSON.stringify(response.body, null, 2));
        });
    });

    it('Tentar consultar extrato de cartão inexistente', () => {
        const { cartaoInexistente } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoInexistente;
        const idOperadora = dadosExtrato.operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.not.be.null;
            cy.log('Resposta - cartão inexistente:', JSON.stringify(response.body, null, 2));
        });
    });

    it('DIS - Consultar extrato de cartão de transporte de um usuário', () => {
        const { cartaoValido } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = dadosExtrato.operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.be.an('array');
            cy.log('Extrato do usuário (DIS):', JSON.stringify(response.body, null, 2));
        });
    });

    it('Consulta de uso do cartão em cidade com integração TACOM e com registros', () => {
        const { cartaoValido } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = dadosExtrato.operadoras.tacom; // '2'
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.be.an('array').and.not.empty;
            cy.log('Registros de uso (TACOM - com registros):', JSON.stringify(response.body, null, 2));
        });
    });

    it('Consulta de uso do cartão em cidade com integração TACOM e sem registros', () => {
        const { cartaoSemRegistros } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoSemRegistros;
        const idOperadora = dadosExtrato.operadoras.tacom; // '2'
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body).to.be.empty;
            cy.log('Registros de uso (TACOM - sem registros):', JSON.stringify(response.body, null, 2));
        });
    });

    it('Consulta de uso do cartão em cidade sem integração disponível', () => {
        const { cartaoValido } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = dadosExtrato.operadoras.semIntegracao; // '99'
        const timeout = 30000;

        CartaoExtrato.CartaoExtratooperadora(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body).to.not.be.null;
            cy.log('Resposta - sem integração disponível:', JSON.stringify(response.body, null, 2));
        });
    });
});