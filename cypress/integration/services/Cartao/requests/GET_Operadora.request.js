// GET - /cartao/api/v1/operadora . Listar operadoras homologadas com o KIM . request
/// <reference types="cypress" />

/**
 * Função para listar operadoras homologadas com o KIM
 * @param {Object} qs - Parâmetros de filtro (opcional): nomeFantasia, numeroCnpj, sigla, idCidade, etc.
 * @param {string} [idOperadora='1'] - ID da operadora para header (padrão: '1')
 * @param {number} [timeout=30000] - Tempo máximo para a requisição (ms)
 * @returns {Cypress.Chainable<Response>}
 */
function listarOperadoras(qs = {}, idOperadora = '1', timeout = 30000) {
    const url = `cartao/api/v1/operadora`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'idOperadora': idOperadora,
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        qs: qs,
        failOnStatusCode: false,
        timeout: timeout
    });
}

export { listarOperadoras };