# language: pt
  @regressaoAPP
  Funcionalidade: Realizar login no aplicativo

    @login
  Cenario: Realizar login
    Dado que eu clico em registrar novo usuario
    Quando eu registro um usuario
    E realizo o login com este novo usuario
    Entao sou redirecionado a tela principal do aplicativo