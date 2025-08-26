// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function CartaoExtratooperadora(numeroCartao, dataUsoInicial, dataUsoFinal, codigoCargaInicial, codigoCargaFinal, idOperadora = '1', timeout = 30000) {
    const url = `cartao/api/v1/cartao/extrato?numeroCartao=${numeroCartao}&dataUsoInicial=${dataUsoInicial}&dataUsoFinal=${dataUsoFinal}&codigoCargaInicial=${codigoCargaInicial}&codigoCargaFinal=${codigoCargaFinal}`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'accept': 'application/json',
            'idOperadora': idOperadora,
            'Authorization': `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false,
        timeout: timeout
    });
}

export { CartaoExtratooperadora };