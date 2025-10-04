@JREQ-CUK-1
Feature: Cadastrar usuário no Keycloak
  Como aplicação "Usuários"
  Quero cadastrar um usuário no Keycloak
  Para que ele possa autenticar e acessar os serviços do APP

  @P0 @CadastroSucesso @JREQ-CUK-2
  Scenario: Cadastrar usuário com sucesso
    Dado que o cliente possui um token de acesso válido
    E informa todos os parâmetros obrigatórios corretamente:
      | email            | joao.silva@example.com |
      | nomeCompleto     | João da Silva          |
      | dataNascimento   | 20/05/1990             |
      | cpf              | 12345678900            |
      | numeroCelular    | 5511991234567          |
      | senha            | SenhaForte123!         |
    Quando o cliente requisita o endpoint "/api/v1/" para cadastrar usuário
    Então o sistema envia os dados para o Keycloak
    E o Keycloak retorna sucesso com status 200
    E o sistema retorna a resposta contendo:
      | status     | sucesso                          |
      | idKeycloak | abc123-def456                    |
      | mensagem   | Usuário cadastrado com sucesso no Keycloak. |

  @P0 @TokenAusente @JREQ-CUK-3
  Scenario: Tentativa de cadastro sem informar token
    Dado que o cliente não informa o token de autenticação
    Quando o cliente requisita o endpoint "/api/v1/" para cadastrar usuário
    Então o sistema retorna status 401
    E exibe a mensagem de erro "GLB-E-100000"

  @P0 @TokenInvalido @JREQ-CUK-4
  Scenario: Tentativa de cadastro com token inválido
    Dado que o cliente informa um token de autenticação inválido
    Quando o cliente requisita o endpoint "/api/v1/" para cadastrar usuário
    Então o sistema retorna status 401
    E exibe a mensagem de erro "GLB-E-100001"

  @P1 @ParametroAusente @JREQ-CUK-5
  Scenario Outline: Tentativa de cadastro com parâmetro obrigatório ausente
    Dado que o cliente informa um token válido
    E não informa o parâmetro obrigatório "<campo>"
    Quando o cliente requisita o endpoint "/api/v1/" para cadastrar usuário
    Então o sistema retorna status 400
    E exibe a mensagem de erro "GLB-E-100003"

    Examples:
      | campo         |
      | email         |
      | nomeCompleto  |
      | dataNascimento|
      | cpf           |
      | numeroCelular |
      | senha         |

  @P1 @DataNascimentoInvalida @JREQ-CUK-6
  Scenario: Tentativa de cadastro com data de nascimento inválida (futura)
    Dado que o cliente informa um token válido
    E informa a data de nascimento "30/12/2099"
    Quando o cliente requisita o endpoint "/api/v1/" para cadastrar usuário
    Então o sistema retorna status 400
    E exibe a mensagem de erro "MSG-USUARIOS-E-100010"

  @P1 @FalhaKeycloak @JREQ-CUK-7
  Scenario: Falha ao cadastrar usuário no Keycloak
    Dado que o cliente informa todos os dados corretamente
    E o token é válido
    Mas o Keycloak retorna um erro interno (500)
    Quando o sistema tenta cadastrar o usuário
    Então o sistema retorna status 500
    E exibe a mensagem de erro "MSG-IDP-E-100001"
    E não salva nenhum dado localmente
