/// <reference types = "cypress"/>


function ConsultarSaldoCartaoTransporte(numeroCartao, doctoIdentificacao, idOperadora = '1', timeout = 30000) {
    const url = `cartao/api/v1/cartao/saldo?numeroCartao=${numeroCartao}&doctoIdentificacao=${doctoIdentificacao}`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'idOperadora': idOperadora,
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false,
        timeout: timeout // Define o tempo máximo para a requisição
    });
}

export { ConsultarSaldoCartaoTransporte };