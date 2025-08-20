# Soluções para Cypress no GitLab CI

## Problema Resolvido
O erro "Missing X server or $DISPLAY" e "Failed to connect to the bus" ao executar Cypress no GitLab CI.

## Soluções Implementadas

### 1. Configuração do Display Virtual (Xvfb)
- Instalação do `xvfb` e dependências gráficas necessárias
- Configuração do display virtual com resolução adequada
- Variáveis de ambiente para modo headless

### 2. Scripts Específicos para CI
- `cypress:run:ci`: Script otimizado para ambiente CI
- `report:allure:ci`: Geração de relatório sem abertura automática
- `cypress:debug`: Script para debug com mais informações

### 3. Configurações do GitLab CI
- Cache do node_modules e cypress
- Variáveis de ambiente específicas para CI
- Retry automático em caso de falhas

### 4. Configurações do Cypress
- Modo headless forçado
- Configurações de vídeo e screenshot
- Desabilitação de segurança web para CI

## Como Usar

### Executar localmente:
```bash
npm run cypress:run
```

### Executar no CI:
```bash
npm run cypress:run:ci
```

### Debug:
```bash
npm run cypress:debug
```

## Comandos de Troubleshooting

Se ainda houver problemas, adicione estes comandos ao before_script do GitLab CI:
```bash
- echo "Verificando display..."
- echo $DISPLAY
- ps aux | grep Xvfb
- xdpyinfo -display :99 || echo "Display não disponível"
```
