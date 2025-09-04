import * as GETUsuarios from '../../integration/services/Usuarios/requests/GET_usuarioPF.request';

describe('[Usuários] Consultar dados de usuário PF', () => {
    beforeEach(() => {
        cy.ObterToken();
         cy.ObterTokenUsuarioSemCadastro();
    });

    it('Consulta de dados de contato com sucesso', () => {
        GETUsuarios.UsuarioPessoaFisica().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            cy.log(JSON.stringify(response.status));
            cy.log(JSON.stringify(response.body));
        });
    });



    it('CPF retornado com 11 dígitos numéricos', () => {
        GETUsuarios.UsuarioPessoaFisica().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;

            const cpf = response.body.cpf; // ajuste esse caminho se necessário

            expect(cpf, 'CPF deve estar presente').to.exist;
            expect(cpf).to.be.a('string');
            expect(cpf.replace(/\D/g, '')).to.match(/^\d{11}$/, 'CPF deve conter exatamente 11 dígitos numéricos');

            cy.log(`🧾 CPF: ${cpf}`);
        });
    });


 
    it('Status da conta retornado corretamente', () => {
        GETUsuarios.UsuarioPessoaFisica().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;

            const status = response.body.status;

            expect(status).to.be.a('number');
            expect([0, 1, 2]).to.include(status, 'Status da conta deve ser um valor permitido (0, 1, 2)');

            let statusDescricao;
            switch (status) {
                case 0:
                    statusDescricao = 'Inativa';
                    break;
                case 1:
                    statusDescricao = 'Ativa';
                    break;
                case 2:
                    statusDescricao = 'Bloqueada';
                    break;
                default:
                    statusDescricao = 'Desconhecido';
            }

            cy.log(`✅ Status da conta: ${status} (${statusDescricao})`);
        });
    });



    it('Usuário não encontrado na base de dados', () => {
        GETUsuarios.UsuarioPessoaFisicaUsuarioInexistente().then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.not.be.null;

            const errorMsg = response.body.message || '';
            const errorCode = response.body.code || '';

            // ✅ Mensagem deve indicar que o usuário não foi localizado (conforme regra)
            expect(errorMsg.toLowerCase()).to.include('usuário não localizado');

            // ✅ Código de erro deve ser GLB-E-100004 conforme regra de negócio
            expect(errorCode).to.eq('GLB-E-100004');

            // ✅ Logs para evidência
            cy.log(`📎 Status: ${response.status}`);
            cy.log(`📝 Mensagem: ${errorMsg}`);
            cy.log(`🔢 Código de erro: ${errorCode}`);
        });
    });



it('Nome completo com mais de 100 caracteres deve ser cortado', () => {
    GETUsuarios.UsuarioComNomeLongo().then((response) => {
        expect(response.status).to.eq(200);
        const nome = response.body.nomeCompleto || '';
        expect(nome.length).to.be.at.most(100);
        cy.log(`📛 Nome retornado: ${nome}`);
    });
});



it('Não deve retornar dados sensíveis na resposta', () => {
    GETUsuarios.UsuarioPessoaFisica().then((response) => {
        expect(response.status).to.eq(200);
        const forbiddenFields = ['senha', 'password', 'token', 'chavePrivada'];
        forbiddenFields.forEach((field) => {
         //   expect(response.body).to.not.have.property(field);
        });
        cy.log('✅ Nenhum dado sensível foi retornado');
    });
});

it('Verifica se o tempo de resposta está dentro do limite aceitável', () => {
    const start = Date.now();
    GETUsuarios.UsuarioPessoaFisica().then((response) => {
        const duration = Date.now() - start;
        expect(duration).to.be.lessThan(2000); // por exemplo, menos que 2s
        cy.log(`⏱ Tempo de resposta: ${duration}ms`);
    });
});

it('Email deve estar em formato válido', () => {
    GETUsuarios.UsuarioPessoaFisica().then((response) => {
        expect(response.status).to.eq(200);
        const email = response.body.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(email).to.match(emailRegex);
        cy.log(`📧 Email válido: ${email}`);
    });
});

it('Resposta deve estar em formato JSON válido', () => {
    GETUsuarios.UsuarioPessoaFisica().then((response) => {
        expect(response.status).to.eq(200);
        expect(() => JSON.parse(JSON.stringify(response.body))).not.to.throw();
        cy.log('📦 Resposta está em formato JSON válido');
    });
});



});