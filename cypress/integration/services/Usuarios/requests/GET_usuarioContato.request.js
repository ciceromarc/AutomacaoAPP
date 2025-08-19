// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function UsuarioPessoaFisicaContato() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/contato',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    });
}


//UsuarioPessoaFisicaContatoSemToken
function UsuarioPessoaFisicaContatoSemToken() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/contato',
        headers: {
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

//UsuarioPessoaFisicaContatoFormatoInvalidoToken
function UsuarioPessoaFisicaContatoFormatoInvalidoToken() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/contato',
        headers: {
            'accept': 'application/json',
            Authorization: `${Cypress.env('token')} 1`
        },
        failOnStatusCode: false
    });
}


function UsuarioPessoaFisicaContatoSemAutorizacaoAcesso() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/contato',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}a`
        },
        failOnStatusCode: false
    });
}

function UsuarioPessoaFisicaContatoSimulaErroBanco() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/contato',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer1 ${Cypress.env('token')}`,
            'x-simular-erro': 'banco.faker'
        },
        failOnStatusCode: false
    });
}




export { UsuarioPessoaFisicaContato };
export { UsuarioPessoaFisicaContatoSemToken };
export { UsuarioPessoaFisicaContatoFormatoInvalidoToken };
export { UsuarioPessoaFisicaContatoSemAutorizacaoAcesso };
export { UsuarioPessoaFisicaContatoSimulaErroBanco };