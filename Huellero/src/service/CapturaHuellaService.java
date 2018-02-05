package service;

import feign.Feign;
import feign.Headers;
import feign.RequestLine;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import model.CapturaHuella;

/**
 *
 * @author Matías
 */
public interface CapturaHuellaService {
    
    public static final CapturaHuellaService instance = Feign.builder()
            .encoder( new JacksonEncoder() )
            .decoder( new JacksonDecoder() )
            .target( CapturaHuellaService.class, "http://localhost:8080/huellero" );
    
    @RequestLine("POST /capturahuella")
    @Headers("Content-Type: application/json")
    public Integer create(CapturaHuella captura);
    
}
