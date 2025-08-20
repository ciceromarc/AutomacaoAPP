// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function UsuarioPessoaFisica() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/359f8458-cdce-466a-bf86-7db626cea71a',
                    headers: {
            'accept': 'application/json',
                Authorization: `Bearer ${Cypress.env('token')}`
            },
        failOnStatusCode: false
    });
}

//UsuarioPessoaFisicaSemToken
function UsuarioPessoaFisicaSemToken() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/359f8458-cdce-466a-bf86-7db626cea71a',
        headers: {
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

//UsuarioPessoaFisicaFormatoInvalidoToken
function UsuarioPessoaFisicaFormatoInvalidoToken() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/359f8458-cdce-466a-bf86-7db626cea71a',
        headers: {
            'accept': 'application/json',
            Authorization: `${Cypress.env('token')} 1`
        },
        failOnStatusCode: false
    });
}

function UsuarioPessoaFisicaSemAutorizacaoAcesso() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/359f8458-cdce-466a-bf86-7db626cea71a',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer1 ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    });
}

function UsuarioPessoaFisicaSimulaErroBanco() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/359f8458-cdce-466a-bf86-7db626cea71a',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer1 ${Cypress.env('token')}`,
            'x-simular-erro': 'banco.faker'
        },
        failOnStatusCode: false
    });
}

function UsuarioPessoaFisicaUsuarioInexistente() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/359f8458-cdce-466a-bf86-7db626cea71a111',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    });
}


//UsuarioDesativadoLogicamente
function UsuarioDesativadoLogicamente() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/11111111111111111',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    });
}

//UsuarioComNomeLongo

function UsuarioComNomeLongo() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/b8ab7071-7086-4253-bc3b-76ecc898da20',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    });
}

//UsuarioComEmailInvalido

function UsuarioComEmailInvalido() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/b8ab7071-7086-4253-bc3b-76ecc898da20',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    });
}

//UsuarioComCelularInvalido

function UsuarioComCelularInvalido() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/b8ab7071-7086-4253-bc3b-76ecc898da20',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    });
}

//UsuarioComCPFInvalido
function UsuarioComCPFInvalido() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/b8ab7071-7086-4253-bc3b-76ecc898da20',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    });
}


export { UsuarioPessoaFisica };
export { UsuarioPessoaFisicaSemToken };
export { UsuarioPessoaFisicaFormatoInvalidoToken };
export { UsuarioPessoaFisicaSemAutorizacaoAcesso };
export { UsuarioPessoaFisicaSimulaErroBanco };
export { UsuarioPessoaFisicaUsuarioInexistente };
export { UsuarioDesativadoLogicamente };
export { UsuarioComNomeLongo };
export { UsuarioComEmailInvalido };
export { UsuarioComCelularInvalido };
export { UsuarioComCPFInvalido };