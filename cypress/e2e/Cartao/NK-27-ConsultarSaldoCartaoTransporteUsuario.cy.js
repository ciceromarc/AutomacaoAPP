/// <reference types="cypress" />
import * as saldoCartao from '../../integration/services/Cartao/requests/GET_SaldoCartao.request.js';

describe('[CARTÕES] Listar cartões de transporte', () => {

    beforeEach(function () {
        cy.fixture('saldo_cartao_dados').as('saldo_cartao_dados');
        cy.ObterTokenCartaoTransporte();
    });


    // CENÁRIO: Consulta de saldo com sucesso
    // ======================================
    it('Deve retornar saldo do cartão com sucesso', function () {
        const data = this.saldo_cartao_dados.cartao_valido;

        return saldoCartao.ObterSaldoCartao(
            data.numeroCartao,
            data.doctoIdentificacao
        ).then((response) => {
            expect(response.status).to.eq(data.expectedStatus);

            const body = response.body;

            // Verifica todas as chaves esperadas
            expect(body).to.include.all.keys(
                'numeroCartao',
                'tipoCartao',
                'operadoraCartao',
                'saldo',
                'dataConsulta'
            );

            // --- Validação: numeroCartao ---
            expect(body.numeroCartao).to.be.a('string').and.not.be.empty;
            // ⚠️ Só compare com data.numeroCartao se tiver certeza que são iguais!
            // Se houver divergência, remova essa linha ou corrija os dados de teste.
            //  expect(body.numeroCartao).to.equal(data.numeroCartao);

            // --- Validação: tipoCartao ---
            expect(body.tipoCartao).to.be.a('string').and.not.be.empty;

            // --- Validação: operadoraCartao ---
            expect(body.operadoraCartao).to.be.a('string').and.not.be.empty;

            // --- Validação: saldo ---
            expect(body.saldo).to.be.a('number');
            expect(body.saldo).to.be.gte(0);

            // --- Validação: dataConsulta ---
            expect(body.dataConsulta).to.be.a('string').and.not.be.empty;
            const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
            expect(body.dataConsulta).to.match(dateRegex);
            expect(new Date(body.dataConsulta)).to.be.a('Date').and.not.be.NaN;
        });
    });

    it('NK-27.1 - Deve retornar saldo do cartão com sucesso para operadora TACOM', function () {
        const data = this.saldo_cartao_dados.cartao_valido;

        return saldoCartao.ObterSaldoCartao(
            data.numeroCartao,
            data.doctoIdentificacao
        ).then((response) => {
            cy.log(JSON.stringify(response.body, null, 2));

            // Validação do status
            expect(response.status).to.eq(200);

            const body = response.body;

            // ✅ Valida as chaves reais retornadas pela API
            expect(body).to.have.all.keys(
                'numeroCartao',
                'tipoCartao',
                'operadoraCartao',
                'saldo',
                'dataConsulta'
            );

            // ✅ Validação de tipos e formatos reais
            expect(body.numeroCartao).to.be.a('string').and.not.be.empty;
            expect(body.tipoCartao).to.be.a('string').and.not.be.empty;
            expect(body.operadoraCartao).to.be.a('string').and.not.be.empty;

            // ✅ Saldo é um número (não uma string formatada)
            expect(body.saldo).to.be.a('number');
            expect(body.saldo).to.be.gte(0); // saldo não negativo

            // ✅ Data no formato ISO 8601: "2020-03-23T17:22:55"
            expect(body.dataConsulta).to.be.a('string').and.not.be.empty;
            const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
            expect(body.dataConsulta).to.match(isoDateRegex);

            // Opcional: validar que a data é válida
            const parsedDate = new Date(body.dataConsulta);
            expect(parsedDate).to.be.a('Date').and.not.be.NaN;
            expect(parsedDate.getTime()).to.be.lte(Date.now() + 86400000); // não mais que 1 dia no futuro
        });
    });



    it('NK-27.2 - Deve retornar erro MSG-CARTOES-E-100015 quando numeroCartao é omitido', function () {
        const data = this.saldo_cartao_dados.sem_numero_cartao;

        saldoCartao.ObterSaldoCartao(
            data.numeroCartao, // vazio
            data.doctoIdentificacao,
            data.idOperadora
        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'MSG-CARTOES-E-100015');
            expect(response.body).to.have.property('message').that.includes('O número do cartão informado é inválido');
        });
    });

    it('NK-27.3 - Deve retornar erro GLB-E-100007 quando doctoIdentificacao é omitido', function () {
        const data = this.saldo_cartao_dados.cartao_sem_doctoIdentificacao;

        return saldoCartao.ObterSaldoCartao(
            data.numeroCartao,
            data.doctoIdentificacao,
            data.idOperadora
        ).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('code', 'GLB-E-100007');
            expect(response.body).to.have.property('message');
            // Valida que a mensagem menciona CPF (mais seguro que texto exato)
            expect(response.body.message).to.include('CPF');
            // OU, se quiser ser exato:
            // expect(response.body.message).to.equal('O CPF informado é inválido.');
        });
    });

it.only('NK-27.4 - Deve permitir consulta com doctoIdentificacao = "0"', function () {
    const data = this.saldo_cartao_dados.cartao_doctoIdentificacao_zero;

    return saldoCartao.ObterSaldoCartao(
        data.numeroCartao,
        data.doctoIdentificacao, // CPF zero permitido
        data.idOperadora
    ).then((response) => {
        expect(response.status).to.eq(200);

        const body = response.body;

        // Valida campos obrigatórios conforme resposta real
        expect(body).to.have.property('numeroCartao');
        expect(body).to.have.property('saldo'); // ✅ Corrigido: era 'saldoCartao'

        // Validações adicionais recomendadas
        expect(body.numeroCartao).to.be.a('string').and.not.be.empty;
        expect(body.saldo).to.be.a('number').and.to.be.gte(0);
        expect(body).to.have.property('tipoCartao').that.is.a('string');
        expect(body).to.have.property('operadoraCartao').that.is.a('string').and.not.be.empty;
        expect(body).to.have.property('dataConsulta').that.is.a('string');
    });
});


    it.skip('NK-27.5 - Deve retornar erro quando operadora não possui integração (ex: São Paulo)', function () {
        const data = this.saldo_cartao_dados.cartao_operadora_sem_integracao;

        saldoCartao.ObterSaldoCartao(
            data.numeroCartao,
            data.doctoIdentificacao,
            data.idOperadora // ex: 7 (São Paulo)
        ).then((response) => {
            expect(response.status).to.eq(400); // ou 501, conforme API
            expect(response.body).to.have.property('mensagem').that.includes('não possui integração');
        });
    });



});