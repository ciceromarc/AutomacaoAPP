// Verbo/metodo - endpoint . motivo (request) . extensao
/// <reference types = "cypress"/>

function CartaoTransporteusuario(tipoCartao) {
    const url = `cartao/api/v1/cartao?tipoCartao=${tipoCartao}`;
    
    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false // Permite capturar respostas com status de erro
    });
}


function CartaoInativoUsuario(ativo) {
    const url = `cartao/api/v1/cartao?ativo=${ativo}`;
    
    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

function CartaoTransporteusuarioUsuario(idUsuario) {
    const url = `cartao/api/v1/cartao?idUsuario=${idUsuario}`;
    
    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

/// <reference types="cypress"/>

// 🔹 Filtros de Operadora

function OperadoraFiltroNomeFantasia(nomeFantasia) {
    const url = `cartao/api/v1/operadora?nomeFantasia=${nomeFantasia}`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

function OperadoraFiltroCnpj(numeroCnpj) {
    const url = `cartao/api/v1/operadora?numeroCnpj=${numeroCnpj}`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

function OperadoraFiltroSigla(sigla) {
    const url = `cartao/api/v1/operadora?sigla=${sigla}`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

function OperadoraFiltroCidade(idCidade) {
    const url = `cartao/api/v1/operadora?idCidade=${idCidade}`;

    return cy.request({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

function OperadoraFiltroTipoIntegracao(tipoIntegracaoCartao) {
    const url = `cartao/api/v1/operadora?tipoIntegracaoCartao=${tipoIntegracaoCartao}`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

function OperadoraFiltroCodigoTitularRevenda(codigoTitularRevenda) {
    const url = `cartao/api/v1/operadora?codigoTitularRevenda=${codigoTitularRevenda}`;

    return cy.api({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

function OperadoraFiltroMultiplos(nomeFantasia, idCidade, tipoIntegracaoCartao) {
    const url = `cartao/api/v1/operadora?nomeFantasia=${nomeFantasia}&idCidade=${idCidade}&tipoIntegracaoCartao=${tipoIntegracaoCartao}`;

    return cy.request({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}


function CartaoFiltroDataAlteracao(dataAlteracao) {
    const url = `cartao/api/v1/cartao?dataAlteracao=${dataAlteracao}`;
    
    return cy.request({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

function CartaoFiltroDataCriacao(dataCriacao) {
    const url = `cartao/api/v1/cartao?dataCriacao=${dataCriacao}`;
    
    return cy.request({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}

function CartaoFiltroUsuarioAlteracao(usuarioAlteracao) {
    const url = `cartao/api/v1/cartao?usuarioAlteracao=${usuarioAlteracao}`;
    
    return cy.request({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}


function CartaoFiltroUsuarioCriacao(usuarioCriacao) {
    const url = `cartao/api/v1/cartao?usuarioCriacao=${usuarioCriacao}`;
    
    return cy.request({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}



function CartaoFiltroApelido(apelidoCartao) {
    const url = `cartao/api/v1/cartao?apelidoCartao=${apelidoCartao}`;
    
    return cy.request({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'accept': 'application/json'
        },
        failOnStatusCode: false
    });
}



// 🔹 Exportando todos
export { 
    OperadoraFiltroNomeFantasia,
    OperadoraFiltroCnpj,
    OperadoraFiltroSigla,
    OperadoraFiltroCidade,
    OperadoraFiltroTipoIntegracao,
    OperadoraFiltroCodigoTitularRevenda,
    OperadoraFiltroMultiplos,
    CartaoFiltroDataAlteracao,
    CartaoFiltroDataCriacao,
    CartaoFiltroUsuarioAlteracao,
    CartaoFiltroUsuarioCriacao, // 🔹 adicionado
    CartaoInativoUsuario,
    CartaoTransporteusuario,
    CartaoTransporteusuarioUsuario,
    CartaoFiltroApelido
};