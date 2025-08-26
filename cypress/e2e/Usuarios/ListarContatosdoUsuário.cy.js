import * as GETUsuarios from '../../integration/services/Usuarios/requests/GET_usuarioContato.request';

describe('[Usuários] Listar Contatos do Usuário', () => {

    beforeEach(() => {
        cy.ObterToken();
        cy.ObterTokenUsuarioSemCadastro();
    });

    it('Consulta de dados de contato com sucesso', () => {
        GETUsuarios.UsuarioPessoaFisicaContato().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            cy.log(JSON.stringify(response.status));
            cy.log(JSON.stringify(response.body));
        });
    });

    //Número de celular mascarado corretamente

    it('Número de celular mascarado corretamente', () => {
        GETUsuarios.UsuarioPessoaFisicaContato().then((response) => {
            // Validações básicas
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;

            const userData = response.body;

            // Verifica se o campo 'telefones' existe e é um array
            expect(userData).to.have.property('telefones').that.is.an('array');

            // Define o padrão esperado: (XX) XXXXX-XXXX, mas com os primeiros 5 dígitos como X
            const telefonePattern = /^\(11\) XXXXX-\d{4}$/;

            // Valida cada telefone no array
            userData.telefones.forEach((telefone) => {
                expect(telefone).to.match(telefonePattern, `O telefone "${telefone}" não está mascarado corretamente.`);
            });

            // Opcional: validar que todos os números são iguais (se for esperado)
            const primeiroTelefone = userData.telefones[0];
            userData.telefones.forEach((telefone) => {
                expect(telefone).to.eq(primeiroTelefone, 'Todos os telefones devem ser idênticos quando mascarados.');
            });

            // Log opcional
            cy.log(`Telefones validados: ${userData.telefones.join(', ')}`);
        });
    });


    it('E-mail mascarado conforme regra de negócio', () => {
        GETUsuarios.UsuarioPessoaFisicaContato().then((response) => {
            // Validações básicas
            expect(response.status).to.eq(200); // ⚠️ ATENÇÃO: você colocou 400, mas provavelmente deveria ser 200
            expect(response.body).to.not.be.null;

            const { email } = response.body;

            // Verifica se o email existe
            expect(email).to.be.a('string').and.not.empty;

            // Regex explicado:
            // ^                -> início da string
            // [a-zA-Z]{4}      -> exatamente 4 letras (primeiras do nome)
            // X+               -> um ou mais 'X' após as 4 letras
            // @                -> símbolo @
            // [a-zA-Z]{3}      -> 3 primeiras letras do domínio
            // X+               -> um ou mais 'X' no restante do domínio
            // \.               -> ponto literal (escapado)
            // [a-zA-Z]+        -> extensão (com, org, etc.)
            // $                -> fim da string
            const emailMaskRegex = /^[a-zA-Z]{4}X+@[a-zA-Z]{3}X+\.[a-zA-Z]+$/;

            expect(email).to.match(
                emailMaskRegex,
                'O e-mail não está mascarado conforme a regra de negócio.'
            );

            // Validações adicionais para maior segurança:

            const [localPart, domainPart] = email.split('@');

            // Valida parte local: 4 letras + só X depois
            expect(localPart).to.have.length.greaterThan(4);
            expect(localPart.slice(0, 4)).to.match(/^[a-zA-Z]{4}$/, 'As 4 primeiras letras devem ser alfabéticas');
            expect(localPart.slice(4)).to.match(/^X+$/, 'O restante do nome deve ser apenas X');

            // Valida domínio: formato a@b.c
            expect(domainPart).to.include('.');
            const [domainName, domainExt] = domainPart.split('.');

            expect(domainName.length).to.be.at.least(3);
            expect(domainName.slice(0, 3)).to.match(/^[a-zA-Z]{3}$/, 'As 3 primeiras letras do domínio devem ser alfabéticas');
            expect(domainName.slice(3)).to.match(/^X+$/, 'O restante do nome do domínio deve ser apenas X');
            expect(domainExt).to.match(/^[a-zA-Z]+$/, 'A extensão do domínio deve ser alfabética (ex: com, org)');

            // Log do e-mail validado
            cy.log(`E-mail validado: ${email}`);
        });
    });


    it('Usuário não encontrado na base de dados', () => {
        GETUsuarios.UsuarioPessoaFisicaContatoSemAutorizacaoAcesso().then((response) => {
            const { status, body } = response;

            // ✅ Valida o status 200 (Unauthorized)
            expect(status).to.eq(400, 'O status deve ser 400 usuário nço encontrado na base de dados'); 

            // ✅ Garante que o corpo não é nulo
          //   expect(body).to.not.be.null;  
            cy.log(JSON.stringify(response.status));
            cy.log(JSON.stringify(response.body));
            // ✅ Verifica se o código de erro GLB-E-100004 está presente
            const errorCode = body.code || body.errorCode || body.codigo || body.codigoErro;

            expect(errorCode, 'Deve conter um código de erro no corpo da resposta').to.exist;
            expect(errorCode).to.be.a('string');
            expect(errorCode).to.eq('GLB-E-100004', 'O código de erro deve ser GLB-E-100004 quando não encontrado usuário na base de dados');

            // ✅ Log de apoio
            cy.log(`✅ Status: ${status}`);
            cy.log(`🛑 Código de erro retornado: ${errorCode}`);
        });
    });

    it('Nome do e-mail com menos de 4 caracteres', () => {
        GETUsuarios.UsuarioPessoaFisicaContato().then((response) => {
            const nome = response.body.email.split('@')[0].replace(/X/g, '');
            expect(nome.length).to.be.gte(4, 'Nome do e-mail deve ter ao menos 4 caracteres visíveis');
        });
    });


    it('Domínio do e-mail com menos de 3 caracteres', () => {
        GETUsuarios.UsuarioPessoaFisicaContato().then((response) => {
            const dominio = response.body.email.split('@')[1].split('.')[0].replace(/X/g, '');
            expect(dominio.length).to.be.gte(3, 'Domínio do e-mail deve ter ao menos 3 caracteres visíveis');
        });
    });


it('Resposta contém todos os campos obrigatórios', () => {
    GETUsuarios.UsuarioPessoaFisicaContato().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.all.keys('email', 'telefones');
        expect(response.body.email).to.be.a('string');
        expect(response.body.telefones).to.be.an('array').and.not.empty;
    });
});



it('Não deve retornar dados sensíveis', () => {
    GETUsuarios.UsuarioPessoaFisicaContato().then((response) => {
        const bodyStr = JSON.stringify(response.body);
        const camposSensiveis = ['senha', 'password', 'cpf', 'rg'];
        camposSensiveis.forEach((campo) => {
            expect(bodyStr).to.not.include(campo);
        });
    });
});


it('Alta latência na resposta', () => {
    const start = Date.now();
    GETUsuarios.UsuarioPessoaFisicaContato().then((response) => {
        const tempoResposta = Date.now() - start;
        cy.log(`⏱️ Tempo de resposta: ${tempoResposta}ms`);
        expect(tempoResposta).to.be.lessThan(2000);
    });
});



it('Email deve estar em formato válido após mascaramento', () => {
    GETUsuarios.UsuarioPessoaFisicaContato().then((response) => {
        const email = response.body.email.replace(/X/g, 'a');
        const emailRegex = /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i;
        expect(email).to.match(emailRegex, 'Mesmo mascarado, e-mail deve manter formato válido');
    });
});


it('Resposta em formato JSON válido', () => {
    GETUsuarios.UsuarioPessoaFisicaContato().then((response) => {
        expect(() => JSON.parse(JSON.stringify(response.body))).to.not.throw();
        expect(response.headers['content-type']).to.include('application/json');
    });
});


});