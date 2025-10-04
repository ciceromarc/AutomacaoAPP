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


// Gera um CPF válido aleatoriamente (formato numérico sem máscara)
function generateValidCPF() {
    const generateRandomDigit = () => Math.floor(Math.random() * 9);

    let cpf = Array.from({ length: 9 }, generateRandomDigit);

    // Calcula primeiro dígito verificador
    let sum = cpf.reduce((acc, digit, index) => acc + digit * (10 - index), 0);
    let remainder = (sum * 10) % 11;
    let firstVerifier = remainder === 10 ? 0 : remainder;
    cpf.push(firstVerifier);

    // Calcula segundo dígito verificador
    sum = cpf.reduce((acc, digit, index) => acc + digit * (11 - index), 0);
    remainder = (sum * 10) % 11;
    let secondVerifier = remainder === 10 ? 0 : remainder;
    cpf.push(secondVerifier);

    return cpf.join('');
}

// Gera e-mail aleatório válido
function generateRandomEmail() {
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'teste.com.br'];
    const randomString = Math.random().toString(36).substring(2, 10);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${randomString}@${domain}`;
}

export { generateValidCPF, generateRandomEmail, gerarCpfValido };