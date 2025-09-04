// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function CartaoTransporteusuario(tipoCartao) {
    const url = `cartao/api/v1/cartao?tipoCartao=${tipoCartao}`;
    return cy.request({
        method: 'GET',
        url: url,
         headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false // Se você quiser capturar status diferentes de 2xx
    });
}
export { CartaoTransporteusuario };
