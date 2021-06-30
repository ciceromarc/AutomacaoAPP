package utils;
import core.DriverFactory;
import io.cucumber.java.Scenario;
import org.apache.commons.io.FileUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.util.Units;
import org.apache.poi.wp.usermodel.HeaderFooterType;
import org.apache.poi.xwpf.usermodel.*;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
public class EvidenciaWord extends DriverFactory {
    XWPFDocument documentoWord = new XWPFDocument();
    XWPFRun run = null;
    DateFormat dataEvidencia = new SimpleDateFormat("dd-MM-yyyy_HH_mm_ss");
    XWPFTable tabela = null;
    XWPFParagraph paragrafoWord = null;
    public void abreDocumento(){
        XWPFParagraph paragrafoWord = documentoWord.createParagraph();
        run = paragrafoWord.createRun();
    }
    public void criarCabecalho(){
        XWPFHeader cabecalho = documentoWord.createHeader(HeaderFooterType.DEFAULT);
        paragrafoWord = cabecalho.createParagraph();
        run = paragrafoWord.createRun();
    }
    public void inserirConteudoCabecalho() throws IOException, InvalidFormatException {
        paragrafoWord.setAlignment(ParagraphAlignment.LEFT);
        FileInputStream LogoProjeto = new FileInputStream("src/main/resources/support/logoProjetoTeste.png");
        run.addPicture(LogoProjeto, XWPFDocument.PICTURE_TYPE_PNG, "logoProjetoTeste.png", Units.toEMU(100), Units.toEMU(80));
    }

    public void criarTabela(){
        tabela = documentoWord.createTable();
        tabela.setWidth(9000);
    }
    public void insereConteudoTabela(Scenario scenario, String nomeQa){
        XWPFTableRow primeiraLinha = tabela.getRow(0);
        primeiraLinha.getCell(0).setText("Nome do cenário");
        primeiraLinha.addNewTableCell().setText(scenario.getName());
        XWPFTableRow segundaLinha = tabela.createRow();
        segundaLinha.getCell(0).setText("Nome do QA");
        segundaLinha.getCell(1).setText(nomeQa);
        XWPFTableRow terceiraLinha = tabela.createRow();
        terceiraLinha.getCell(0).setText("Status do teste");
        terceiraLinha.getCell(1).setText(scenario.getStatus().toString());
        XWPFTableRow quartaLinha = tabela.createRow();
        quartaLinha.getCell(0).setText("Plataforma de execução");
        quartaLinha.getCell(1).setText(pegaDriver().getPlatformName());
    }
    public void criarParagrafo(){
        paragrafoWord = documentoWord.createParagraph();
        run = paragrafoWord.createRun();
        run.addBreak();
    }
    public void salvarScreenshotWord(String nomeScreenshot) throws IOException, InvalidFormatException {
        criarParagrafo();
        tirarScreenshot("screenshot" + dataEvidencia.format(new Date()));
        FileInputStream caminhoImagens = new FileInputStream("src/main/resources/evidencias/screenshots/" + nomeScreenshot + ".png");
        run.addPicture(caminhoImagens, XWPFDocument.PICTURE_TYPE_PNG, null, Units.toEMU(200), Units.toEMU(450));
        run.addBreak();
    }
    public void fecharDocumento(String nomeDocumento) throws IOException{
        FileOutputStream caminhoDocumento = new FileOutputStream("src/main/resources/evidencias/"+ nomeDocumento + ".docx");
        documentoWord.write(caminhoDocumento);
        documentoWord.close();
    }
    public void tirarScreenshot(String nomeEvidencia){
        try {
            File screenshot = ((TakesScreenshot) pegaDriver()).getScreenshotAs(OutputType.FILE);
            FileUtils.copyFile(screenshot, new File("src/main/resources/evidencias/screenshots/" + nomeEvidencia + ".png"));
        }catch (IOException e){
            e.getCause();
        }
    }
}