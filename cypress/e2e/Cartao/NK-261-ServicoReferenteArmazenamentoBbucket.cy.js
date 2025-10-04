import { uploadArquivo } from '../../integration/services/Cartao/requests/POST_ServicoReferenteArmazenamentoBbucket.request';

describe('Upload de Arquivo', () => {
    beforeEach(function () {
        cy.fixture('cartoes').as('cartoes');
        cy.ObterToken(); // Deve definir Cypress.env('token')
    });

    it('Deve fazer upload de arquivo com sucesso e retornar mensagem de confirmação', function () {
        const nomeArquivo = 'Keycloak.feature'; // deve estar em cypress/fixtures/

        uploadArquivo(nomeArquivo, 'arquivos').then((response) => {
            expect(response.status).to.eq(200);
            cy.log('Resposta bruta:', response.body);



        });
    });
});