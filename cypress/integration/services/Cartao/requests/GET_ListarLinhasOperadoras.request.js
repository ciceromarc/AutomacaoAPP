// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function ListarLinhasPorOperadora(idOperadora) {
    const url = `cartao/api/v1/linhas/operadora${idOperadora != null ? `?idOperadora=${idOperadora}` : ''}`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    });
}



// 🔹 Exportando todos
export { ListarLinhasPorOperadora };