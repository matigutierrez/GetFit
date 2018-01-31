package getfit.huellero;

import com.digitalpersona.onetouch.DPFPDataPurpose;
import com.digitalpersona.onetouch.DPFPFeatureSet;
import com.digitalpersona.onetouch.DPFPGlobal;
import com.digitalpersona.onetouch.DPFPSample;
import com.digitalpersona.onetouch.capture.DPFPCapture;
import com.digitalpersona.onetouch.capture.DPFPCaptureFactory;
import com.digitalpersona.onetouch.capture.DPFPCapturePriority;
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
    
    private static DPFPReadersCollectionFactory readerFactory = DPFPGlobal.getReadersFactory();
    private static DPFPCaptureFactory           captureFactory = DPFPGlobal.getCaptureFactory();
    private static DPFPFeatureExtractionFactory featureExtractionFactory = DPFPGlobal.getFeatureExtractionFactory();
    
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
            System.out.println(captura);
            captura.startCapture();
            return queue.take();
            
        } catch ( Exception e ) {
            
            e.printStackTrace();
            
        } finally {
            
            captura.stopCapture();
            
        }
        
        return null;
        
    }
    
    public DPFPFeatureSet getFeatureSet(DPFPDataPurpose dataPurpose) throws DPFPImageQualityException {
        
        DPFPSample sample = this.getSample();
        
        if ( sample != null ) {
            
            DPFPFeatureExtraction   featureExtractor = featureExtractionFactory.createFeatureExtraction();
            DPFPFeatureSet          featureSet = featureExtractor.createFeatureSet(sample, dataPurpose);

            return featureSet;
            
        }
        
        return null;
        
    }
    
}
