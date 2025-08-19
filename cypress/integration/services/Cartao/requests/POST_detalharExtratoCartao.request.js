// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

const payloadDadosCartao = require('../payloads/consulta-extrato-operadora.json');
const payloadDadosCartaoSemRegistro = require('../payloads/consulta-extrato-operadora-sem-registro.json');
const payloadDadosCartaoInvalido = require('../payloads/consulta-extrato-operadora-invalido.json');

function CartaoExtratooperadora() {
    return cy.api({
        method: 'POST',
        url: 'cartao/api/v1/cartao/consultar/operadora/extrato',
        headers: {
            'accept': 'application/json',
            'idOperadora': '85',  // adiciona o header solicitado
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false,
        body: payloadDadosCartao
    });
}

function CartaoSemRegistro() {
    return cy.api({
        method: 'POST',
        url: 'cartao/api/v1/cartao/consultar/operadora/extrato',
        headers: {
            'accept': 'application/json',
            'idOperadora': '85',  // adiciona o header solicitado
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false,
        body: payloadDadosCartaoSemRegistro
    });

}

function CartaoExtratooperadoraTokenInvalido() {
    return cy.api({
        method: 'POST',
        url: 'cartao/api/v1/cartao/consultar/operadora/extrato',
        headers: {
            'accept': 'application/json',
            'idOperadora': '85',  // adiciona o header solicitado
            Authorization: `Bearer ${Cypress.env('token')}1` // token inválido
        },
        failOnStatusCode: false,
        body: payloadDadosCartao
    });
}

//CartaoExtratooperadoraInvalido
function CartaoExtratooperadoraInvalido() {
    return cy.api({
        method: 'POST',
        url: 'cartao/api/v1/cartao/consultar/operadora/extrato',
        headers: {
            'accept': 'application/json',
            'idOperadora': '85',  // adiciona o header solicitado
            Authorization: `Bearer ${Cypress.env('token')}1` // token inválido
        },
        failOnStatusCode: false,
        body: payloadDadosCartaoInvalido
    });
}

export { CartaoSemRegistro };
export { CartaoExtratooperadora };
export { CartaoExtratooperadoraTokenInvalido };
export { CartaoExtratooperadoraInvalido };
