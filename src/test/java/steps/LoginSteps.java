package steps;

import io.cucumber.java.pt.Dado;
import io.cucumber.java.pt.Entao;
import io.cucumber.java.pt.Quando;
import pages.LoginPage;

public class LoginSteps {
    LoginPage loginpage = new LoginPage();
    @Dado("que eu clico em registrar novo usuario")
    public void que_eu_clico_em_registrar_novo_usuario() {
        loginpage.registrarnovousuario();

    }

    @Quando("eu registro um usuario")
    public void eu_registro_um_usuario() {
        loginpage.registrausuario();

    }

    @Quando("realizo o login com este novo usuario")
    public void realizo_o_login_com_este_novo_usuario() throws InterruptedException{
        loginpage.loginnovousuario();

    }

    @Entao("sou redirecionado a tela principal do aplicativo")
    public void sou_redirecionado_a_tela_principal_do_aplicativo() {
        loginpage.redirecionatelaprincipal();

    }


}
