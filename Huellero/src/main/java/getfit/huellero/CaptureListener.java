/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package getfit.huellero;

import com.digitalpersona.onetouch.DPFPSample;
import com.digitalpersona.onetouch.capture.event.DPFPDataEvent;
import com.digitalpersona.onetouch.capture.event.DPFPDataListener;
import java.util.concurrent.LinkedBlockingQueue;

/**
 *
 * @author Matías
 */
public class CaptureListener implements DPFPDataListener {
    
    private LinkedBlockingQueue<DPFPSample> queue;
    
    public CaptureListener(LinkedBlockingQueue<DPFPSample> queue) {
        
        this.queue = queue;
        
    }

    @Override
    public void dataAcquired(DPFPDataEvent event) {
        
        if ( event != null & event.getSample() != null ) {
            
            try {
                
                this.queue.put( event.getSample() );
                
            } catch ( Exception e ) {
                
                e.printStackTrace();
                
            }
            
        }
        
    }
    
}
