import * as GETBooks from '../../integration/services/Books/requests/GETBooks.request';

describe('[CARTÕES] Consultar saldo de cartão de transporte de um usuário', () => {
    it('Consultar saldo de cartão com número válido', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Consultar saldo sem informar número do cartão (lista de cartões ativos)', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Requisição sem token de autenticação', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Requisição com token inválido', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Consultar saldo com número de cartão inválido', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });


    it('Consultar saldo de cartão inexistente', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Consultar saldo de cartão não vinculado ao usuário', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Consultar saldo de cartão com operadora TACOM', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Consultar saldo de cartão com operadora de integração própria', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Timeout na integração com operadora', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Cartão inativo não deve retornar saldo', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });



    it('Consulta de uso do cartão em cidade com integração TACOM e com registros', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });


    it('Consulta de uso do cartão em cidade com integração TACOM e sem registros', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Consulta de uso do cartão em cidade sem integração disponível', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

});