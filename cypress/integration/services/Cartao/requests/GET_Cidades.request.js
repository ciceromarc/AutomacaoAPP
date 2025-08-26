/// <reference types="cypress" />

function ListarCidadesHomologadas(nomeCidade, timeout = 30000) {
    const url = `cartao/api/v1/cidade?nomeCidade=${nomeCidade}`;
                 
    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false,
        timeout: timeout
    });
}

export { ListarCidadesHomologadas };
