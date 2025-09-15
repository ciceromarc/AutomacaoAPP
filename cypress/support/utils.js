// Gera um CPF válido com dígitos verificadores reais
function gerarCpfValido() {
    const gerarNumeroAleatorio = () => Math.floor(Math.random() * 9);

    let cpf = Array.from({ length: 9 }, gerarNumeroAleatorio);

    // Calcula primeiro dígito verificador
    let soma = cpf.reduce((acc, num, index) => acc + num * (10 - index), 0);
    let digito1 = 11 - (soma % 11);
    if (digito1 >= 10) digito1 = 0;

    cpf.push(digito1);

    // Calcula segundo dígito verificador
    soma = cpf.reduce((acc, num, index) => acc + num * (11 - index), 0);
    let digito2 = 11 - (soma % 11);
    if (digito2 >= 10) digito2 = 0;

    cpf.push(digito2);

    return cpf.join('');
}

// Torna disponível globalmente no Cypress
Cypress.Commands.add('gerarCpfValido', () => {
    return gerarCpfValido();
});