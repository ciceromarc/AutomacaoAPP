/// <reference types="cypress" />
import * as Cartao from '../../integration/services/Cartao/requests/GET_Saldo.request';


describe('[CARTÕES] Listar cartões de transporte', () => {
    beforeEach(() => {
        cy.ObterToken();
    });
  
    it('Requisição sem token de autenticação', () => {
        Cartao.ConsultarSaldoCartaoTransporteSemToken().then((response) => {
            expect(response.status).to.be.eq(403); // Mais apropriado para ausência de token
            expect(response.body).to.be.not.null;
            expect(response.body).to.have.property('codigo', 'GLB-E-100000');
            // Ou, se o código estiver dentro de um objeto de erro:
            // expect(response.body.erro).to.have.property('codigo', 'GLB-E-100000');
            expect(response.body).to.not.be.null;
            cy.log(JSON.stringify(response.status));
            cy.log(JSON.stringify(response.body));
            console.log('Status:', response.status);
            console.log('Resposta:', response.body);
        });
    });

    it('Requisição com token inválido', () => {
            Cartao.ConsultarSaldoCartaoTransporteTokenInvalido().then((response) => {
            expect(response.status).to.be.eq(403); // Mais apropriado para ausência de token
            expect(response.body).to.be.not.null;
            expect(response.body).to.have.property('codigo', 'GLB-E-100000');
            // Ou, se o código estiver dentro de um objeto de erro:
            // expect(response.body.erro).to.have.property('codigo', 'GLB-E-100000');
            expect(response.body).to.not.be.null;
            cy.log(JSON.stringify(response.status));
            cy.log(JSON.stringify(response.body));
            console.log('Status:', response.status);
            console.log('Resposta:', response.body);
        });
    });
 

});