/// <reference types="cypress" />
import * as Cartao from '../../integration/services/Cartao/requests/GET_Cidades.request';

describe('[CARTÕES] Detalhar saldo do cartão físico de um usuário', () => {
  beforeEach(() => {
    cy.ObterToken();
  });

  it('Listar cidades homologadas com o KIM - Ativas', () => {
    // Exemplo de dados fixos (você pode substituir por dados vindos de fixture, se quiser)
    const nomeCidade = 'Belo Horizonte';

    Cartao.ListarCidadesHomologadas(nomeCidade).then((response) => {
      expect(response.status).to.eq(400); // ou o status esperado
      cy.log('Status: ' + response.status);
      cy.log('Corpo da resposta: ' + JSON.stringify(response.body));
    });
  });


  it('Listar cidades homologadas com o KIM - Inativa', () => {
    const nomeCidade = 'Salvador';

    Cartao.ListarCidadesHomologadas(nomeCidade).then((response) => {
      expect(response.status).to.eq(400); // Verifica o status HTTP

      // Verifica o código de erro retornado
      expect(response.body.code).to.eq('MSG-CARTOES-E-100011');

      // Verifica a mensagem de erro
      expect(response.body.message).to.eq('Não há operadoras ativas para realizar a consulta de cidades homologadas ao KIM.');

      cy.log('Status: ' + response.status);
      cy.log('Código de erro: ' + response.body.code);
      cy.log('Mensagem de erro: ' + response.body.message);
    });
  });


  it('Listar cidades homologadas com o KIM - Ativas - Validação do JSON de saída', () => {
    const nomeCidade = 'Belo Horizonte';

    Cartao.ListarCidadesHomologadas(nomeCidade).then((response) => {
      expect(response.status).to.eq(200); // Espera uma resposta de sucesso

      // Verifica se a resposta é um array
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0); // Garante que há pelo menos uma cidade

      // Verifica os campos de cada item do array
      response.body.forEach((cidade) => {
        // Verifica a existência dos campos
        expect(cidade).to.have.property('id');
        expect(cidade).to.have.property('nomeCidade');
        expect(cidade).to.have.property('codigoIbge');

        // Verifica os tipos dos campos
        expect(cidade.id).to.be.a('number');
        expect(cidade.nomeCidade).to.be.a('string').and.not.be.empty;
        expect(cidade.codigoIbge).to.be.a('string').and.not.be.empty;
      });

      cy.log('Status: ' + response.status);
      cy.log('Resposta: ' + JSON.stringify(response.body, null, 2));
    });
  });


});
