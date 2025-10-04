// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function CartaoExtratoOperadoraGET(
    numeroCartao,
    dataUsoInicial,
    dataUsoFinal,
    codigoCargaInicial,
    codigoCargaFinal,
    timeout = 30000,

) {
    return cy.api({
        method: 'GET',
        url: `cartao/api/v1/cartao/extrato`,
        qs: {
            numeroCartao,
            dataUsoInicial,
            dataUsoFinal,
            codigoCargaInicial,
            codigoCargaFinal
        },
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false,
        timeout
    });
}

// 🔹 Exportando todos
export {
    CartaoExtratoOperadoraGET
};