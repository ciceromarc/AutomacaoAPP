// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function CartaoTransporteusuario(tipoCartao, statusCartao) {
    const url = `cartao/api/v1/cartao?tipoCartao=${tipoCartao}&statusCartao=${statusCartao}`;
    return cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false // Se você quiser capturar status diferentes de 2xx
    });
}
export { CartaoTransporteusuario };
