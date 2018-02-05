package restapi;

import com.digitalpersona.onetouch.DPFPDataPurpose;
import com.digitalpersona.onetouch.DPFPFeatureSet;
import com.digitalpersona.onetouch.DPFPGlobal;
import com.digitalpersona.onetouch.DPFPSample;
import com.digitalpersona.onetouch.DPFPSampleFactory;
import com.digitalpersona.onetouch.DPFPTemplate;
import com.digitalpersona.onetouch.DPFPTemplateFactory;
import com.digitalpersona.onetouch.processing.DPFPFeatureExtraction;
import com.digitalpersona.onetouch.processing.DPFPFeatureExtractionFactory;
import com.digitalpersona.onetouch.processing.DPFPImageQualityException;
import com.digitalpersona.onetouch.verification.DPFPVerification;
import com.digitalpersona.onetouch.verification.DPFPVerificationFactory;
import com.digitalpersona.onetouch.verification.DPFPVerificationResult;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.sql.rowset.serial.SerialBlob;
import org.orm.PersistentException;
import org.orm.PersistentSession;
import org.orm.PersistentTransaction;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import orm.CapturaHuella;
import orm.CapturaHuellaDAO;
import static orm.GetfitPersistentManager.instance;
import orm.Huella;
import orm.HuellaDAO;
import orm.SedeDAO;

/**
 *
 * @author Matías
 */
@RestController
public class CapturaHuellaController {
    
    private DPFPVerificationFactory         verificationFactory = DPFPGlobal.getVerificationFactory();
    private DPFPSampleFactory               sampleFactory = DPFPGlobal.getSampleFactory();
    private DPFPTemplateFactory             templateFactory = DPFPGlobal.getTemplateFactory();
    private DPFPFeatureExtractionFactory    featureExtractionFactory = DPFPGlobal.getFeatureExtractionFactory();
    
    @GetMapping("capturahuella")
    public List<model.CapturaHuella> index() throws PersistentException {
        
        PersistentSession           session         = instance().getSession();
        List<CapturaHuella>         capturas        = CapturaHuellaDAO.queryCapturaHuella(null, null);
        List<model.CapturaHuella>   modelCapturas   = new ArrayList<>();
        
        for ( CapturaHuella captura : capturas ) {
            
            model.CapturaHuella modelCaptura = new model.CapturaHuella();
            
            modelCaptura.setId( captura.getId() );
            modelCaptura.setFecha( captura.getFecha() );
            modelCaptura.setSedeId( captura.getSede().getId() );
            
            modelCapturas.add( modelCaptura );
            
        }
        
        return modelCapturas;
        
    }
    
    @PostMapping("capturahuella")
    public Integer store(
            @RequestBody model.CapturaHuella bodyCapturaHuella
        ) throws PersistentException, SQLException {
        
        PersistentSession       session     = instance().getSession();
        PersistentTransaction   transaction = session.beginTransaction();
        CapturaHuella           captura     = CapturaHuellaDAO.createCapturaHuella();
        
        try {
            
            DPFPVerification        verification = verificationFactory.createVerification();
            DPFPFeatureExtraction   featureExtractor = featureExtractionFactory.createFeatureExtraction();
            DPFPSample              sample = sampleFactory.createSample( bodyCapturaHuella.getMuestra() );
            DPFPFeatureSet          features = featureExtractor.createFeatureSet(sample, DPFPDataPurpose.DATA_PURPOSE_VERIFICATION);
            List<Huella>            huellas = HuellaDAO.queryHuella(null, null);

            for ( Huella huella : huellas ) {

                Blob    muestraHuella   = huella.getHuella();
                byte [] muestra         = muestraHuella.getBytes(1, (int) muestraHuella.length());

                DPFPTemplate            template    = templateFactory.createTemplate( muestra );
                DPFPVerificationResult  result      = verification.verify(features, template);
                
                if ( result.isVerified() ) {
                    
                    orm.Cliente cliente = huella.getCliente();
                    
                    System.out.println( cliente.getNombres() + " " + cliente.getApellidos() );
                    
                    return null;
                    
                }

            }
            
        } catch ( DPFPImageQualityException e ) {
            
        }
        
        captura.setFecha( bodyCapturaHuella.getFecha() );
        captura.setMuestra( new SerialBlob( bodyCapturaHuella.getMuestra() ) );
        captura.setSede( SedeDAO.getSedeByORMID( bodyCapturaHuella.getSedeId() ) );
        
        CapturaHuellaDAO.save( captura );
        
        transaction.commit();
        session.close();
        
        return captura.getId();
        
    }
    
    @GetMapping("capturahuella/{id}")
    public model.CapturaHuella show(
            @PathVariable("id") int id
        ) throws PersistentException {
        
        CapturaHuella       captura         = CapturaHuellaDAO.getCapturaHuellaByORMID( id );
        model.CapturaHuella modelCaptura    = new model.CapturaHuella();
        
        modelCaptura.setId( captura.getId() );
        modelCaptura.setFecha( captura.getFecha() );
        modelCaptura.setSedeId( captura.getSede().getId() );
        
        return modelCaptura;
        
    }
    
    @PutMapping("capturahuella")
    public model.CapturaHuella update(
            @RequestBody model.CapturaHuella capturaHuella
        ) throws PersistentException {
        // Este metodo no deberia hacer nada, pero debe estar presente
        
        /*
        PersistentSession       session     = instance().getSession();
        PersistentTransaction   transaction = session.beginTransaction();
        CapturaHuella           captura     = CapturaHuellaDAO.getCapturaHuellaByORMID( capturaHuella.getId() );
        
        if ( captura != null ) {
            
        }
        */
        
        return null;
        
    }
    
    @DeleteMapping("capturahuella/{id}")
    public model.CapturaHuella destroy(
            @PathVariable("id") int id
        ) throws PersistentException {
        
        PersistentSession   session = instance().getSession();
        CapturaHuella       captura = CapturaHuellaDAO.getCapturaHuellaByORMID( id );
        
        if ( captura != null ) {
            
            model.CapturaHuella modelCaptura = new model.CapturaHuella();
            
            modelCaptura.setId( modelCaptura.getId() );
            modelCaptura.setFecha( captura.getFecha() );
            modelCaptura.setSedeId( captura.getSede().getId() );
            
            CapturaHuellaDAO.delete( captura );
            
            session.close();
            
            return modelCaptura;
            
        }
        
        session.close();
        
        return null;
        
    }
    
}
