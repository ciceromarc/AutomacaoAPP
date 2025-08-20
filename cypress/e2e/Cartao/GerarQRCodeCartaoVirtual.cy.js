import * as GETBooks from '../../integration/services/Books/requests/GETBooks.request';

describe('[CARTÕES] Gerar QRCODE de cartão virtual para um usuário', () => {
    
    it.skip('Gerar QR Code para um cartão virtual existente e vinculado', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Gerar QR Code sem informar idCartao (retorna todos os cartões virtuais do usuário)', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Requisição sem token de autenticação', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Requisição com token inválido', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('idCartao informado com valor inválido (não numérico)', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });


    it.skip('idCartao informado não existe na base de dados', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('idCartao é de um cartão físico', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('idCartao pertence a outro usuário', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Verificar estrutura do QR Code gerado', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it.skip('Cartão virtual inativo não deve retornar QR Code', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

});