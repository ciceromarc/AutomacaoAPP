// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function UsuarioPessoaFisica() {
    return cy.api({
        method: 'GET',
        url: 'usuario/api/v1/usuarios/detalhes/359f8458-cdce-466a-bf86-7db626cea71a',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVWUt3R1hsRVRleHdhNTVacExteVhibzltMm5lVmhhcjctd2Fib2k4LWlrIn0.eyJleHAiOjE3NTUxODkyNTQsImlhdCI6MTc1NTE4ODk1NCwianRpIjoiMGEzY2Y5NmMtZTdkYS00ZTRkLWFhYWQtMzIzNGM0ZjRmODU3IiwiaXNzIjoiaHR0cHM6Ly9raW0taWRwLWRldi51c2VraW0uY29tLmJyL3JlYWxtcy9raW0tdHN0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjM1OWY4NDU4LWNkY2UtNDY2YS1iZjg2LTdkYjYyNmNlYTcxYSIsInR5cCI6IkJlYXJlciIsImF6cCI6Ik1JQ1JPU0VSVklDRV9VU1VBUklPIiwic2lkIjoiNzlkZDMyZDItZWY2Ny00MmZlLWE1ODMtMTQxZDkyMTI0ZTY2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1raW0tdHN0Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQ2ljZXJvIFNpbHZhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiY2ljZXJvIiwiZ2l2ZW5fbmFtZSI6IkNpY2VybyIsImZhbWlseV9uYW1lIjoiU2lsdmEiLCJlbWFpbCI6ImNpY2Vyby5zaWx2YUBzcXVhZHJhLmNvbS5iciJ9.c2ZFsDFOzkfhRgOmqXwY6g86Ou-To8iWfSIwUUS2h94IDrMT1PfrFyheJQZvczjTA69cXQdpGEKzg6Jm3F5Q2EVfNSawy8Pr7Ewvj_CindVa39D5n8MgmUXQq2obIjvQeYepen4iwQ9_71MYPpx7P7-Ych6vmErMOFtU_Dibc6cZI9Wc4z0LaJsfpHoJVx8JrGdvlhPvfNOX3_4oCqHDBWdrW_MOBhFT9M-LvXTGH6im-ykPdww_kPV9lRl3RuO9p3Ff0vHUnNAvYX8E3eisIXpkBMfEUUTZdE1ZNVoyFiOfIe0Qexdt2jUAFS1CS7IBNogvy8asmA79Sw0I_lW3Ng'
        },
        failOnStatusCode: false
    });
}

export { UsuarioPessoaFisica };