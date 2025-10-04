/// <reference types="cypress" />

/**
 * Função para listar estações de uma operadora
 * @param {number | string} [idOperadora] - ID da operadora (opcional)
 * @param {number} [timeout=30000] - Tempo máximo para a requisição (ms)
 * @returns {Cypress.Chainable<Response>}
 */
/// <reference types="cypress" />

/**
 * Função para listar estações de uma operadora
 * @param {number | string} [idOperadora] - ID da operadora (opcional). Se não informado, retorna todas as estações de todas as operadoras.
 * @param {number} [timeout=30000] - Tempo máximo para a requisição (ms)
 * @returns {Cypress.Chainable<Response>}
 */
function listarEstacoesPorOperadora(idOperadora, timeout = 30000) {
    const url = 'cartao/api/v1/estacoes/operadora';

    // Monta os query parameters apenas se idOperadora for fornecido
    const qs = {};
    if (idOperadora !== undefined && idOperadora !== null) {
        qs.idOperadora = idOperadora;
    }

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        qs: qs, // ← agora qs está definido
        failOnStatusCode: false,
        timeout: timeout
    });
}

export { listarEstacoesPorOperadora };