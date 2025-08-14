import * as GETUsuarios from '../../integration/services/Usuarios/requests/GET_usuarioPF.request';

describe('[Usuários] Consultar dados de usuário PF', () => {
    it('Consulta de dados de contato com sucesso', () => {
        GETUsuarios.UsuarioPessoaFisica().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            console.log(response.status);
        });
    });

    it('CPF retornado com 11 dígitos numéricos', () => {
        GETBooks.allBooks().then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.not.be.null;
            console.log(response.status);
        });
    });

    it('Status da conta retornado corretamente', () => {
        GETBooks.allBooks().then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.not.be.null;
            console.log(response.status);
        });
    });

    it('Token não fornecido no header', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Token inválido (formato incorreto)', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });


    it('Token expirado', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Token com formato Bearer incorreto', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Usuário não encontrado na base de dados', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Token válido, mas usuário desativado logicamente', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('nomeCompleto com mais de 100 caracteres (corte esperado)', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('email com mais de 150 caracteres (erro de consistência)', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('numeroCelular com menos de 13 dígitos', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });
    it('CPF com menos de 11 dígitos', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });
    it('Não deve retornar dados sensíveis', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });
    it('Acesso cruzado entre usuários é proibido', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });
    it('Erro ao acessar banco de dados', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });
    it('Alta latência na resposta', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });
    it('Campo email deve estar em formato válido', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });

    it('Resposta em formato JSON válido', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.status).to.be.eq(400);
            expect(response.body).to.be.not.null;
            console.log(response.status)
        })
    });


});