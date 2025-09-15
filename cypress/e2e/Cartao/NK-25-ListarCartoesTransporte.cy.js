/// <reference types="cypress" />
import * as Cartao from '../../integration/services/Cartao/requests/GET_Cartao.request';

describe('[CARTÕES] Listar cartões de transporte', () => {

    beforeEach(function () {
        cy.fixture('cartoes').as('cartoes');
        cy.ObterToken();
    });


    // FILTRO: idUsuario
    // ==========================
    it('Listar Cartões filtrando por idUsuario', function () {
        const data = this.cartoes.filtro_idUsuario;

        Cartao.CartaoTransporteusuarioUsuario(data.idUsuario).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.not.empty;

            response.body.forEach(cartao => {
                expect(cartao.idUsuario).to.eq(data.idUsuario);
            });
        });
    });

    // ==========================
    // FILTRO: numeroCartao
    // ==========================
    it('Listar Cartões filtrando por numeroCartao', function () {
        const data = this.cartoes.filtro_numeroCartao;

        const url = `cartao/api/v1/cartao?numeroCartao=${data.numeroCartao}`;
        cy.request({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': `Bearer ${Cypress.env('token')}`,
                'accept': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);

            response.body.forEach(cartao => {
                expect(cartao.numeroCartao).to.eq(data.numeroCartao);
            });
        });
    });

    // ==========================
    // FILTRO: apelidoCartao
    // ==========================
    it('Listar Cartões filtrando por apelidoCartao', function () {
        const data = this.cartoes.filtro_apelido;

        Cartao.CartaoFiltroApelido(data.apelidoCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);

            response.body.forEach(cartao => {
                expect(cartao.apelidoCartao).to.eq(data.apelidoCartao);
            });
        });
    });


    // ==========================
    // FILTRO: ativo
    // ==========================
    it('Listar Cartões filtrando por ativo = true', function () {
        const data = this.cartoes.filtro_ativo_true;

        Cartao.CartaoInativoUsuario(true).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);

            response.body.forEach(cartao => {
                expect(cartao.ativo).to.be.true;
            });
        });
    });

    // ==========================
    // FILTRO: usuarioCriacao
    // ==========================
    it('Listar Cartões filtrando por usuarioCriacao', function () {
        const data = this.cartoes.filtro_usuarioCriacao;

        Cartao.CartaoFiltroUsuarioCriacao(data.usuarioCriacao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);

            response.body.forEach(cartao => {
                expect(cartao.usuarioCriacao).to.eq(data.usuarioCriacao);
            });
        });
    });

    // ==========================
    // FILTRO: usuarioAlteracao
    // ==========================
    it('Listar Cartões filtrando por usuarioAlteracao', function () {
        const data = this.cartoes.filtro_usuarioAlteracao;

        Cartao.CartaoFiltroUsuarioAlteracao(data.usuarioAlteracao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);

            response.body.forEach(cartao => {
                expect(cartao.usuarioAlteracao).to.eq(data.usuarioAlteracao);
            });
        });
    });

    // ==========================
    // FILTRO: dataCriacao
    // ==========================
    it('Listar Cartões filtrando por dataCriacao', function () {
        const data = this.cartoes.filtro_dataCriacao;

        Cartao.CartaoFiltroDataCriacao(data.dataCriacao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);

            response.body.forEach(cartao => {
                expect(cartao.dataCriacao).to.contain(data.dataCriacao);
            });
        });
    });

    // ==========================
    // FILTRO: dataAlteracao
    // ==========================
    it('Listar Cartões filtrando por dataAlteracao', function () {
        const data = this.cartoes.filtro_dataAlteracao;

        Cartao.CartaoFiltroDataAlteracao(data.dataAlteracao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);

            response.body.forEach(cartao => {
                expect(cartao.dataAlteracao).to.contain(data.dataAlteracao);
            });
        });
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
                expect(cartao.dataCadastro).to.be.a('string'); // ISO format assumed
                expect(cartao.ativo).to.be.a('boolean');
                expect(cartao.bloqueado).to.be.a('boolean');
                expect(cartao.favorito).to.be.a('boolean');
                expect(cartao.idUsuario).to.be.a('number');

                // Sugestões de recarga (obrigatórios, podem ser null)
                expect(cartao.valorMinimoRecargaSugerido).to.be.oneOf([null, 'number']);
                expect(cartao.valorMaximoRecargaSugerido).to.be.oneOf([null, 'number']);

                // ===== AUDITORIA DO CARTÃO =====
                expect(cartao.usuarioCriacao).to.be.oneOf([null, 'string']);
                expect(cartao.dataCriacao).to.be.a('string').and.satisfy(isValidISODate);

                expect(cartao.usuarioAlteracao).to.be.oneOf([null, 'string']);
                expect(cartao.dataAlteracao).to.be.oneOf([null, 'string']).and.satisfy(isValidISODate);

                // ===== VALORES SUGERIDOS DE RECARGA =====
                expect(cartao.valorMinimoRecargaSugerido).to.be.oneOf([null, 'number']);
                expect(cartao.valorMaximoRecargaSugerido).to.be.oneOf([null, 'number']);

                // ===== TipoCartao =====
                const tipoCartao = cartao.tipoCartao;
                expect(tipoCartao).to.have.property('idTipoBasicoCartao').that.is.a('number');
                expect(tipoCartao).to.have.property('descricao').that.is.a('string');
                expect(tipoCartao).to.have.property('dataCriacao').that.is.a('string');
                if (tipoCartao.dataAlteracao !== null) {
                    expect(tipoCartao.dataAlteracao).to.be.a('string');
                }

                // ===== CategoriaCartaoOperadora =====
                const categoria = cartao.categoriaCartaoOperadora;
                expect(categoria).to.have.property('idCategoriaCartaoOperadora').that.is.a('number');
                expect(categoria).to.have.property('sigla').that.is.a('string');
                expect(categoria).to.have.property('detalheOperacao').that.is.a('string');
                expect(categoria).to.have.property('tipoTecnologia').that.is.a('string');
                expect(categoria).to.have.property('mensagemRecarga').that.is.a('string');
                expect(categoria).to.have.property('mensagemAtivacaoSaldo').that.is.a('string');
                expect(categoria).to.have.property('valorMinimoRecarga').that.is.a('number');
                expect(categoria).to.have.property('valorMaximoRecarga').that.is.a('number');
                expect(categoria).to.have.property('tiposTransporte').that.is.an('array');
                expect(categoria).to.have.property('usuarioCriacao').that.is.a('string');
                expect(categoria).to.have.property('usuarioAlteracao').that.is.a('string');
                expect(categoria).to.have.property('dataCriacao').that.is.a('string');
                if (categoria.dataAlteracao !== null) {
                    expect(categoria.dataAlteracao).to.be.a('string');
                }

                // ===== TipoBasicoCartao (dentro da categoria) =====
                const tipoBasico = categoria.tipoBasicoCartao;
                expect(tipoBasico).to.have.property('idTipoBasicoCartao').that.is.a('number');
                expect(tipoBasico).to.have.property('descricao').that.is.a('string');
                expect(tipoBasico).to.have.property('dataCriacao').that.is.a('string');
                if (tipoBasico.dataAlteracao !== null) {
                    expect(tipoBasico.dataAlteracao).to.be.a('string');
                }

                // ===== Operadora =====
                const operadora = categoria.operadora;
                expect(operadora).to.have.property('idOperadora').that.is.a('number');
                expect(operadora).to.have.property('nomeFantasia').that.is.a('string');
                expect(operadora).to.have.property('razaoSocial').that.is.a('string');
                expect(operadora).to.have.property('numeroCnpj').that.is.a('string').and.match(/^\d{14}$/); // 14 dígitos conforme JSON
                expect(operadora).to.have.property('sigla').that.is.a('string');
                expect(operadora).to.have.property('codigoTitularRevenda').that.is.a('string');
                expect(operadora.codigoTitularRevendaVirtual).to.satisfy(value => value === null || value === undefined || typeof value === 'string');
                expect(operadora).to.have.property('ativo').that.is.a('boolean');
                expect(operadora).to.have.property('idRevenda').that.is.a('number');
                expect(operadora).to.have.property('metodosPagamento').that.is.an('array');
                expect(operadora).to.have.property('usuarioCriacao').that.is.a('string');
                expect(operadora).to.have.property('usuarioAlteracao').that.is.a('string');
                expect(operadora).to.have.property('dataCriacao').that.is.a('string');
                if (operadora.dataAlteracao !== null) {
                    expect(operadora.dataAlteracao).to.be.a('string');
                }

                // ===== Cidade =====
                const cidade = operadora.cidade;

                expect(cidade).to.have.property('idCidade').that.is.a('number');
                expect(cidade).to.have.property('nomeCidade').that.is.a('string');

                // Código IBGE: string de dígitos (trata espaços invisíveis)
                const codigoIbge = cidade.codigoIbge;
                expect(codigoIbge).to.be.a('string').and.not.be.empty;
                expect(codigoIbge.trim()).to.match(/^\d+$/);

                // Usuario criação: pode ser null (bug na API)
                expect(cidade).to.have.property('usuarioCriacao').to.be.oneOf([null, 'string']);

                // Usuario alteração: opcional
                expect(cidade).to.have.property('usuarioAlteracao').to.be.oneOf([null, 'string']);

                // Data criação: obrigatória e em formato ISO
                expect(cidade).to.have.property('dataCriacao').that.is.a('string').and.satisfy(isValidISODate);

                // Data alteração: opcional
                expect(cidade).to.have.property('dataAlteracao').to.be.oneOf([null, 'string']).and.satisfy(isValidISODate);
                if (cidade.dataAlteracao !== null) {
                    expect(cidade.dataAlteracao).to.be.a('string');
                }

                // ===== Integração do Cartão =====
                const integracao = operadora.integracaoCartao;
                expect(integracao).to.have.property('idIntegracaoCartao').that.is.a('number');
                expect(integracao).to.have.property('tipoIntegracaoCartao').that.is.a('string');
                expect(integracao).to.have.property('dataCriacao').that.is.a('string');
                if (integracao.dataAlteracao !== null) {
                    expect(integracao.dataAlteracao).to.be.a('string');
                }

                // ===== MetodosPagamento (se houver itens) =====
                // Como está vazio, apenas validamos que é array. Se tiver itens, validar mais.
                operadora.metodosPagamento.forEach(metodo => {
                    expect(metodo).to.have.property('idMetodoPagamento').that.is.a('number');
                    expect(metodo).to.have.property('metodoPagamento').that.is.a('string'); // note: no doc está "descrucai", provavelmente erro de digitação
                    expect(metodo).to.have.property('dataCriacao').that.is.a('string');
                    if (metodo.dataAlteracao !== null) {
                        expect(metodo.dataAlteracao).to.be.a('string');
                    }
                });

                // ===== TiposTransporte (dentro da categoria) =====
                categoria.tiposTransporte.forEach(tipo => {
                    expect(tipo).to.have.property('idTipoTransporte').that.is.a('number');
                    expect(tipo).to.have.property('descricao').that.is.a('string');
                    expect(tipo).to.have.property('dataCriacao').that.is.a('string');
                    if (tipo.dataAlteracao !== null) {
                        expect(tipo.dataAlteracao).to.be.a('string');
                    }
                });
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

                // Tipo de Cartão — NÃO é "id", é "idTipoBasicoCartao"
                expect(cartao.tipoCartao).to.have.property('idTipoBasicoCartao').that.is.a('number');
                expect(cartao.tipoCartao).to.have.property('descricao').that.is.a('string');

                // Categoria + Operadora
                expect(cartao.categoriaCartaoOperadora).to.have.property('idCategoriaCartaoOperadora').that.is.a('number');
                expect(cartao.categoriaCartaoOperadora.operadora).to.have.property('idOperadora').that.is.a('number');
                expect(cartao.categoriaCartaoOperadora.operadora.numeroCnpj).to.be.a('string').and.match(/^\d{14}$/);

                // Cidade
                const cidade = cartao.categoriaCartaoOperadora.operadora.cidade;
                expect(cidade.idCidade).to.be.a('number');
                expect(cidade.nomeCidade).to.be.a('string');

                // Código IBGE: trata espaços invisíveis
                const codigoIbge = cidade.codigoIbge;
                expect(codigoIbge).to.be.a('string').and.not.be.empty;
                expect(codigoIbge.trim()).to.match(/^\d+$/);
            });
        });
    });

    it('Listar Cartões Físicos sem Resultados', function () {
        const data = this.cartoes.fisico_vazio;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus); // 400

            // ✅ Agora o retorno é um objeto de erro, não array vazio
            expect(response.body).to.be.an('object');
            expect(response.body).to.not.be.null;

            // Validação dos campos do erro padrão
            expect(response.body).to.have.property('code').that.is.a('string').and.eq('MSG-CARTOES-E-100001');
            expect(response.body).to.have.property('status').that.is.a('number').and.eq(400);
            expect(response.body).to.have.property('description').that.is.a('string').and.eq('Bad Request');
            expect(response.body).to.have.property('message').that.is.a('string').and.eq('Nenhum cartão foi localizado.');
            expect(response.body).to.have.property('dateTime').that.is.a('string');

            // Opcional: validar formato da data (se quiser ser rigoroso)
            const dateTimeRegex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;
            expect(response.body.dateTime).to.match(dateTimeRegex);

            // Log útil para depuração (opcional)
            cy.log('Resposta esperada validada com sucesso:', JSON.stringify(response.body, null, 2));
        });
    });

    it('Erro ao Listar Cartões Físicos', function () {
        const data = this.cartoes.fisico_erro;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.be.oneOf(data.expectedStatus);

            if (response.status === 400) {
                expect(response.body).to.have.property('code').that.is.a('string');
                expect(response.body).to.have.property('status', 400);
                expect(response.body).to.have.property('message').that.is.a('string');
                expect(response.body).to.have.property('errors').that.is.an('array');
            }
        });
    });


    it('Listar Cartões Virtuais com Sucesso', function () {
        const data = this.cartoes.virtual_sucesso;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.not.empty;

            response.body.forEach(cartao => {
                // Valida se o tipo é "VIRTUAL" (case-insensitive)
                expect(cartao.tipoCartao).to.have.property('descricao').that.is.a('string');
                expect(cartao.tipoCartao.descricao.toUpperCase()).to.eq('VIRTUAL'); // ✅ Melhor que .toLowerCase()
            });
        });
    });


    it('Listar Cartões Virtuais sem Resultados', function () {
        const data = this.cartoes.virtual_vazio;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus); // 400

            // ✅ Agora o retorno é um objeto de erro, não array vazio
            expect(response.body).to.be.an('object');
            expect(response.body).to.not.be.null;

            // Validação dos campos do erro padrão
            expect(response.body).to.have.property('code').that.is.a('string').and.eq('MSG-CARTOES-E-100001');
            expect(response.body).to.have.property('status').that.is.a('number').and.eq(400);
            expect(response.body).to.have.property('description').that.is.a('string').and.eq('Bad Request');
            expect(response.body).to.have.property('message').that.is.a('string').and.eq('Nenhum cartão foi localizado.');
            expect(response.body).to.have.property('dateTime').that.is.a('string');

            // Validação opcional do formato da data/hora
            const dateTimeRegex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;
            expect(response.body.dateTime).to.match(dateTimeRegex);

            // Log para depuração
            cy.log('Resposta esperada validada com sucesso:', JSON.stringify(response.body, null, 2));
        });
    });


    it('Erro ao Listar Cartões Virtuais', function () {
        const data = this.cartoes.virtual_erro;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.be.oneOf(data.expectedStatus);

            if (response.status === 400) {
                expect(response.body).to.have.property('code').that.is.a('string');
                expect(response.body).to.have.property('status', 400);
                expect(response.body).to.have.property('message').that.is.a('string');
                expect(response.body).to.have.property('errors').that.is.an('array');
            }
        });
    });


    it.skip('Listar Cartões Inativos com Sucesso', function () {   // Temporariamente desativado até preparar uma massa com cartões inativos
        const data = this.cartoes.inativo_sucesso;                  // ✅ Descomentar quando a massa for pronta com cartão inativo

        Cartao.CartaoInativoUsuario(data.ativo).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.not.empty;

            response.body.forEach(cartao => {
                cy.log(JSON.stringify(response.body));
                expect(cartao.ativo).to.be.false; // ou true, conforme esperado

                expect(cartao.idCartao).to.be.a('number');
                expect(cartao.numeroCartao).to.be.a('string');
                expect(cartao.apelidoCartao).to.be.a('string');
                expect(cartao.tipoCartao).to.have.property('descricao').that.is.a('string');
            });
        });
    });



    it('Listar Cartões Inativos sem Resultados', function () {
        const data = this.cartoes.inativo_vazio;

        Cartao.CartaoTransporteusuarioUsuario(data.idUsuario).then((response) => {
            expect(response.status).to.eq(data.expectedStatus); // Ex: 400

            cy.log(JSON.stringify(response.body));

            // ✅ Verifica que o body é um objeto com os campos de erro esperados
            expect(response.body).to.be.an('object').that.is.not.null;
            expect(response.body).to.have.property('code').that.equals('MSG-CARTOES-E-100001');
            expect(response.body).to.have.property('status').that.equals(400);
            expect(response.body).to.have.property('description').that.equals('Bad Request');
            expect(response.body).to.have.property('message').that.equals('Nenhum cartão foi localizado.');
            expect(response.body).to.have.property('dateTime').that.is.a('string');

            // (Opcional) Validar o formato da data/hora
            const dateTimeRegex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;
            expect(response.body.dateTime).to.match(dateTimeRegex);

            // (Opcional) Log formatado
            cy.log('Erro padrão validado com sucesso:', JSON.stringify(response.body, null, 2));
        });
    });


    it('Erro ao Listar Cartões Inativos', function () {
        const data = this.cartoes.inativo_erro;

        Cartao.CartaoTransporteusuario(data.tipoCartao, data.statusCartao).then((response) => {
            expect(response.status).to.be.oneOf(data.expectedStatus);

            if (response.status === 400) {
                expect(response.body).to.have.property('code').that.is.a('string');
                expect(response.body).to.have.property('status', 400);
                expect(response.body).to.have.property('message').that.is.a('string');
                expect(response.body).to.have.property('errors').that.is.an('array');
            }
        });
    });


    it('Acesso a Funcionalidades de Ação (Recarregar, Detalhes)', function () {
        const data = this.cartoes.com_acoes;

        Cartao.CartaoTransporteusuario(data.tipoCartao).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array').that.is.not.empty;

            response.body.forEach(cartao => {
                // Garante que o cartão tem os dados básicos (evita falsos positivos)
                expect(cartao.idCartao).to.be.a('number');
                expect(cartao.numeroCartao).to.be.a('string');
                expect(cartao.tipoCartao).to.have.property('descricao').that.is.a('string');
            });
        });
    });

    // Função auxiliar para validar datas ISO (aceita null/undefined)
    function isValidISODate(dateString) {
        if (dateString === null || dateString === undefined) return true;
        const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?$/;
        return isoRegex.test(dateString);
    }

});