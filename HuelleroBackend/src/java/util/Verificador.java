package util;

import com.digitalpersona.onetouch.DPFPFeatureSet;
import com.digitalpersona.onetouch.DPFPGlobal;
import com.digitalpersona.onetouch.DPFPTemplate;
import com.digitalpersona.onetouch.verification.DPFPVerification;
import com.digitalpersona.onetouch.verification.DPFPVerificationFactory;
import com.digitalpersona.onetouch.verification.DPFPVerificationResult;

/**
 *
 * @author Matías
 */
public class Verificador {
    
    private static final DPFPVerificationFactory    verificationFactory = DPFPGlobal.getVerificationFactory();
    
    private DPFPVerification verification;
    
    public Verificador() {
        
        this.verification = verificationFactory.createVerification();
        this.verification.setFARRequested(DPFPVerification.MEDIUM_SECURITY_FAR);
        
    }
    
    public Verificador(int i) {
        
        this.verification = verificationFactory.createVerification();
        this.verification.setFARRequested(i);
        
    }
    
    public boolean verificar(DPFPFeatureSet huella, DPFPTemplate plantilla) {
        
        DPFPVerificationResult result = this.verification.verify(huella, plantilla);
        
        /*
        if ( result.isVerified() ) {
            double precision = (double) result.getFalseAcceptRate() / DPFPVerification.PROBABILITY_ONE;
        }
        */
        
        return result.isVerified();
        
    }
    
}
