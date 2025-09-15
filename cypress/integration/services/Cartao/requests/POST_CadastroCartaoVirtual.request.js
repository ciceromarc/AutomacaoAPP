/// <reference types="cypress" />

function CadastrarCartaoVirtual(operadora, cpf, apelido = null, timeout = 30000) {
    const url = `cartao/api/v1/cartao/virtual`; // Caminho relativo, assumindo baseUrl configurada

    const body = {
        operadora,
        cpf,
        apelido
    };

    if (apelido !== null && apelido !== undefined) {
        body.apelido = apelido;
    }
    return cy.api({
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        body: body,
        failOnStatusCode: false,
        timeout: timeout
    });
}
export { CadastrarCartaoVirtual };