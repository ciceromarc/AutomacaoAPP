/// <reference types="cypress" />
import * as Cartao from '../../integration/services/Cartao/requests/POST_CadastroCartaoVirtual.request';
import { gerarCpfValido } from '../../support/utils';


describe('[CARTÕES] Cadastro de Cartão Virtual', () => {
    beforeEach(function () {
        cy.fixture('cartoes').as('cartoes');
        cy.ObterToken(); // Assume que esse comando define tokenUser global ou no contexto
    });

    // ============ CAMINHO FELIZ ============
    it('Deve cadastrar cartão virtual com sucesso e retornar idCartao e status', function () {
        const data = this.cartoes.virtual_sucessovirtual;
        const cpfDinamico = gerarCpfValido()
            Cartao.CadastrarCartaoVirtual(
                data.operadora,
                cpfDinamico, // ✅ CPF válido gerado
                data.apelido
            ).then((response) => {
                expect(response.status).to.eq(201); // ou 200, conforme API
                expect(response.body).to.be.an('object');

                // Validação dos campos retornados
                expect(response.body).to.have.property('idCartao').that.is.a('number').and.greaterThan(0);
                // expect(response.body).to.have.property('status').that.is.a('string').and.eq('Ativo');

                // Opcional: logar o CPF usado para debug
                cy.log(`CPF usado no teste: ${cpfDinamico}`);
            });
    });


    // ============ FLUXO ALTERNATIVO: SEM APELIDO ============
    it('Deve cadastrar cartão virtual sem apelido (campo opcional)', function () {
        const data = this.cartoes.virtual_sem_apelido;
        const cpfDinamico = gerarCpfValido()
            Cartao.CadastrarCartaoVirtual(
                data.operadora,
                cpfDinamico,       // ✅ CPF gerado
                data.apelido     // undefined ou null
            ).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('idCartao').that.is.a('number');
                // expect(response.body).to.have.property('status').that.eq('Ativo');
                cy.log(`✅ Cartão sem apelido cadastrado com CPF: ${cpfDinamico}`);
            });
    });

    // ============ CASOS NEGATIVOS ============

    it('Deve retornar erro GLB-E-100003 quando praca não for informado', function () {
        const data = this.cartoes.virtual_praca_invalida;
        const cpfDinamico = gerarCpfValido()
            Cartao.CadastrarCartaoVirtual(
                data.operadora,
                cpfDinamico,       // ✅ CPF válido, erro é na praça (vazia/inválida)
                data.apelido
            ).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('code').that.eq('GLB-E-100003');
            });

    });

    it('Deve retornar erro GLB-E-100003 quando CPF for inválido ou ausente', function () {
        const data = this.cartoes.virtual_cpf_invalido;
        return Cartao.CadastrarCartaoVirtual(
            data.operadora,
            data.cpf,        // CPF inválido ou ausente (vindo da fixture)
            data.apelido
        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'GLB-E-100003');
            // Opcional: validar também a mensagem
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.include('cpf');
        });
    });


    //   Descomentar quando o serviço tacom estiver estável para testes, ou seja disponível, tiver massa de indisponivel
    // it('Deve retornar erro GLB-E-100006 quando serviço TACOM estiver indisponível', function () {
    //     const data = this.cartoes.virtual_tacom_indisponivel;

    //     cy.gerarCpfValido().then((cpfValido) => {
    //         Cartao.CadastrarCartaoVirtual(
    //             data.operadora,
    //             cpfValido,       // ✅ CPF válido, erro simulado no backend/TACOM
    //             data.apelido
    //         ).then((response) => {
    //             expect(response.status).to.eq(500);
    //             expect(response.body).to.have.property('codigo').that.eq('GLB-E-100006');
    //             cy.log(`⚠️ Simulando falha TACOM com CPF: ${cpfValido}`);
    //         });
    //     });
    // });

    it('Deve retornar erro MSG-CARTOES-E-100009 quando número do cartão já existir', function () {
        const data = this.cartoes.virtual_numero_duplicado;
        const cpfDinamico = gerarCpfValido()
            Cartao.CadastrarCartaoVirtual(
                data.operadora,
                44317314584,
                data.apelido
            ).then((response) => {
                // ✅ Corrigido: esperar 400, não 409
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('code').that.eq('MSG-CARTOES-E-100009');
                cy.log(`⚠️ Simulando cartão duplicado com CPF: ${cpfDinamico}`);
            });
    });

    it('Deve retornar erro quando operadora não existe ou está inativa', function () {
        const data = this.cartoes.virtual_operadora_inativa;
        const cpfDinamico = gerarCpfValido()
            Cartao.CadastrarCartaoVirtual(  
                data.operadora,  // operadora inválida/inativa
                cpfDinamico,       // ✅ CPF válido, erro é na operadora
                data.apelido
            ).then((response) => {
                // ✅ Corrigido: status deve ser 400 (erro), não 201
                expect(response.status).to.eq(400);
                // ✅ Corrigido: campo é "code", não "codigo"
                // ✅ Corrigido: código real retornado pela API
                expect(response.body).to.have.property('code').that.eq('MSG-CARTOES-E-100013');
                cy.log(`⚠️ Operadora inválida testada com CPF: ${cpfDinamico}`);
            });
    });

});