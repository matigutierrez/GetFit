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
        
        // Inicializar lector de huellas
        System.out.println("Software Lector de Huella Iniciado");
        Lector                  lector      = new Lector();
        CapturaHuellaService    service     = CapturaHuellaService.instance;    // Cliente REST
        
        // Esperar huellas digitales
        for ( DPFPSample sample = lector.getSample(); sample != null; sample = lector.getSample() ) {
            CapturaHuella   captura = new CapturaHuella();
            captura.setSedeId( 1 );
            captura.setFecha( Timestamp.from( Instant.now() ) );
            captura.setMuestra( sample.serialize() );

            try {
                System.out.println("Enviando muestra a servidor");
                service.create( captura );                                      // Método del servicio REST
            } catch ( feign.FeignException e ) {
            }
        }
        
    }
    
}
