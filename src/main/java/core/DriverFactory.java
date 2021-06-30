package core;
import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileElement;
import io.appium.java_client.remote.MobileCapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.WebDriverWait;


import java.net.MalformedURLException;
import java.net.URL;


public class DriverFactory {
    public static AppiumDriver<MobileElement> driver;
    public DesiredCapabilities configuracaoEmulador(){
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "android");
        capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "android-emulator");
        capabilities.setCapability(MobileCapabilityType.AUTOMATION_NAME, "uiautomator2");
        capabilities.setCapability(MobileCapabilityType.APP, "C:/IdeaProjects/AutomacaoAPP/AppLoginSample.apk");
        return capabilities;
    }
    public void iniciarDriver(){
        try {
            driver = new AppiumDriver<>(new URL("http://127.0.1:4723/wd/hub"), configuracaoEmulador());
        }catch (MalformedURLException exception)
        {
            System.out.println("url invalida" + exception.getLocalizedMessage());
        }
    }
    public AppiumDriver<MobileElement> pegaDriver(){
        return  driver;
    }
    public WebDriverWait esperarElemento(){
        //iniciarDriver(); //  aqui que estava duplicando a inicialização
        WebDriverWait wait;
        wait = new WebDriverWait(pegaDriver(), 120);
        return wait;
    }



}
