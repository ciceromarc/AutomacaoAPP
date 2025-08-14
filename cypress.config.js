const { defineConfig } = require('cypress')
const path = require('path')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  projectId: 'gis54p',
  e2e: {
    setupNodeEvents(on, config) {
      // Configuração do reporter
       allureWriter(on, config);
      return config
    },
    baseUrl: 'https://novo-kim-tst.usekim.com.br/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js'
  },
  
   env: {
    allure: true,
    allureResultsPath: 'allure-results'
  },
  
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatório de Testes Cypress',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'cypress/reports/html',
    overwrite: false,
    html: true,
    json: false
  }
})
