/// <reference types="cypress" />
import * as Cartao from '../../integration/services/Cartao/requests/GET_Saldo.request';

describe('[CARTÕES] Detalhar saldo do cartão físico de um usuário', () => {
  beforeEach(() => {
    cy.ObterToken();
  });

  it('Consultar saldo de cartão com número válido (via fixture)', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.cartao_valido;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        cy.log('Status: ' + response.status);
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Consultar saldo sem informar número do cartão', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.sem_numero_cartao;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        cy.log('Status: ' + response.status);
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Consultar saldo com número de cartão inválido', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.cartao_invalido;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        expect(response.body).to.have.property('codigo', d.codigoEsperado);
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Consultar saldo de cartão inexistente', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.cartao_inexistente;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        expect(response.body).to.have.property('codigo', d.codigoEsperado);
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Consultar saldo de cartão não vinculado ao usuário', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.cartao_nao_vinculado;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Consultar saldo com operadora TACOM', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.operadora_tacom;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Consultar saldo com operadora de integração própria', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.operadora_propria;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Timeout na integração com operadora', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.timeout_operadora;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Cartão inativo não deve retornar saldo', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.cartao_inativo;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Consulta em cidade TACOM com registros', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.tacom_com_registros;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        expect(response.body).to.not.be.empty;
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Consulta em cidade TACOM sem registros', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.tacom_sem_registros;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        expect(response.body).to.be.empty;
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });

  it('Consulta em cidade sem integração disponível', () => {
    cy.fixture('saldo_cartao_dados').then((dados) => {
      const d = dados.sem_integracao;
      Cartao.ConsultarSaldoCartaoTransporte(d.numeroCartao, d.doctoIdentificacao, d.idOperadora, d.timeout).then((response) => {
        expect(response.status).to.eq(d.expectedStatus);
        cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
      });
    });
  });
});
