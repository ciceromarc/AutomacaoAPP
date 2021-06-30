package steps;
import core.DriverFactory;
import io.cucumber.java.After;
import io.cucumber.java.AfterStep;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import utils.EvidenciaWord;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Hooks {
    DriverFactory driverFactory = new DriverFactory();
    DateFormat dataEvidencia = new SimpleDateFormat("dd-MM-yyyy_HH_mm_ss");
    EvidenciaWord evidenciaWord = new EvidenciaWord();

    @Before
    public void inicializarDriver() throws IOException, InvalidFormatException {
//        evidenciaWord.abreDocumento(); para não gerar evidencias
//        evidenciaWord.criarCabecalho();
//        evidenciaWord.inserirConteudoCabecalho();
//        evidenciaWord.criarTabela();
        driverFactory.iniciarDriver();
        driverFactory.esperarElemento();
    }
    @After
    public void eliminarDriver(Scenario scenario) throws IOException {
        // Não gera Evidencia
//        evidenciaWord.insereConteudoTabela(scenario, "Nome do QA");
//        evidenciaWord.fecharDocumento("evidencia-word" + dataEvidencia.format(new Date()));
        driverFactory.pegaDriver().quit();
    }
    @AfterStep //
    public void tirarScreenshot(Scenario scenario) throws IOException, InvalidFormatException {
        //if (scenario.isFailed())
        //{
        byte[] screenshot = ((TakesScreenshot) driverFactory.pegaDriver()).getScreenshotAs(OutputType.BYTES);
        scenario.attach(screenshot, "image/png", scenario.getName());
        //}
        // evidenciaWord.tirarScreenshot("screenshot" + dataEvidencia.format(new Date()));
        //      evidenciaWord.salvarScreenshotWord("screenshot" + dataEvidencia.format(new Date()));
    }
}
