/// <reference types="cypress" />
import * as Operadora from '../../integration/services/Cartao/requests/GET_Operadora.request';

describe('[CARTÕES] Listar Operadoras Homologadas com o KIM', () => {
    beforeEach(function () {
        cy.fixture('cartoes').as('cartoes');
        cy.ObterTokenCartaoTransporte(); // Garante token válido antes de cada teste
    });

    it.only('Listar todas as operadoras ativas com sucesso', function () {
        const data = this.cartoes.operadora_lista_sucesso;

        Operadora.listarOperadoras().then((response) => {
            // Valida status esperado
            expect(response.status).to.eq(data.expectedStatus);

            // Valida se o corpo não é nulo
            expect(response.body).to.be.not.null;

            // Valida se espera lista vazia ou não
            if (data.expectEmpty) {
                expect(response.body).to.be.an('array').that.is.empty;
            } else {
                expect(response.body).to.be.an('array').that.is.not.empty;

                // Valida campos obrigatórios e novos campos em cada operadora
                response.body.forEach(operadora => {
                    // Campos básicos
                    expect(operadora).to.have.property('idOperadora').that.is.a('number');
                    expect(operadora).to.have.property('nomeFantasia').that.is.a('string').and.not.empty;
                    expect(operadora).to.have.property('razaoSocial').that.is.a('string').and.not.empty;
                    expect(operadora).to.have.property('numeroCnpj').that.is.a('string').and.has.lengthOf(14);
                    expect(operadora).to.have.property('sigla').that.is.a('string').and.has.lengthOf(3);
                    expect(operadora).to.have.property('ativo').that.is.a('boolean');
                    expect(operadora.ativo).to.be.true;
                    expect(operadora).to.have.property('codigoTitularRevenda').that.is.a('string').and.not.empty;

                    // Campo tipoIntegracaoCartao está dentro de integracaoCartao
                    expect(operadora).to.have.property('integracaoCartao').that.is.an('object');
                    expect(operadora.integracaoCartao).to.have.property('tipoIntegracaoCartao').that.is.a('string').and.not.empty;

                    // Validação do bloco cidade
                    expect(operadora).to.have.property('cidade').that.is.an('object');
                    const cidade = operadora.cidade;

                    expect(cidade).to.have.property('idCidade').that.is.a('number');
                    expect(cidade).to.have.property('nomeCidade').that.is.a('string').and.not.empty;
                    expect(cidade).to.have.property('codigoIbge').that.is.a('string').and.match(/^\d{7}$/);

                    // Campos opcionais em cidade
                    if (cidade.usuarioCriacao) {
                        expect(cidade.usuarioCriacao).to.be.a('string').and.include('@');
                    }
                    if (cidade.usuarioAlteracao) {
                        expect(cidade.usuarioAlteracao).to.be.a('string').and.include('@');
                    }
                    if (cidade.dataCriacao) {
                        expect(new Date(cidade.dataCriacao)).to.be.a('date');
                    }
                    if (cidade.dataAlteracao) {
                        expect(new Date(cidade.dataAlteracao)).to.be.a('date');
                    }

                    // Campos opcionais em integracaoCartao
                    const integracao = operadora.integracaoCartao;
                    if (integracao.usuarioCriacao) {
                        expect(integracao.usuarioCriacao).to.be.a('string');
                    }
                    if (integracao.usuarioAlteracao) {
                        expect(integracao.usuarioAlteracao).to.be.a('string');
                    }
                    if (integracao.dataCriacao) {
                        expect(new Date(integracao.dataCriacao)).to.be.a('date');
                    }
                    if (integracao.dataAlteracao) {
                        expect(new Date(integracao.dataAlteracao)).to.be.a('date');
                    }

                    // Campos opcionais em operadora
                    if (operadora.usuarioCriacao) {
                        expect(operadora.usuarioCriacao).to.be.a('string').and.include('@');
                    }
                    if (operadora.usuarioAlteracao) {
                        expect(operadora.usuarioAlteracao).to.be.a('string').and.include('@');
                    }
                    if (operadora.dataCriacao) {
                        expect(new Date(operadora.dataCriacao)).to.be.a('date');
                    }
                    if (operadora.dataAlteracao) {
                        expect(new Date(operadora.dataAlteracao)).to.be.a('date');
                    }
                });
            }

            cy.log('Status:', response.status);
            cy.log('Total de operadoras retornadas:', response.body.length);
        });
    });



    it('Filtrar operadoras por nome fantasia', function () {
        const data = this.cartoes.operadora_filtro_nomeFantasia;

        Operadora.listarOperadoras({
            nomeFantasia: data.nomeFantasia
        }).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array');

            if (response.body.length > 0) {
                response.body.forEach(operadora => {
                    expect(operadora.nomeFantasia.toLowerCase()).to.include(data.nomeFantasia.toLowerCase());
                    expect(operadora.ativo).to.be.true;
                });
            }
        });
    });

    it('Filtrar operadoras pelo CNPJ', function () {
        const data = this.cartoes.operadora_filtro_cnpj;

        Operadora.listarOperadoras({
            numeroCnpj: data.numeroCnpj
        }).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array');

            if (response.body.length > 0) {
                response.body.forEach(operadora => {
                    expect(operadora.numeroCnpj).to.eq(data.numeroCnpj);
                    expect(operadora.ativo).to.be.true;
                });
            } else {
                expect(response.body).to.be.empty;
            }
        });
    });

    it('Filtrar operadoras por sigla', function () {
        const data = this.cartoes.operadora_filtro_sigla;

        Operadora.listarOperadoras({
            sigla: data.sigla
        }).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array');

            response.body.forEach(operadora => {
                expect(operadora.sigla).to.include(data.sigla);
                expect(operadora.sigla).to.have.lengthOf(3);
                expect(operadora.ativo).to.be.true;
            });
        });
    });

    it('Filtrar operadoras por cidade', function () {
        const data = this.cartoes.operadora_filtro_cidade;

        Operadora.listarOperadoras({
            idCidade: data.idCidade
        }).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array');

            response.body.forEach(operadora => {
                // Corrigido: acessar os campos dentro de "cidade"
                expect(operadora).to.have.property('cidade').that.is.an('object');
                expect(operadora.cidade.idCidade).to.eq(data.idCidade);
                expect(operadora.cidade.nomeCidade).to.be.a('string').and.not.empty;
                expect(operadora.cidade.codigoIbge).to.match(/^\d{7}$/);
            });
        });
    });


    it('Filtrar operadoras por tipo de integração de cartão', function () {
        const data = this.cartoes.operadora_filtro_tipoIntegracao;

        Operadora.listarOperadoras({
            tipoIntegracaoCartao: data.tipoIntegracaoCartao
        }).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array');

            response.body.forEach(operadora => {
                expect(operadora).to.have.property('integracaoCartao').that.is.an('object');
                expect(operadora.integracaoCartao.tipoIntegracaoCartao).to.eq(data.tipoIntegracaoCartao);
            });
        });
    });


    it('Filtrar operadoras por código de titular da revenda', function () {
        const data = this.cartoes.operadora_filtro_codigoTitularRevenda;

        expect(data.codigoTitularRevenda, 'codigoTitularRevenda deve estar definido').to.exist;

        cy.log('Filtrando por códigoTitularRevenda:', data.codigoTitularRevenda);

        Operadora.listarOperadoras({
            codigoTitularRevenda: data.codigoTitularRevenda
        }).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array');

            response.body.forEach(operadora => {
                expect(operadora).to.have.property('codigoTitularRevenda', data.codigoTitularRevenda);
            });
        });
    });




    it('Filtrar operadoras por código de titular da revenda', function () {
        const data = this.cartoes.operadora_filtro_codigoTitularRevenda;

        // Chamada usando a função padronizada: listarOperadoras(qs, idOperadora, timeout)
        Operadora.listarOperadoras(
            { codigoTitularRevenda: data.codigoTitularRevenda }, // qs
            '1',     // idOperadora (header)
            30000    // timeout (opcional)
        ).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array');

            response.body.forEach(operadora => {
                expect(operadora.codigoTitularRevenda).to.eq(data.codigoTitularRevenda);
            });

            cy.log(`Total de operadoras encontradas: ${response.body.length}`);
        });
    });

    it('Campo opcional "codigoTitularRevendaVirtual" pode estar ausente', function () {
        const data = this.cartoes.operadora_lista_sucesso;

        Operadora.listarOperadoras().then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array');

            response.body.forEach(operadora => {
                if (operadora.hasOwnProperty('codigoTitularRevendaVirtual')) {
                    expect(
                        operadora.codigoTitularRevendaVirtual === null ||
                        typeof operadora.codigoTitularRevendaVirtual === 'string'
                    ).to.be.true;
                }
            });
        });
    });

    it('Aplicar múltiplos filtros simultaneamente', function () {
        const data = this.cartoes.operadora_filtro_multiplos;

        Operadora.listarOperadoras({
            nomeFantasia: data.nomeFantasia,
            idCidade: data.idCidade,
            tipoIntegracaoCartao: data.tipoIntegracaoCartao
        }).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array');

            response.body.forEach(operadora => {
                // nomeFantasia
                expect(operadora.nomeFantasia.toLowerCase()).to.include(data.nomeFantasia.toLowerCase());

                // idCidade agora vem dentro de cidade
                expect(operadora.cidade.idCidade).to.eq(data.idCidade);

                // tipoIntegracaoCartao agora vem dentro de integracaoCartao
                expect(operadora.integracaoCartao.tipoIntegracaoCartao).to.eq(data.tipoIntegracaoCartao);

                // flagInativo não existe → usar campo "ativo"
                expect(operadora.ativo).to.be.true; // ou .to.be.false conforme a massa de teste
            });
        });
    });


    it('Validar tipos e formatos dos campos retornados', function () {
        const data = this.cartoes.operadora_validacao_formato;

        Operadora.listarOperadoras().then((response) => {
            expect(response.status).to.eq(data.expectedStatus);
            expect(response.body).to.be.an('array');

            response.body.forEach(operadora => {
                // nível raiz
                expect(operadora.idOperadora).to.be.a('number');
                expect(operadora.numeroCnpj).to.be.a('string').and.match(/^\d{14}$/);
                expect(operadora.ativo).to.be.a('boolean');

                // cidade (objeto interno)
                expect(operadora.cidade.idCidade).to.be.a('number');
                expect(operadora.cidade.codigoIbge).to.be.a('string').and.match(/^\d{7}$/);

                // integracaoCartao (se quiser validar também)
                expect(operadora.integracaoCartao.tipoIntegracaoCartao).to.be.a('string');
            });
        });
    });


    it('Enviar parâmetro com tipo incorreto (ex: idCidade como string)', function () {
        const data = this.cartoes.operadora_parametro_incorreto;

        Operadora.listarOperadoras({
            idCidade: "ABC" // valor inválido de propósito
        }).then((response) => {
            // Aceita 200 (ignora o filtro) ou 400 (erro de validação)
            expect([200, 400]).to.include(response.status);

            if (response.status === 400) {
                expect(response.body).to.have.property('code');
                expect(response.body).to.have.property('status', 400);
                expect(response.body).to.have.property('message').that.is.a('string');
                expect(response.body).to.have.property('errors').that.is.an('array');

                // Validação específica do erro
                expect(response.body.errors[0]).to.have.property('message').and.include('idCidade');
            } else {
                // Se não deu erro, a API simplesmente ignorou o filtro inválido
                expect(response.body).to.be.an('array');
            }
        });
    });

});