package huellero;

import com.digitalpersona.onetouch.DPFPDataPurpose;
import com.digitalpersona.onetouch.DPFPFeatureSet;
import com.digitalpersona.onetouch.DPFPGlobal;
import com.digitalpersona.onetouch.DPFPSample;
import com.digitalpersona.onetouch.DPFPTemplate;
import com.digitalpersona.onetouch.DPFPTemplateFactory;
import com.digitalpersona.onetouch.capture.DPFPCapture;
import com.digitalpersona.onetouch.capture.DPFPCaptureFactory;
import com.digitalpersona.onetouch.capture.DPFPCapturePriority;
import com.digitalpersona.onetouch.processing.DPFPEnrollment;
import com.digitalpersona.onetouch.processing.DPFPEnrollmentFactory;
import com.digitalpersona.onetouch.processing.DPFPFeatureExtraction;
import com.digitalpersona.onetouch.processing.DPFPFeatureExtractionFactory;
import com.digitalpersona.onetouch.processing.DPFPImageQualityException;
import com.digitalpersona.onetouch.readers.DPFPReaderDescription;
import com.digitalpersona.onetouch.readers.DPFPReadersCollectionFactory;
import java.util.concurrent.LinkedBlockingQueue;

/**
 *
 * @author Matías
 */
public class Lector {
    
    private static final DPFPReadersCollectionFactory   readerFactory = DPFPGlobal.getReadersFactory();
    private static final DPFPCaptureFactory             captureFactory = DPFPGlobal.getCaptureFactory();
    private static final DPFPFeatureExtractionFactory   featureExtractionFactory = DPFPGlobal.getFeatureExtractionFactory();
    private static final DPFPEnrollmentFactory          enrollmentFactory = DPFPGlobal.getEnrollmentFactory();
    private static final DPFPTemplateFactory            templateFactory = DPFPGlobal.getTemplateFactory();
    
    private String  serial;
    
    public Lector() throws InstantiationException {
        
        this.serial = null;
        
        for ( DPFPReaderDescription readerDescription : readerFactory.getReaders() ) {
            
            this.serial = readerDescription.getSerialNumber();
            break;
            
        }
        
        if ( this.serial == null ) {
            
            throw new InstantiationException("Se esperaba numero serial");
            
        }
        
    }
    
    public Lector(String serial) {
        
        this.serial = serial;
        
    }
    
    public String getSerial() {
        
        return this.serial;
        
    }
    
    public DPFPSample getSample() {
        
        DPFPCapture                     captura = captureFactory.createCapture();
        LinkedBlockingQueue<DPFPSample> queue   = new LinkedBlockingQueue();
        
        captura.setReaderSerialNumber(this.serial);
        captura.setPriority(DPFPCapturePriority.CAPTURE_PRIORITY_LOW);
        captura.addDataListener(new CaptureListener(queue));
        
        try {
            
            captura.startCapture();
            return queue.take();
            
        } catch ( Exception e ) {
            
            e.printStackTrace();
            
        } finally {
            
            captura.stopCapture();
            
        }
        
        return null;
        
    }
    
    public DPFPFeatureSet getFeatureSet(DPFPSample sample, DPFPDataPurpose dataPurpose) throws DPFPImageQualityException {
        
        if ( sample != null ) {
            
            DPFPFeatureExtraction   featureExtractor = featureExtractionFactory.createFeatureExtraction();
            DPFPFeatureSet          featureSet = featureExtractor.createFeatureSet(sample, dataPurpose);

            return featureSet;
            
        }
        
        return null;
        
    }
    
    public DPFPFeatureSet getFeatureSet(DPFPDataPurpose dataPurpose) throws DPFPImageQualityException {
        
        return this.getFeatureSet( this.getSample(), dataPurpose );
        
    }
    
    public DPFPEnrollment getEnrollment() throws DPFPImageQualityException {
        
        DPFPEnrollment enrollment = enrollmentFactory.createEnrollment();
        DPFPFeatureSet featureSet = this.getFeatureSet(DPFPDataPurpose.DATA_PURPOSE_ENROLLMENT);
        
        while ( enrollment.getFeaturesNeeded() > 0 ) {
            System.out.println("Ponga su huella");
            // Es necesario poner la huella aproximadamente cuatro veces
            enrollment.addFeatures( featureSet );
            
        }
        
        return enrollment;
        
    }
    
    public DPFPTemplate getEnrollmentTemplate() throws DPFPImageQualityException {
        
        return this.getEnrollment().getTemplate();
        
    }
    
    public DPFPFeatureSet getVerificationFeatureSet() throws DPFPImageQualityException {
        
        return this.getFeatureSet( this.getSample(), DPFPDataPurpose.DATA_PURPOSE_VERIFICATION );
        
    }
    
}
