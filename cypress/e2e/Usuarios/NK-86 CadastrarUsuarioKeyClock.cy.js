import * as POSTUsuarios from '../../integration/services/Usuarios/requests/POST_criar_usuario.request';
import { gerarCpfValido } from '../../support/utils';
const cpfDinamico = gerarCpfValido() 
describe('[Usuários] Criar novo usuário PF', () => {
    beforeEach(() => {
        cy.ObterToken(); // Assume que isso seta Cypress.env('token')

    });

    // =============================================
    // 🎯 CAMINHO FELIZ
    // =============================================
    it('Deve criar usuário com sucesso (HTTP 201)', () => {
        POSTUsuarios.CriarUsuario().then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body.id).to.be.a('number');
            cy.log(`Usuário criado com ID: ${response.body.id}`);
        });
    });

    // =============================================
    // ❌ CAMINHOS ALTERNATIVOS / VALIDAÇÕES
    // =============================================

    it('Deve retornar erro GLB-E-100003 se campo obrigatório "nomeCompleto" estiver ausente', () => {
        POSTUsuarios.CriarUsuario("", "12345678909", "faltanome@teste.com.br").then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'GLB-E-100003');
        });
    });

    it('Deve retornar erro GLB-E-100003 se campo obrigatório "cpf" estiver ausente', () => {
        POSTUsuarios.CriarUsuario("Nome Completo", "", "faltacpf@teste.com.br").then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'GLB-E-100003');
        });
    });

    it('Deve retornar erro GLB-E-100003 se campo obrigatório "email" estiver ausente', () => {
          POSTUsuarios.CriarUsuario("Nome Completo", cpfDinamico, "").then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'GLB-E-100003');
        });
    });

    it('Deve retornar erro GLB-E-100003 se campo obrigatório "numeroCelular" estiver ausente', () => {

        POSTUsuarios.CriarUsuario("Nome Completo", cpfDinamico, "faltacpf@teste.com.br", "", "", "").then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'GLB-E-100003');
        });
    });

    it('Deve retornar erro MSG-USUARIOS-E-100010 se dataNascimento for futura', () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const futureDateString = futureDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        POSTUsuarios.CriarUsuario(
            "Data Futura",
            cpfDinamico,
            "data.futura@teste.com.br",
            "5561985455454",
            futureDateString
        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'MSG-USUARIOS-E-100010');
        });
    });

    it('Deve retornar erro GLB-E-100003 se CPF for inválido (menos de 11 dígitos)', () => {
        POSTUsuarios.CriarUsuario("CPF Curto", "123", "cpf.curto@teste.com.br").then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'GLB-E-100003');
        });
    });

    it('Deve retornar erro GLB-E-100003 se e-mail for inválido', () => {
        POSTUsuarios.CriarUsuario("Email Inválido", cpfDinamico, "email-invalido").then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'GLB-E-100003');
        });
    });

    it('Deve retornar erro GLB-E-100003 se número de celular for inválido (não tiver 15 dígitos)', () => {
        POSTUsuarios.CriarUsuario("Celular Inválido", cpfDinamico, "celular@teste.com.br", "12345").then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'GLB-E-100003');
        });
    });

});