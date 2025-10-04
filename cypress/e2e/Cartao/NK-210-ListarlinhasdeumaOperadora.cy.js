/// <reference types="cypress" />
import * as Cartao from '../../integration/services/Cartao/requests/GET_ListarLinhasOperadoras.request.js';
describe('Operadora - Listar Linhas', () => {
    beforeEach(function () {
        cy.ObterTokenCartaoTransporte(); // Garante token válido antes de cada teste
    });


    it('Deve listar as linhas de uma operadora válida com sucesso', function () {
        const idOperadora = 85;

        Cartao.ListarLinhasPorOperadora(idOperadora).then((response) => {
            // Verifica o status
            expect(response.status).to.eq(200);

            // A resposta é SEMPRE um array
            expect(response.body).to.be.an('array');
            expect(response.body).to.not.be.empty;

            // Como filtramos por idOperadora, esperamos exatamente 1 operadora
            const operadora = response.body[0];

            // Valida os campos da operadora
            expect(operadora).to.have.property('idOperadora').that.eq(idOperadora);
            expect(operadora).to.have.property('operadora').that.is.a('string').and.not.empty;
            expect(operadora).to.have.property('linhas').that.is.an('array').and.not.empty;

            // Valida cada linha dentro de "linhas"
            operadora.linhas.forEach(linha => {
                expect(linha).to.have.property('codigoLinha').that.is.a('number'); // ou string? veja resposta real
                expect(linha).to.have.property('codigoLinhaExterno').that.is.a('string');
                expect(linha).to.have.property('descricaoLinha').that.is.a('string').and.not.empty;
                expect(linha).to.have.property('valorTarifa').that.is.a('number').and.gte(0); // nome real: valorTarifa
            });
        });
    });

    it('Deve listar todas as linhas quando idOperadora não é informado', function () {
        Cartao.ListarLinhasPorOperadora(null).then((response) => {
            // Requisição bem-sucedida
            expect(response.status).to.eq(200);

            // A resposta é um ARRAY de operadoras (não um objeto com "Lista")
            expect(response.body).to.be.an('array');

            // Valida que não está vazio (opcional, dependendo do ambiente)
            expect(response.body).to.not.be.empty;

            // Valida a estrutura de cada operadora no array
            response.body.forEach(operadora => {
                expect(operadora).to.have.property('idOperadora').that.is.a('number');
                expect(operadora).to.have.property('operadora').that.is.a('string').and.not.empty;
                expect(operadora).to.have.property('linhas').that.is.an('array');

                // Valida cada linha dentro de "linhas"
                operadora.linhas.forEach(linha => {
                    expect(linha).to.have.property('codigoLinha');
                    expect(linha).to.have.property('codigoLinhaExterno').that.is.a('string');
                    expect(linha).to.have.property('descricaoLinha').that.is.a('string').and.not.empty;
                    expect(linha).to.have.property('valorTarifa').that.is.a('number');
                });
            });
        });
    });

it('Deve retornar erro quando idOperadora é inválido/inexistente', function () {
    const idOperadoraInexistente = 999999;

    Cartao.ListarLinhasPorOperadora(idOperadoraInexistente).then((response) => {
        // Valida o status HTTP
     // Valida o status HTTP
        expect(response.status).to.eq(400);

        // ✅ Validação EXATA do código de erro (importante para contratos)
        expect(response.body).to.have.property('code').that.eq('MSG-CARTOES-E-100013');

        // ✅ Validação EXATA da mensagem (ou parcial, se houver variação)
        expect(response.body).to.have.property('message')
            .that.eq('Não há operadoras ativas homologadas ao KIM.');

        // Opcional: validar outros campos padrão
        expect(response.body).to.have.property('status').that.eq(400);
        expect(response.body).to.have.property('description').that.eq('Bad Request');
        expect(response.body).to.have.property('dateTime').that.is.a('string');

        // Valida a estrutura completa do corpo de erro
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('code').that.is.a('string');
        expect(response.body).to.have.property('message').that.is.a('string');
        expect(response.body).to.have.property('description').that.eq('Bad Request');
        expect(response.body).to.have.property('status').that.eq(400);
        expect(response.body).to.have.property('dateTime').that.is.a('string');

        // Valida conteúdo específico da mensagem (mais robusto que só "includes")
        expect(response.body.message).to.satisfy((msg) =>
            msg.includes('operadora') || 
            msg.includes('Operadora') || 
            msg.includes('não há operadoras')
        );
    });
});


});