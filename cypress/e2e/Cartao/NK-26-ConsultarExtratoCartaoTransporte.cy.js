/// <reference types="cypress" />
import * as CartaoExtrato from '../../integration/services/Cartao/requests/GET_ExtratoCartao.request.js';

describe('[CARTÕES] Detalhar extrato de cartão de transporte de um usuário (GET)', () => {
    let dadosExtrato;

    before(() => {
        cy.fixture('extrato-cartaoDetalhe').then((fixture) => {
            dadosExtrato = fixture;
        });
    });

    beforeEach(() => {
        cy.ObterTokenCartaoTransporte(); // Deve definir Cypress.env('token')
    });

    it('Consultar extrato de cartão com operadora integrada via TACOM', () => {
        const { cartaoValido } = dadosExtrato;
        const {
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal
        } = cartaoValido;

        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            timeout
        ).then((response) => {
            cy.log('Resposta completa:', JSON.stringify(response.body, null, 2));

            // Validações gerais
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
            expect(response.body).to.be.an('array').that.is.not.empty;

            const extrato = response.body;

            extrato.forEach((item, index) => {
                cy.log(`🔎 Validando item do extrato #${index + 1}`);

                // Valida estrutura básica
                expect(item).to.have.property('numeroCartao').that.is.a('string');
                expect(item).to.have.property('linhaOnibusUtilizada').that.is.a('string');
                expect(item).to.have.property('dataUtilizacao').that.is.a('string');
                expect(item).to.have.property('valorDebitado').that.is.a('number');
                expect(item).to.have.property('saldoBanco').that.is.a('number');
                expect(item).to.have.property('descTipoUtilizacao').that.is.a('string');

                // Valida operadoraDto se presente
                if (item.operadoraDto) {
                    expect(item.operadoraDto).to.have.property('id').that.is.a('number');
                }

                // Validações de consistência com entrada
                expect(item.numeroCartao).to.eq(numeroCartao.replace(/.$/, '')); // remove último dígito
            });

            // Validação adicional: todos os itens devem ter operadoraDto.id = 157
            extrato.forEach(item => {
                expect(item.operadoraDto.id).to.eq(157);
            });
        });
    });


    // ⚠️ OPCIONAL: Teste negativo para operadora sem integração
    it.skip('Deve retornar erro ao consultar extrato com operadora sem integração', () => {
        const { cartaoValido } = dadosExtrato;
        const {
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal
        } = cartaoValido;

        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            timeout
        ).then((response) => {
            cy.log('Resposta do teste negativo:', JSON.stringify(response.body, null, 2));

            // Espera-se erro pois a operadora não tem integração
            expect(response.status).to.eq(400); // ajuste conforme a API (400, 422 etc)

            // Validação do código de erro esperado
            expect(response.body).to.have.property('codigoErro', 'MSG-CARTOES-E-100004');
        });
    });






    it.skip('Consultar extrato de cartão em Vitória com operadora integrada', () => {
        const { cartaoVitoria, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoVitoria;
        const idOperadora = operadoras.vitoria;
        const timeout = 30000;


        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout,
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            response.body.forEach((registro) => {
                expect(registro).to.have.property('numeroCartao', numeroCartao);
                expect(registro).to.have.nested.property('operadoraDto.id', parseInt(idOperadora));
            });
        });
    });

    it.skip('Consultar extrato de cartão sem registros de uso', () => {
        const { cartaoSemUso, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoSemUso;
        const idOperadora = operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'MSG-CARTOES-E-100005');
        });
    });

    it('Tentar consultar extrato com número de cartão inválido associado a operadora sem integração de extrato', () => {
        const { cartaoInvalido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoInvalido;
        const idOperadora = operadoras.semIntegracaoExtrato;
        const timeout = 30000;

        return CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, // número de cartão inválido
            dataUsoInicial,
            "",
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'MSG-CARTOES-E-100002');
            expect(response.body).to.have.property('message', 'O número do cartão informado não foi encontrado.');
        });
    });



    it('Verifica que o parâmetro de entrada obrigatório é válido ;', () => {
        const { cartaoInvalido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoInvalido;
        const idOperadora = operadoras.semIntegracaoExtrato; // Supondo que exista essa chave nos dados de teste
        const timeout = 30000;

        return CartaoExtrato.CartaoExtratoOperadoraGET(
            "99999999999", // número de cartão inválido
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'MSG-CARTOES-E-100002');
            expect(response.body).to.have.property('message', 'O número do cartão informado não foi encontrado.');
        });
    });


    it.skip('Tentar consultar extrato de cartão não vinculado ao usuário', () => {
        const { cartaoNaoVinculado, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoNaoVinculado;
        const idOperadora = operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it.skip('Tentar consultar extrato de cartão em São Paulo sem integração', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const idOperadora = operadoras.semIntegracao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            cartaoValido.numeroCartao,
            cartaoValido.dataUsoInicial,
            cartaoValido.dataUsoFinal,
            cartaoValido.codigoCargaInicial,
            cartaoValido.codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it.skip('Tentar consultar extrato de cartão inexistente', () => {
        const { cartaoInexistente, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoInexistente;
        const idOperadora = operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it.skip('DIS - Consultar extrato de cartão de transporte de um usuário', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
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
        });
    });

    it.skip('Consulta de uso do cartão em cidade com integração TACOM e com registros', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.tacom;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
        });
    });

    it.skip('Consulta de uso do cartão em cidade com integração TACOM e sem registros', () => {
        const { cartaoSemRegistros, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoSemRegistros;
        const idOperadora = operadoras.tacom;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

    it.skip('Consulta de uso do cartão em cidade sem integração disponível', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.semIntegracao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(422);
        });
    });


    it.skip('Consultar extrato de cartão em Vitória com operadora integrada', () => {
        const { cartaoVitoria, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoVitoria;
        const timeout = 30000;
        const idOperadora = operadoras.vitoria;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            response.body.forEach((registro) => {
                expect(registro).to.have.property('numeroCartao', numeroCartao);
                expect(registro).to.have.nested.property('operadoraDto.id', parseInt(idOperadora));
            });
        });
    });

    it.skip('Consultar extrato de cartão sem registros de uso', () => {
        const { cartaoSemUso, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoSemUso;
        const idOperadora = operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'MSG-CARTOES-E-100005');
        });
    });


    it.skip('Tentar consultar extrato com número de cartão inválido', () => {
        const { cartaoInvalido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoInvalido;
        const idOperadora = operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it.skip('Tentar consultar extrato de cartão não vinculado ao usuário', () => {
        const { cartaoNaoVinculado, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoNaoVinculado;
        const idOperadora = operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(403);
        });
    });

    it.skip('Tentar consultar extrato de cartão em São Paulo sem integração', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const idOperadora = operadoras.semIntegracao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            cartaoValido.numeroCartao,
            cartaoValido.dataUsoInicial,
            cartaoValido.dataUsoFinal,
            cartaoValido.codigoCargaInicial,
            cartaoValido.codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it.skip('Tentar consultar extrato de cartão inexistente', () => {
        const { cartaoInexistente, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoInexistente;
        const idOperadora = operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it.skip('DIS - Consultar extrato de cartão de transporte de um usuário', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.padrao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout,
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it.skip('Consulta de uso do cartão em cidade com integração TACOM e com registros', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.tacom;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
        });
    });

    it.skip('Consulta de uso do cartão em cidade com integração TACOM e sem registros', () => {
        const { cartaoSemRegistros, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoSemRegistros;
        const idOperadora = operadoras.tacom;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.empty;
        });
    });

    it.skip('Consulta de uso do cartão em cidade sem integração disponível', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.semIntegracao;
        const timeout = 30000;

        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal,
            idOperadora,
            timeout

        ).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    // ==========================
    // TACOM (espera sucesso 200)
    // ==========================
    it.skip('Consulta de uso do cartão - Novo Gama (01)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.novoGama;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Teófilo Otoni (02)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.teofiloOtoni;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Vitória (04)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.vitoria;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Florianópolis (05)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.florianopolis;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Nova Lima (06)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.novaLima;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Metrô Bahia (10)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.metroBahia;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Belo Horizonte (11)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.beloHorizonte;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Alagoinhas (12)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.alagoinhas;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Camaçari (14)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.camacari;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Luziânia (15)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.luziania;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Porto Alegre (16)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.portoAlegre;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Salvador - Metropasse (17)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.salvadorMetropasse;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Salvador / Feira de Santana (18)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.salvadorFeiraSantana;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Taguatur (19)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.taguatur;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - Catedral (20)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.catedral;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it.skip('Consulta de uso do cartão - São João Del Rei (21)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.saoJoaoDelRei;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // ==========================
    // SEM INTEGRAÇÃO (espera erro 422)
    // ==========================
    it.skip('Consulta de uso do cartão em cidade sem integração - São José dos Campos (03)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.saoJoseCampos;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it.skip('Consulta de uso do cartão em cidade sem integração - São Paulo (07)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.saoPaulo;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it.skip('Consulta de uso do cartão em cidade sem integração - Campinas (08)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.campinas;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    it.skip('Consulta de uso do cartão em cidade sem integração - Curitiba (09)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.curitiba;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

    // ==========================
    // NÃO COMEÇOU (espera erro 422)
    // ==========================
    it.skip('Consulta de uso do cartão em cidade sem integração - Jaboatão (13)', () => {
        const { cartaoValido, operadoras } = dadosExtrato;
        const { numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal } = cartaoValido;
        const idOperadora = operadoras.jaboatao;
        const timeout = 30000;
        CartaoExtrato.CartaoExtratoOperadoraGET(
            numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora, timeout
        ).then((response) => {
            expect(response.status).to.eq(422);
        });
    });

});