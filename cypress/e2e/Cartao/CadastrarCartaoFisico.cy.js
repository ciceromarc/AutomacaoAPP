import * as GETBooks from '../../integration/services/Books/requests/GETBooks.request';

describe('[CARTÕES] DIS Cadastrar cartão físico', () => {
    it.skip('Cadastro realizado com sucesso', () => {
        GETBooks.allBooks().then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.not.be.null;
            console.log(response.status);
        });
    });

    it.skip('Token não informado', () => {
        GETBooks.allBooks().then((response) => {
            expect(response.status).to.eq(400);
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            console.log(response.status);
        });
    });

    it.skip('Token não informado - segundo caso', () => {
        GETBooks.allBooks().then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.not.be.null;
            console.log(response.status);
        });
    });

    it.skip('Parâmetro obrigatório ausente', () => {
        GETBooks.allBooks().should((response) => {
           expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Número do cartão é virtual (inválido para este serviço)', () => {
        GETBooks.allBooks().should((response) => {
                expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });


    it.skip('Cartão já vinculado ao usuário', () => {
        GETBooks.allBooks().should((response) => {
                expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Apelido fornecido (campo opcional)', () => {
        GETBooks.allBooks().should((response) => {
                expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Apelido inválido (formato não permitido)', () => {
        GETBooks.allBooks().should((response) => {
                expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Cadastro bem-sucedido mesmo com outros usuários possuindo o mesmo cartão', () => {
        GETBooks.allBooks().should((response) => {
                expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Consulta de uso do cartão em cidade com integração TACOM e com registros', () => {
        GETBooks.allBooks().should((response) => {
                expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Consulta de uso do cartão em cidade com integração TACOM e sem registros', () => {
        GETBooks.allBooks().should((response) => {
                expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Consulta de uso do cartão em cidade sem integração disponível', () => {
        GETBooks.allBooks().should((response) => {
                expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });
});