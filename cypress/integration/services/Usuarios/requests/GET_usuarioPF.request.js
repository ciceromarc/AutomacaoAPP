// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function UsuarioPessoaFisica() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/logado',
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
        url: 'usuario/api/v1/usuarios/logado',
        headers: {
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}


function UsuarioPessoaFisicaContatoTokenExpirado() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/logado',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVWUt3R1hsRVRleHdhNTVacExteVhibzltMm5lVmhhcjctd2Fib2k4LWlrIn0.eyJleHAiOjE3NTU3Mjg4MzMsImlhdCI6MTc1NTcyODUzMywianRpIjoiN2Q1ZDc1MTctNzk1My00NzczLTk5NDEtMTNmZmY2Y2RmZjc3IiwiaXNzIjoiaHR0cHM6Ly9raW0taWRwLWRldi51c2VraW0uY29tLmJyL3JlYWxtcy9raW0tdHN0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjM1OWY4NDU4LWNkY2UtNDY2YS1iZjg2LTdkYjYyNmNlYTcxYSIsInR5cCI6IkJlYXJlciIsImF6cCI6Ik1JQ1JPU0VSVklDRV9DQVJUQU8iLCJzaWQiOiIyM2RhMTcxMS1hMjg0LTQyNjItODUwNC1iNDgzMDUyMTIwY2QiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWtpbS10c3QiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJDaWNlcm8gU2lsdmEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJjaWNlcm8iLCJnaXZlbl9uYW1lIjoiQ2ljZXJvIiwiZmFtaWx5X25hbWUiOiJTaWx2YSIsImVtYWlsIjoiY2ljZXJvLnNpbHZhQHNxdWFkcmEuY29tLmJyIn0.i1une-DdGb_MgHQJesgv5Yr1V27zudYrcmGl9WHLAHqivOAJL0sGzY7-vvsUqj6NVOhhYdSHMtT8-zQt_1tKxXAmPmCzOLanRk8fAVKbWS2dXPDWMj7v-aURTzr-WZW_XIT-Pk5CRnarnHYCJGuAl0ygk-7H2fj0NZkQTIABkXAFMpgttL59Hcft0kPRzZ50EAzF29bWpztkxiUwsJoSAk6QnLJptwkdba0RG_iv_xs3-u8tdRT_3z687py8Fph-OjDktGP7vY7LrGNgWpZkd62Y5_n2EgcaFV-fWU75_cGT8nh6sXTehOgEZvHwySTXoZHzwh4Ex-sDi4Rerklpiw`
        },
        failOnStatusCode: false
    });
}

//UsuarioPessoaFisicaFormatoInvalidoToken
function UsuarioPessoaFisicaFormatoInvalidoToken() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/logado',
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
        url: 'usuario/api/v1/usuarios/logado',
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
        url: 'usuario/api/v1/usuarios/logado',
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
        url: 'usuario/api/v1/usuarios/logado',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${Cypress.env('token2')}`
        },
        failOnStatusCode: false
    });
}


//UsuarioDesativadoLogicamente
function UsuarioDesativadoLogicamente() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/logado',
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
        url: 'usuario/api/v1/usuarios/logado',
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
        url: 'usuario/api/v1/usuarios/logado',
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
        url: 'usuario/api/v1/usuarios/logado',
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
        url: 'usuario/api/v1/usuarios/logado',
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
export { UsuarioPessoaFisicaContatoTokenExpirado };