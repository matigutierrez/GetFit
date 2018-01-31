/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package getfit.huellero;

import com.digitalpersona.onetouch.DPFPDataPurpose;
import com.digitalpersona.onetouch.DPFPFeatureSet;
import com.digitalpersona.onetouch.DPFPSample;

/**
 *
 * @author Matías
 */
public class Aplicacion {
    
    public static void main(String [] args) throws Exception {
        
        Lector lector = new Lector();
        
        while (true) {
            DPFPFeatureSet set = lector.getFeatureSet(DPFPDataPurpose.DATA_PURPOSE_ENROLLMENT);
            System.out.println(set.serialize().length);
        }
        
    }
    
}
