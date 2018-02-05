/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package huellero;

import com.digitalpersona.onetouch.DPFPSample;
import java.sql.Timestamp;
import java.time.Instant;
import model.CapturaHuella;
import service.CapturaHuellaService;

/**
 *
 * @author Matías
 */
public class Aplicacion {
    
    public static void main(String [] args) throws Exception {
        
        System.out.println("Lector de Huella Iniciado");
        
        Lector                  lector      = new Lector();
        CapturaHuellaService    service     = CapturaHuellaService.instance;
        
        while (true) {
            
            DPFPSample sample = lector.getSample();
            
            if ( sample != null ) {
                
                CapturaHuella   captura = new CapturaHuella();
                byte []         muestra = sample.serialize();
                
                captura.setSedeId( 1 );
                captura.setFecha( Timestamp.from( Instant.now() ) );
                captura.setMuestra( muestra );
                
                System.out.println("Enviando muestra (" + muestra.length + " bytes)");
                
                try {
                    
                    service.create( captura );
                    
                } catch ( feign.FeignException e ) {
                    
                }
                
            }
            
        }
        
    }
    
}
