/// <reference types="cypress" />
import * as Estacao from '../../integration/services//Cartao/requests/GET_EstacoesPorOperadora.request';

describe('[ESTAÇÕES] Listar estações de uma operadora', () => {
    beforeEach(function () {
        cy.fixture('cartoes').as('cartoes');
        cy.ObterTokenCartaoTransporte(); // Garante token válido
    });

    it('Deve listar estações de uma operadora válida com sucesso', function () {
        const idOperadora = 85;

        Estacao.listarEstacoesPorOperadora(idOperadora).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').and.not.empty; // ← era 'object', agora é 'array'

            const operadora = response.body[0]; // ← pega o primeiro (e único) item

            // Valida campos principais
            expect(operadora).to.have.property('idOperadora', idOperadora);
            expect(operadora).to.have.property('operadora').that.is.a('string').and.not.empty;
            expect(operadora).to.have.property('estacoes').that.is.an('array').and.not.empty;

            // Valida cada estação
            operadora.estacoes.forEach(estacao => {
                expect(estacao).to.have.property('codigoEstacao').that.is.a('number');
                expect(estacao).to.have.property('codigoEstacaoExterno').that.is.a('string').and.not.empty;
                expect(estacao).to.have.property('descricaoEstacao').that.is.a('string').and.not.empty;
                expect(estacao).to.have.property('enderecoEstacao').that.is.a('string').and.not.empty;
                expect(estacao).to.have.property('valorTarifa').that.is.a('number');
            });

            cy.log(`Total de estações retornadas: ${operadora.estacoes.length}`);
        });
    });

    it('Deve retornar todas as estações de todas as operadoras quando idOperadora não é informado', function () {
        Estacao.listarEstacoesPorOperadora().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');

            // Quando não passa idOperadora, o retorno é um array de objetos (uma por operadora)
            response.body.forEach(item => {
                expect(item).to.have.property('idOperadora').that.is.a('number');
                expect(item).to.have.property('operadora').that.is.a('string');
                expect(item).to.have.property('estacoes').that.is.an('array');
            });

            cy.log(`Total de operadoras com estações: ${response.body.length}`);
        });
    });

    it('Deve retornar erro MSG-CARTOES-E-100013 quando operadora não existe ou não há operadoras ativas', function () {
        Estacao.listarEstacoesPorOperadora(999).then((response) => {
            // Valida o status HTTP
            expect(response.status).to.eq(400);

            // Valida que o corpo é um objeto (não array)
            expect(response.body).to.be.an('object').and.not.empty;

            // Valida campos obrigatórios do erro
            expect(response.body).to.have.property('code', 'MSG-CARTOES-E-100013');
            expect(response.body).to.have.property('message').that.is.a('string').and.not.empty;
            expect(response.body.message).to.include('Não há operadoras ativas homologadas ao KIM.');

            // Opcional: valida outros campos
            expect(response.body).to.have.property('status', 400);
            expect(response.body).to.have.property('description', 'Bad Request');
            expect(response.body).to.have.property('dateTime').that.matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
        });
    });

    it('Deve retornar erro MSG-CARTOES-E-100013 quando operadora não existe ou está inativa', function () {
        Estacao.listarEstacoesPorOperadora(99999).then((response) => {
            // Valida o status HTTP
            expect(response.status).to.eq(400);

            // Valida que o corpo é um objeto (não array)
            expect(response.body).to.be.an('object').and.not.empty;

            // Valida campos obrigatórios do erro
            expect(response.body).to.have.property('code', 'MSG-CARTOES-E-100013');
            expect(response.body).to.have.property('message').that.is.a('string').and.not.empty;
            expect(response.body.message).to.include('Não há operadoras ativas homologadas ao KIM.');

            // Opcional: valida outros campos
            expect(response.body).to.have.property('status', 400);
            expect(response.body).to.have.property('description', 'Bad Request');
            expect(response.body).to.have.property('dateTime').that.matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
        });
    });

    it('Deve falhar sem token de autenticação', function () {
        // Simula requisição sem token (você pode sobrescrever o env ou usar cy.request direto)
        cy.request({
            method: 'GET',
            url: `${Cypress.config('baseUrl')}/cartao/api/v1/estacoes/operadora?idOperadora=85`,
            headers: {
                'accept': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('Deve validar tipos e obrigatoriedade dos campos na resposta', function () {
        Estacao.listarEstacoesPorOperadora(85).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').and.not.empty;

            // Acesse o primeiro (e único) objeto da lista
            const operadora = response.body[0];

            // Valida as chaves do objeto da operadora
            expect(operadora).to.have.all.keys('idOperadora', 'operadora', 'estacoes');
            expect(operadora.idOperadora).to.be.a('number');
            expect(operadora.operadora).to.be.a('string').and.not.empty;

            // Valida a lista de estações
            expect(operadora.estacoes).to.be.an('array').and.not.empty;
            const estacao = operadora.estacoes[0];

            // Valida as chaves de uma estação
            expect(estacao).to.have.all.keys(
                'codigoEstacao',
                'codigoEstacaoExterno',
                'descricaoEstacao',
                'enderecoEstacao',
                'valorTarifa'
            );

            expect(estacao.codigoEstacao).to.be.a('number');
            expect(estacao.codigoEstacaoExterno).to.be.a('string').and.not.empty;
            expect(estacao.descricaoEstacao).to.be.a('string').and.not.empty;
            expect(estacao.enderecoEstacao).to.be.a('string').and.not.empty;
            expect(estacao.valorTarifa).to.be.a('number');
        });
    });
});