package pages;

import core.DriverFactory;
import io.appium.java_client.MobileBy;
import org.junit.Assert;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class LoginPage extends DriverFactory {


    public void registrarnovousuario() {
        esperarElemento().until(ExpectedConditions.visibilityOfElementLocated(MobileBy.id("textViewLinkRegister"))).click();
    }


    public void registrausuario() {
        esperarElemento().until(ExpectedConditions.visibilityOfElementLocated(MobileBy.id("textInputEditTextName"))).sendKeys("Cicero Silva");
        pegaDriver().findElement(MobileBy.id("textInputEditTextEmail")).sendKeys("cicero@tester.com");
        pegaDriver().findElement(MobileBy.id("textInputEditTextPassword")).sendKeys("123456");
        pegaDriver().findElement(MobileBy.id("textInputEditTextConfirmPassword")).sendKeys("123456");
        pegaDriver().findElement(MobileBy.id("appCompatButtonRegister")).click();
        pegaDriver().navigate().back();
    }

    public void loginnovousuario() {
        esperarElemento().until(ExpectedConditions.visibilityOfElementLocated(MobileBy.id("textInputEditTextEmail"))).sendKeys("cicero@tester.com");
        pegaDriver().findElement(MobileBy.id("textInputEditTextPassword")).sendKeys("123456");
        pegaDriver().findElement(MobileBy.id("appCompatButtonLogin")).click();
    }


    public void redirecionatelaprincipal() {
        Assert.assertEquals("Android NewLine Learning",
                esperarElemento().until(ExpectedConditions.visibilityOfElementLocated(MobileBy.xpath("" +
                        "//android.support.v7.widget.LinearLayoutCompat/android.widget.TextView"))).getText());
    }
}
