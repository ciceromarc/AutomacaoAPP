/// <reference types="cypress" />
import * as Cartao from '../../integration/services/Cartao/requests/POST_CadastroCartaoVirtual.request';

describe('[CARTÕES] Cadastro de Cartão Virtual', () => {

    beforeEach(function () {
        cy.fixture('cartoes').as('cartoes');
        cy.ObterToken(); // Assume que esse comando define tokenUser global ou no contexto
    });

// ============ CAMINHO FELIZ ============
it('Deve cadastrar cartão virtual com sucesso e retornar idCartao e status', function () {
    const data = this.cartoes.virtual_sucessovirtual;

    // Gera CPF válido dinamicamente
    const cpfGerado = Cypress._.random(10000000000, 99999999999).toString(); // ❌ CPF aleatório (inválido)
    // ⚠️ Melhor usar a função que gera CPF VÁLIDO:

    cy.gerarCpfValido().then((cpfValido) => {

        Cartao.CadastrarCartaoVirtual(
            data.operadora,
            cpfValido, // ✅ CPF válido gerado
            data.apelido
        ).then((response) => {
            expect(response.status).to.eq(201); // ou 200, conforme API
            expect(response.body).to.be.an('object');

            // Validação dos campos retornados
            expect(response.body).to.have.property('idCartao').that.is.a('number').and.greaterThan(0);
           // expect(response.body).to.have.property('status').that.is.a('string').and.eq('Ativo');

            // Opcional: logar o CPF usado para debug
            cy.log(`CPF usado no teste: ${cpfValido}`);
        });

    });
});


// ============ FLUXO ALTERNATIVO: SEM APELIDO ============
it('Deve cadastrar cartão virtual sem apelido (campo opcional)', function () {
    const data = this.cartoes.virtual_sem_apelido;

    cy.gerarCpfValido().then((cpfValido) => {
        Cartao.CadastrarCartaoVirtual(
            data.operadora,
            cpfValido,       // ✅ CPF gerado
            data.apelido     // undefined ou null
        ).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('idCartao').that.is.a('number');
           // expect(response.body).to.have.property('status').that.eq('Ativo');
            cy.log(`✅ Cartão sem apelido cadastrado com CPF: ${cpfValido}`);
        });
    });
});

// ============ CASOS NEGATIVOS ============

it('Deve retornar erro GLB-E-100003 quando tokenUser não for informado', function () {
    const data = this.cartoes.virtual_token_invalido;

    cy.gerarCpfValido().then((cpfValido) => {
        Cartao.CadastrarCartaoVirtual(
            data.operadora,
            cpfValido,       // ✅ CPF válido, erro é no token (simulado via fixture/header)
            data.apelido
        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('codigo').that.eq('GLB-E-100003');
            expect(response.body).to.have.property('mensagem').that.is.a('string');
        });
    });
});

it('Deve retornar erro GLB-E-100003 quando praca não for informado', function () {
    const data = this.cartoes.virtual_praca_invalida;

    cy.gerarCpfValido().then((cpfValido) => {
        Cartao.CadastrarCartaoVirtual(
            data.operadora,
            cpfValido,       // ✅ CPF válido, erro é na praça (vazia/inválida)
            data.apelido
        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('codigo').that.eq('GLB-E-100003');
        });
    });
});

it('Deve retornar erro GLB-E-100003 quando CPF for inválido ou ausente', function () {
    const data = this.cartoes.virtual_cpf_invalido;

    // ❌ NÃO gerar CPF aqui — queremos testar o erro proposital
    Cartao.CadastrarCartaoVirtual(
        data.operadora,
        data.cpf,        // CPF inválido ou ausente (vindo da fixture)
        data.apelido
    ).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('codigo').that.eq('GLB-E-100003');
    });
});

it('Deve retornar erro GLB-E-100006 quando serviço TACOM estiver indisponível', function () {
    const data = this.cartoes.virtual_tacom_indisponivel;

    cy.gerarCpfValido().then((cpfValido) => {
        Cartao.CadastrarCartaoVirtual(
            data.operadora,
            cpfValido,       // ✅ CPF válido, erro simulado no backend/TACOM
            data.apelido
        ).then((response) => {
            expect(response.status).to.eq(500);
            expect(response.body).to.have.property('codigo').that.eq('GLB-E-100006');
            cy.log(`⚠️ Simulando falha TACOM com CPF: ${cpfValido}`);
        });
    });
});

it('Deve retornar erro MSG-CARTOES-E-100009 quando número do cartão já existir', function () {
    const data = this.cartoes.virtual_numero_duplicado;

    cy.gerarCpfValido().then((cpfValido) => {
        // ⚠️ Aqui o backend deve simular retorno de número já existente (via mock ou cenário controlado)
        Cartao.CadastrarCartaoVirtual(
            data.operadora,
            cpfValido,       // ✅ CPF válido, erro é de duplicidade de cartão
            data.apelido
        ).then((response) => {
            expect(response.status).to.eq(409);
            expect(response.body).to.have.property('codigo').that.eq('MSG-CARTOES-E-100009');
            cy.log(`⚠️ Simulando cartão duplicado com CPF: ${cpfValido}`);
        });
    });
});

it('Deve retornar erro quando operadora não existe ou está inativa', function () {
    const data = this.cartoes.virtual_operadora_inativa;

    cy.gerarCpfValido().then((cpfValido) => {
        Cartao.CadastrarCartaoVirtual(
            data.operadora,  // operadora inválida/inativa
            cpfValido,       // ✅ CPF válido, erro é na operadora
            data.apelido
        ).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('codigo').that.eq('GLB-E-100003');
            cy.log(`⚠️ Operadora inválida testada com CPF: ${cpfValido}`);
        });
    });
});

});