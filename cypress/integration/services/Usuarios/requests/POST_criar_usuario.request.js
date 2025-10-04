/// <reference types="cypress"/>

import { generateValidCPF, generateRandomEmail } from '../../../../support/utils';

function CriarUsuario(
    nomeCompleto = "TESTE AUTOMATICO CYPRESS",
    cpf = generateValidCPF(),
    email = generateRandomEmail(),
    numeroCelular = "5561985455454",
    dataNascimento = "2000-09-23"
    //senha = "Senha@123" // Adicionado conforme documentação exige senha
) {
    return cy.api({
        method: 'POST',
        url: 'usuario/api/v1/usuarios',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'Content-Type': 'application/json'
        },
        body: {
            nomeCompleto,
            cpf,
            email,
            numeroCelular,
            dataNascimento
          //  senha // Campo obrigatório conforme doc
        },
        failOnStatusCode: false
    });
}


/// <reference types="cypress"/>

function CriarUsuarioComTokenInvalido(
    nomeCompleto = "TOKEN INVALIDO",
    cpf = "12345678909",
    email = "token.invalido@teste.com.br",
    numeroCelular = "5561985455454",
    dataNascimento = "2000-09-23",
    senha = "Senha@123"
) {
    return cy.api({
        method: 'POST',
        url: 'usuario/api/v1/usuarios',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer token_invalido_qualquer_coisa',
            'Content-Type': 'application/json'
        },
        body: {
            nomeCompleto,
            cpf,
            email,
            numeroCelular,
            dataNascimento,
            senha
        },
        failOnStatusCode: false
    });
}


/// <reference types="cypress"/>

function CriarUsuarioSemToken(
    nomeCompleto = "SEM TOKEN",
    cpf = generateValidCPF(),
    email = generateRandomEmail(),
    numeroCelular = "5561985455454",
    dataNascimento = "2000-09-23"
) {
    return cy.api({
        method: 'POST',
        url: 'usuario/api/v1/usuarios',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
            // Authorization intencionalmente OMITIDO
        },
        body: {
            nomeCompleto,
            cpf,
            email,
            numeroCelular,
            dataNascimento
              // senha: "Senha@123" // Adicionado conforme documentação exige senha
        },
        failOnStatusCode: false
    });
}



export { CriarUsuario, CriarUsuarioComTokenInvalido, CriarUsuarioSemToken };

// ⚠️ IMPORTANTE: A documentação menciona que senha é obrigatória, mas seu CURL original não enviava. Adicionei no corpo da requisição. 
// Se na prática não for necessário, remova do body. 