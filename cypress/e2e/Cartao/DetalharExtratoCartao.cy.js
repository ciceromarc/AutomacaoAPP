/// <reference types="cypress" />
import payloadDadosCartao from '../../integration/services/Cartao/payloads/consulta-extrato-operadora.json';
import * as CartaoExtrato from '../../integration/services/Cartao/requests/POST_detalharExtratoCartao.request';

describe('[CARTÕES] Detalhar extrato de cartão de transporte de um usuário', () => {
  beforeEach(() => {
    cy.ObterToken();
  });

  it('Consultar extrato de cartão com operadora integrada via TACOM', () => {
    const payload = payloadDadosCartao; 

    CartaoExtrato.CartaoExtratooperadora().then((response) => {
      const body = response.body;

      expect(response.status).to.eq(200);
      expect(body).to.not.be.null;
      expect(body).to.be.an('array').and.not.empty;

      // Itera sobre cada item do extrato retornado
      body.forEach((item, index) => {
        cy.log(`🔎 Validando registro ${index + 1}`);

        // Validar número do cartão
        expect(item.numeroCartao, 'Número do cartão deve existir').to.exist;
        expect(item.numeroCartao).to.eq(payload.numeroCartao);

        // Se a API retornar as datas de uso inicial/final
        if (item.dataUsoInicial) {
          expect(item.dataUsoInicial).to.eq(payload.dataUsoInicial);
        }
        if (item.dataUsoFinal) {
          expect(item.dataUsoFinal).to.eq(payload.dataUsoFinal);
        }

        // Se a API retornar códigos de carga
        if (item.codigoCargaInicial) {
          expect(item.codigoCargaInicial).to.eq(payload.codigoCargaInicial);
        }
        if (item.codigoCargaFinal) {
          expect(item.codigoCargaFinal).to.eq(payload.codigoCargaFinal);
        }

        // Campos fixos do response que não vêm do payload, mas valem a pena validar
        expect(item.dataUtilizacao, 'Data de utilização deve existir').to.exist;
        expect(item.valorDebitado, 'Valor debitado deve existir').to.be.a('number');
        expect(item.saldoBanco, 'Saldo no banco deve existir').to.be.a('number');
        expect(item.descTipoUtilizacao, 'Descrição de utilização deve existir').to.be.a('string');
        expect(item.operadoraDto.id, 'Operadora ID deve existir').to.be.a('number');
      });
    });
  });








    it('Consultar extrato de cartão em Vitória com operadora integrada', () => {
        CartaoExtrato.CartaoExtratooperadora().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            expect(response.body).to.be.an('array').that.is.not.empty;

            // ✅ Verifica o operadoraDto do primeiro item
            expect(response.body[0].operadoraDto.id).to.eq(157);

            // ✅ Verifica se todos os itens têm operadoraDto.id = 157 (opcional)
            response.body.forEach((registro) => {
                expect(registro.operadoraDto.id).to.eq(157);
            });

            // ✅ Verifica outros campos, como número do cartão
            expect(response.body[0].numeroCartao).to.eq('06900000000031');

            cy.log(JSON.stringify(response.body));
        });

    });

    // Consultar extrato de cartão sem registros de uso
    it('Consultar extrato de cartão sem registros de uso', () => {
        CartaoExtrato.CartaoSemRegistro().then((response) => {
            // Valida o status HTTP
            expect(response.status).to.eq(400);

            // Valida que o corpo da resposta não é nulo
            expect(response.body).to.not.be.null;

            // Valida cada campo da resposta de erro
            expect(response.body.code).to.eq('MSG-CARTOES-E-100005');
            expect(response.body.status).to.eq(400);
            expect(response.body.description).to.eq('Bad Request');
            expect(response.body.message).to.eq('Não existem informações para detalhar no extrato do cartão.');

            // Opcional: valida o formato da data (pode ser mais flexível)
            expect(response.body.dateTime).to.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);

            // Log para visualização (opcional)
            cy.log('Resposta de erro:', JSON.stringify(response.body, null, 2));
        });
    });

    // Tentar consultar extrato com token inválido
    it('Tentar consultar extrato com token inválido', () => {
        CartaoExtrato.CartaoExtratooperadoraTokenInvalido().then((response) => {
            // Valida o status HTTP
            expect(response.status).to.eq(401);

            // Valida o código de erro retornado conforme regra de negócio
            expect(response.body).to.have.property('codigoErro', 'GLB-E-100001');

            // Exibe o corpo completo da resposta no log para análise
            cy.log(JSON.stringify(response.body));
        });
    });


    //  Tentar consultar extrato com número de cartão inválido
    it('Tentar consultar extrato com número de cartão inválido', () => {
        CartaoExtrato.CartaoExtratooperadoraInvalido().then((response) => {
            expect(response.status).to.eq(400);
            cy.log(JSON.stringify(response.body));
        });
    });

    // Tentar consultar extrato de cartão não vinculado ao usuário
    it.skip('Tentar consultar extrato de cartão não vinculado ao usuário', () => {
        let payloadNaoVinculado = { ...payloadDadosCartao, numeroCartao: "06900000000999" };
        CartaoExtrato.CartaoExtratooperadora().then((response) => {
            expect(response.status).to.eq(403);
            cy.log(JSON.stringify(response.body));
        });
    });

    //  Tentar consultar extrato de cartão em São Paulo sem integração
    it.skip('Tentar consultar extrato de cartão em São Paulo sem integração', () => {
        let payloadSP = { ...payloadDadosCartao, cidade: "São Paulo" };
        CartaoExtrato.CartaoExtratooperadora().then((response) => {
            expect(response.status).to.eq(422);
            cy.log(JSON.stringify(response.body));
        });
    });

    //  Tentar consultar extrato de cartão inexistente
    it.skip('Tentar consultar extrato de cartão inexistente', () => {
        let payloadInexistente = { ...payloadDadosCartao, numeroCartao: "00000000000000" };
        CartaoExtrato.CartaoExtratooperadora().then((response) => {
            expect(response.status).to.eq(404);
            cy.log(JSON.stringify(response.body));
        });
    });

    //  DIS - Consultar extrato de cartão de transporte de um usuário
    it.skip('DIS - Consultar extrato de cartão de transporte de um usuário', () => {
        CartaoExtrato.CartaoExtratooperadora().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.not.be.null;
            cy.log(JSON.stringify(response.body));
        });
    });

    //  Consulta de uso do cartão em cidade com integração TACOM e com registros
    it.skip('Consulta de uso do cartão em cidade com integração TACOM e com registros', () => {
        CartaoExtrato.CartaoExtratooperadora().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.registrosUso).to.not.be.empty;
            cy.log(JSON.stringify(response.body));
        });
    });

    //  Consulta de uso do cartão em cidade com integração TACOM e sem registros
    it.skip('Consulta de uso do cartão em cidade com integração TACOM e sem registros', () => {
        let payloadSemUso = { ...payloadDadosCartao, numeroCartao: "06900000000033" };
        CartaoExtrato.CartaoExtratooperadora().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.registrosUso).to.be.empty;
            cy.log(JSON.stringify(response.body));
        });
    });

    //  Consulta de uso do cartão em cidade sem integração disponível
    it.skip('Consulta de uso do cartão em cidade sem integração disponível', () => {
        let payloadSemIntegracao = { ...payloadDadosCartao, cidade: "CidadeSemIntegracao" };
        CartaoExtrato.CartaoExtratooperadora().then((response) => {
            expect(response.status).to.eq(422);
            cy.log(JSON.stringify(response.body));
        });
    });

});