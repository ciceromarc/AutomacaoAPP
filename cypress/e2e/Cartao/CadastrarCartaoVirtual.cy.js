import * as GETBooks from '../../integration/services/Books/requests/GETBooks.request';

describe('[CARTÕES] DIS Cadastrar cartão virtual', () => {
    it.skip('Cadastro realizado com sucesso', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Cadastro com apelido personalizado', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Token não informado', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Token inválido ou expirado', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Parâmetro obrigatório ausente', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });


    it.skip('Erro na geração do número do cartão virtual', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Tentativa de vincular cartão virtual já cadastrado (usuário diferente)', () => {
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

    it.skip('Geração de número de cartão virtual único', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Cartão virtual já existente vinculado ao usuário (tentativa de duplicação)', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Cadastro com apelido vazio ou em branco', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });



    it.skip('Cadastro com parâmetros extras não esperados', () => {
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