package restapi;

import com.digitalpersona.onetouch.DPFPDataPurpose;
import com.digitalpersona.onetouch.DPFPFeatureSet;
import com.digitalpersona.onetouch.DPFPGlobal;
import com.digitalpersona.onetouch.DPFPSample;
import com.digitalpersona.onetouch.DPFPSampleFactory;
import com.digitalpersona.onetouch.DPFPTemplate;
import com.digitalpersona.onetouch.processing.DPFPEnrollment;
import com.digitalpersona.onetouch.processing.DPFPEnrollmentFactory;
import com.digitalpersona.onetouch.processing.DPFPFeatureExtraction;
import com.digitalpersona.onetouch.processing.DPFPFeatureExtractionFactory;
import com.digitalpersona.onetouch.processing.DPFPImageQualityException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
import orm.Cliente;
import orm.ClienteDAO;
import static orm.GetfitPersistentManager.instance;
import orm.Huella;
import orm.HuellaDAO;

/**
 *
 * @author Matías
 */
@RestController
public class HuellaController {
    
    private DPFPSampleFactory               sampleFactory               = DPFPGlobal.getSampleFactory();
    private DPFPEnrollmentFactory           enrollmentFactory           = DPFPGlobal.getEnrollmentFactory();
    private DPFPFeatureExtractionFactory    featureExtractionFactory    = DPFPGlobal.getFeatureExtractionFactory();
    
    @GetMapping("huella")
    public List<model.Huella> index() throws PersistentException, SQLException {
        
        List<Huella> huellas = HuellaDAO.queryHuella(null, null);
        List<model.Huella> modelHuellas = new ArrayList<>();
        
        for ( Huella huella : huellas ) {
            
            model.Huella    modelHuella = new model.Huella();
            
            modelHuella.setId( huella.getId() );
            modelHuella.setClienteId( huella.getCliente().getId() );
            
            modelHuellas.add( modelHuella );
            
        }
        
        return modelHuellas;
        
    }
    
    @PostMapping("huella")
    public Integer store(
            @RequestBody Map datos
        ) throws PersistentException, SQLException, IOException, DPFPImageQualityException {
        
        PersistentSession       session = instance().getSession();
        PersistentTransaction   transaction = session.beginTransaction();
        
        Huella huella = HuellaDAO.createHuella();
        
        Integer             clienteId       = (Integer) datos.get("clienteId");
        List<Integer>       codigoCapturas  = (List<Integer>) datos.get("capturas");
        List<CapturaHuella> capturas        = new ArrayList<>();
        
        for ( Integer codigoCaptura : codigoCapturas ) {
            
            CapturaHuella captura = CapturaHuellaDAO.getCapturaHuellaByORMID( codigoCaptura );
            
            if ( captura != null ) {
                
                capturas.add( captura );
                
            }
            
        }
        
        DPFPEnrollment          enrollment          = enrollmentFactory.createEnrollment();
        DPFPFeatureExtraction   featureExtractor    = featureExtractionFactory.createFeatureExtraction();
        
        if ( capturas.size() >= enrollment.getFeaturesNeeded() ) {
            
            for ( CapturaHuella captura : capturas ) {
                
                Blob    muestraCaptura  = captura.getMuestra();
                byte [] muestra         = muestraCaptura.getBytes(1, (int) muestraCaptura.length() );
                
                DPFPSample      sample = sampleFactory.createSample( muestra );
                DPFPFeatureSet  features = featureExtractor.createFeatureSet(sample, DPFPDataPurpose.DATA_PURPOSE_ENROLLMENT);
                
                enrollment.addFeatures( features );
                
            }
            
        }
        
        DPFPTemplate template = enrollment.getTemplate();
        
        huella.setCliente( ClienteDAO.getClienteByORMID( clienteId ) );
        huella.setHuella( new SerialBlob( template.serialize() ) );
        
        HuellaDAO.save( huella );
        
        for ( CapturaHuella captura : capturas ) {
            
            CapturaHuellaDAO.delete( captura );
            
        }
        
        transaction.commit();
        session.close();
        
        return huella.getId();

    }
    
    @GetMapping("huella/{id}")
    public model.Huella show(
            @PathVariable("id") int id
        ) throws PersistentException, SQLException {
        
        Huella          huella = HuellaDAO.getHuellaByORMID( id );
        model.Huella    modelHuella = new model.Huella();
        
        modelHuella.setId( id );
        modelHuella.setClienteId( huella.getCliente().getId() );
        
        return modelHuella;
        
    }
    
    @PutMapping("huella")
    public model.Huella update(
            @RequestBody model.Huella bodyHuella
        ) throws PersistentException, SQLException {
        
        PersistentSession       session = instance().getSession();
        PersistentTransaction   transaction = session.beginTransaction();
        
        Huella huella = HuellaDAO.getHuellaByORMID( bodyHuella.getId() );
        
        huella.setCliente( ClienteDAO.getClienteByORMID( bodyHuella.getClienteId() ) );
        huella.setHuella( new SerialBlob( bodyHuella.getHuella() ) );
        
        HuellaDAO.save( huella );
        
        transaction.commit();
        session.close();
        
        return bodyHuella;
        
    }
    
    @DeleteMapping("huella/{id}")
    public model.Huella destroy(
            @PathVariable("id") Integer id
        ) throws PersistentException, SQLException {
        
        PersistentSession       session = instance().getSession();
        PersistentTransaction   transaction = session.beginTransaction();
        
        Huella          huella = HuellaDAO.getHuellaByORMID(id);
        model.Huella    modelHuella = new model.Huella();
        
        modelHuella.setId( huella.getId() );
        modelHuella.setClienteId( huella.getCliente().getId() );
        
        HuellaDAO.delete( huella );
        
        transaction.commit();
        session.close();
        
        return modelHuella;
        
    }
    
    @GetMapping("huella/{id}/cliente")
    public model.Cliente getCliente(
            @PathVariable("id") Integer id
        ) throws PersistentException {
        
        PersistentSession       session     = instance().getSession();
        
        Huella huella = HuellaDAO.getHuellaByORMID( id );
        
        if ( huella != null ) {
            
            Cliente         cliente         = huella.getCliente();
            model.Cliente   modelCliente    = new model.Cliente();
            
            modelCliente.setId( cliente.getId() );
            modelCliente.setRut( cliente.getRut() );
            modelCliente.setNombres( cliente.getNombres() );
            modelCliente.setApellidos( cliente.getApellidos() );
            modelCliente.setNumeroTelefonico( cliente.getNumeroTelefonico() );
            modelCliente.setDireccion( cliente.getDireccion() );
            
            session.close();
            
            return modelCliente;
            
        }
        
        session.close();
        
        return null;
        
    }
    
}
