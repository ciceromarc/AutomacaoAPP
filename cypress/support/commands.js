// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands.add('loginApi', () => {
//   cy.request({
//     method: 'POST',
//     url: 'https://kim-idp-dev.usekim.com.br/realms/kim-tst/protocol/openid-connect/token',
//     body: {
//       email: 'cicero',
//       password: '123456',
//     }
//   }).then((response) => {
//     expect(response.status).to.eq(200);
//     const token = response.body.token;

//     // Armazena o token como variável de ambiente
//     Cypress.env('token', token);

//     // Ou apenas retorna o token (se quiser usar no then)
//     return token;
//   });
// });

Cypress.Commands.add('ObterToken', () => {
  cy.request({
    method: 'POST',
    url: 'https://kim-idp-dev.usekim.com.br/realms/kim-tst/protocol/openid-connect/token',
    form: true, // importante: envia como x-www-form-urlencoded
    body: {
      grant_type: 'password',
      client_id: 'MICROSERVICE_USUARIO',
      client_secret: 'XQdTOozAlhwcHlRlmbwQkYGF3oCUfOly', // opcional, só se o client exigir
      username: 'cicero',
      password: '123456'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    const token = response.body.access_token;
    Cypress.env('token', token);
    return token;
  });
});




Cypress.Commands.add('ObterTokenUsuarioSemCadastro', () => {
  cy.request({
    method: 'POST',
    url: 'https://kim-idp-dev.usekim.com.br/realms/kim-tst/protocol/openid-connect/token',
    form: true, // importante: envia como x-www-form-urlencoded
    body: {
      grant_type: 'password',
      client_id: 'MICROSERVICE_USUARIO',
      client_secret: 'XQdTOozAlhwcHlRlmbwQkYGF3oCUfOly', // opcional, só se o client exigir
      username: 'admin.teste',
      password: '12345678'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    const token2 = response.body.access_token;
    Cypress.env('token2', token2);
    return token2;
  });
});