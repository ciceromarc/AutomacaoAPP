// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function UsuarioPessoaFisicaContato() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/contato',
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
        url: 'usuario/api/v1/usuarios/contato',
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
        url: 'usuario/api/v1/usuarios/contato',
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
        url: 'usuario/api/v1/usuarios/contato',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${Cypress.env('token2')}`
        },
        failOnStatusCode: false
    });
}

function UsuarioPessoaFisicaContatoComTokenExpirado() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/contato',
        headers: {
            'accept': 'application/json',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVWUt3R1hsRVRleHdhNTVacExteVhibzltMm5lVmhhcjctd2Fib2k4LWlrIn0.eyJleHAiOjE3NTU4Mzg3ODAsImlhdCI6MTc1NTgwMjc4MCwianRpIjoiMzY2ZjU0YTgtOTk4Ny00MjJkLWJiZjItYzkwMjQxMWE5MDQ4IiwiaXNzIjoiaHR0cHM6Ly9raW0taWRwLWRldi51c2VraW0uY29tLmJyL3JlYWxtcy9raW0tdHN0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjNlMDEzYmQzLWFmZTctNDcwYS05MDYxLTZiZTZjNmQ5MWI3ZiIsInR5cCI6IkJlYXJlciIsImF6cCI6Ik1JQ1JPU0VSVklDRV9VU1VBUklPIiwic2lkIjoiM2U5Y2VjNTctZjdjNy00MzY2LTg3NzktZDY5ZjBjMTQ3MTIxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1raW0tdHN0Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQWRtaW4gdGVzdGUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbi50ZXN0ZSIsImdpdmVuX25hbWUiOiJBZG1pbiIsImZhbWlseV9uYW1lIjoidGVzdGUiLCJlbWFpbCI6InZpbmljaXVzLmR1YXJ0ZUBzcXVhZHJhLmNvbS5iciJ9.HkdJYmluiP7DvzJkBg67xQqWOeHK0S8aWzbNejQdQ34ARW3vc4-7jUGoEO7p4sonXPEp3aBauntVrfel_q7D27MVgkjYsiS11Vj9VmmpOt8_HSRrNrtKFYTRK5xpwpHfvNE3kzb1zTt9kVfufpKBG33Mpua3aKHBBaqhgHOtiBSS4eP-UlPCUMEtVzD_tKxN7_tnbCt6CcB_0dsGMEntSOao378nDe3QFvaUqt4HRWAd6GkOiyaKqens6yv52yd2AD6aHZ0XP7GeTVYtEBt__wCZ9luMb86iBxqt_8PzcDf_PROZPTWvTQVMnnYU22gB6OxryHa2bh6WKTv73EtFRw`
        },
        failOnStatusCode: false
    });
}



function UsuarioPessoaFisicaContatoSimulaErroBanco() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/contato',
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
export { UsuarioPessoaFisicaContatoComTokenExpirado };
