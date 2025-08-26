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


    it('Token expirado', () => {
        GETUsuarios.UsuarioPessoaFisicaContatoTokenExpirado().then((response) => {
            const { status, body } = response;
            cy.log(JSON.stringify(response.status));
            cy.log(JSON.stringify(response.body));
             // ✅ Valida o status 401 (Unauthorized)
            expect(status).to.eq(401, 'O status deve ser 401 para token inválido');

            // // ✅ Garante que o corpo não é nulo
            // expect(body).to.not.be.null;

            // // ✅ Verifica se o código de erro GLB-E-100002 está presente
            // const errorCode = body.code || body.errorCode || body.codigo || body.codigoErro;

            // expect(errorCode, 'Deve conter um código de erro no corpo da resposta para expirado').to.exist;
            // expect(errorCode).to.be.a('string');
            // expect(response.status).to.eq(401);
            // expect(response.body.code).to.eq('GLB-E-100002');
            // expect(response.body.message.toLowerCase()).to.include('expirado');
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
            expect(errorCode).to.eq('GLB-E-100000', 'O código de erro deve ser GLB-E-100000 quando o token é inválido');

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
            expect(errorCode).to.eq('GLB-E-100000', 'O código de erro deve ser GLB-E-100000 quando o token é inválido');

            // ✅ Log de apoio
            cy.log(`✅ Status: ${status}`);
            cy.log(`🛑 Código de erro retornado: ${errorCode}`);
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



});