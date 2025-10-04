/// <reference types = "cypress"/>

function ObterSaldoCartao(numeroCartao, doctoIdentificacao, idOperadora = '1', timeout = 30000) {
    const url = `cartao/api/v1/cartao/saldo?numeroCartao=${encodeURIComponent(numeroCartao)}&doctoIdentificacao=${encodeURIComponent(doctoIdentificacao)}`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false,
        timeout: timeout // Define o tempo máximo para a requisição
    });
}

//ObterSaldoCartaoSemToken

function ObterSaldoCartaoSemToken(numeroCartao, doctoIdentificacao, idOperadora = '1', timeout = 30000) {
    const url = `cartao/api/v1/cartao/saldo?numeroCartao=${encodeURIComponent(numeroCartao)}&doctoIdentificacao=${encodeURIComponent(doctoIdentificacao)}&idOperadora=${encodeURIComponent(idOperadora)}`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${Cypress.env('token_sem_token')}`
        },
        failOnStatusCode: false,
        timeout: timeout // Define o tempo máximo para a requisição
    });
}

export { ObterSaldoCartao, ObterSaldoCartaoSemToken };