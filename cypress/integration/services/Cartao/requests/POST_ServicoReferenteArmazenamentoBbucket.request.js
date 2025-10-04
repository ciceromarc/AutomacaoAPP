/// <reference types="cypress" />
import FormData from 'form-data';


function uploadArquivo(nomeArquivo, diretorio = 'arquivos', timeout = 30000) {
    if (!nomeArquivo || typeof nomeArquivo !== 'string') {
        throw new TypeError('nomeArquivo must be a string');
    }

    if (!diretorio || typeof diretorio !== 'string') {
        throw new TypeError('diretorio must be a string');
    }

    if (typeof timeout !== 'number') {
        throw new TypeError('timeout must be a number');
    }

    return cy.fixture('Keycloak.feature', 'base64').then((b64) => {
  const blob = Cypress.Blob.base64StringToBlob(b64, 'text/plain');
  const formData = new FormData();
  formData.append('arquivo', blob, 'Keycloak.feature');

  cy.request({
    method: 'POST',
    url: '/file/api/oci/upload?diretorio=arquivos',
    headers: {
      'Authorization': `Bearer ${Cypress.env('token')}`
    },
    body: formData,
    timeout: 30000,
    failOnStatusCode: false
    });
  });
}



export { uploadArquivo };
