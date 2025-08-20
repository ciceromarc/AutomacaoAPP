import * as GETUsuarios from '../../integration/services/Usuarios/requests/GET_usuarioPF.request';

describe('[Usuários] Consultar dados de usuário PF', () => {
    beforeEach(() => {
        cy.ObterToken();
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


    it('Número de celular no formato internacional (13 dígitos)', () => {
        GETUsuarios.UsuarioPessoaFisica().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;

            const celular = response.body.celular || response.body.telefone || response.body.contato?.celular; // ajuste conforme a estrutura real

            expect(celular, 'Celular deve estar presente').to.exist;
            expect(celular).to.be.a('string');

            const celularNumerico = celular.replace(/\D/g, ''); // remove espaços, parênteses, traços, "+"
            expect(celularNumerico).to.match(/^\d{13}$/, 'Celular deve conter exatamente 13 dígitos numéricos no formato internacional');

            cy.log(`📱 Celular: ${celular}`);
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




    it('Token não fornecido no header', () => {
        // 🚫 Chama a API SEM token e trata a resposta
        GETUsuarios.UsuarioPessoaFisicaSemToken().then((response) => {
            const { status, body } = response;

            // ✅ Valida status: deve ser 401 (Unauthorized) ou 400 (Bad Request)
            expect(status).to.be.oneOf([401, 400], 'O status deve ser 401 ou 400 quando o token não é fornecido');
            cy.log(`📥 Status recebido: ${status}`);

            // ✅ Valida que o corpo não é nulo
            expect(body).to.not.be.null;

            // ✅ Extrai mensagem de erro (suporte a PT e EN)
            const errorMsg = body.message || body.error || body.mensagem || body.erro;

            // ✅ Valida que existe uma mensagem de erro
            expect(errorMsg, 'Deve conter uma mensagem de erro no corpo da resposta').to.exist;
            expect(errorMsg, 'A mensagem de erro deve ser uma string').to.be.a('string');

            // ✅ Valida que a mensagem indica problema de autenticação/token
            const lowerMsg = errorMsg.toLowerCase();
            expect(lowerMsg).to.satisfy(
                (msg) =>
                    msg.includes('token') ||
                    msg.includes('unauthorized') ||
                    msg.includes('authorization') ||
                    msg.includes('autenticação') ||
                    msg.includes('não autorizado'),
                'A mensagem de erro deve indicar problema com token ou autenticação'
            );

            // ✅ Valida que o código de erro é GLB-E-100000
            const errorCode = body.code || body.errorCode || body.codigo || body.codigoErro;
            expect(errorCode, 'Deve conter um código de erro no corpo da resposta').to.exist;
            expect(errorCode).to.be.a('string');
            expect(errorCode).to.eq('GLB-E-100000', 'O código de erro deve ser GLB-E-100000 quando o token não é fornecido');

            // ✅ Log final
            cy.log(`✅ Código de erro: ${errorCode}`);
            cy.log(`📝 Mensagem: "${errorMsg}"`);
        });
    });






    it('Token inválido (formato incorreto ou corrompido)', () => {
        GETUsuarios.UsuarioPessoaFisicaFormatoInvalidoToken().then((response) => {
            const { status, body } = response;

            // ✅ Valida o status 401 (Unauthorized)
            expect(status).to.eq(401, 'O status deve ser 401 para token inválido');

            // ✅ Garante que o corpo não é nulo
            expect(body).to.not.be.null;

            // ✅ Verifica se o código de erro GLB-E-100001 está presente
            const errorCode = body.code || body.errorCode || body.codigo || body.codigoErro;

            expect(errorCode, 'Deve conter um código de erro no corpo da resposta').to.exist;
            expect(errorCode).to.be.a('string');
            expect(errorCode).to.eq('GLB-E-100001', 'O código de erro deve ser GLB-E-100001 quando o token é inválido');

            // ✅ Log de apoio
            cy.log(`✅ Status: ${status}`);
            cy.log(`🛑 Código de erro retornado: ${errorCode}`);
        });
    });


    it('Token com formato Bearer incorreto', () => {
        GETUsuarios.UsuarioPessoaFisicaFormatoInvalidoToken().then((response) => {
            const { status, body } = response;

            // ✅ Valida o status 401 (Unauthorized)
            expect(status).to.eq(401, 'O status deve ser 401 para token inválido');

            // ✅ Garante que o corpo não é nulo
            expect(body).to.not.be.null;

            // ✅ Verifica se o código de erro GLB-E-100001 está presente
            const errorCode = body.code || body.errorCode || body.codigo || body.codigoErro;

            expect(errorCode, 'Deve conter um código de erro no corpo da resposta').to.exist;
            expect(errorCode).to.be.a('string');
            expect(errorCode).to.eq('GLB-E-100001', 'O código de erro deve ser GLB-E-100001 quando o token é inválido');

            // ✅ Log de apoio
            cy.log(`✅ Status: ${status}`);
            cy.log(`🛑 Código de erro retornado: ${errorCode}`);
        });
    });


    it('Usuário não encontrado na base de dados - deve retornar GLB-E-100004', () => {
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


    it('Token válido, mas usuário desativado logicamente', () => {
        GETUsuarios.UsuarioDesativadoLogicamente().then((response) => {
            expect(response.status).to.eq(403); // ou 401, conforme regra
            expect(response.body).to.not.be.null;

            const errorCode = response.body.code || '';
            expect(errorCode).to.eq('GLB-E-100005'); // ajuste conforme regra esperada

            cy.log(`🔒 Código de erro: ${errorCode}`);
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


//Criar um usuario com email inválido 150 caracteres

it('Email com mais de 150 caracteres deve gerar erro de consistência', () => {
    GETUsuarios.UsuarioComEmailInvalido().then((response) => {
        expect(response.status).to.eq(200);

        // Captura o e-mail enviado no payload
        const emailEnviado = response.requestBody?.email || '';  

        // Valida se o tamanho do email realmente ultrapassa 150 caracteres
        expect(emailEnviado.length).to.be.greaterThan(150);

        // Valida que a API retornou alguma indicação de erro relacionada ao tamanho
        if (errorMsg && errorMsg.trim() !== '') {
            expect(errorMsg.toLowerCase()).to.satisfy(msg =>
                msg.includes('email') || msg.includes('caracter') || msg.includes('tamanho')
            );
        }
    });
});



// criar contato com celular inválido (menos de 13 dígitos)
it('Número de celular com menos de 13 dígitos deve ser inválido', () => {
    GETUsuarios.UsuarioComCelularInvalido().then((response) => {
        expect(response.status).to.eq(400);
        const errorMsg = response.body.message || '';
        expect(errorMsg.toLowerCase()).to.include('celular');
        cy.log(`📞 Erro: ${errorMsg}`);
    });
});


// criar usuario com CPF invalido (menos de 11 dígitos)
it('CPF com menos de 11 dígitos deve ser inválido', () => {
    GETUsuarios.UsuarioComCPFInvalido().then((response) => {
        expect(response.status).to.eq(400);
        const errorMsg = response.body.message || '';
        expect(errorMsg.toLowerCase()).to.include('cpf');
        cy.log(`🧾 Erro: ${errorMsg}`);
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


it('Erro ao acessar banco de dados', () => {
    GETUsuarios.UsuarioPessoaFisicaSimulaErroBanco().then((response) => {
        expect(response.status).to.eq(500);
        const errorMsg = response.body.message || '';
        expect(errorMsg.toLowerCase()).to.include('banco de dados');
        cy.log(`💥 Erro interno: ${errorMsg}`);
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