package service;

import feign.Feign;
import feign.Headers;
import feign.Param;
import feign.RequestLine;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import java.util.List;
import model.Huella;

/**
 *
 * @author Matías
 */
public interface HuellaService {
    
    public static final HuellaService instance = Feign.builder()
            .encoder( new JacksonEncoder() )
            .decoder( new JacksonDecoder() )
            .target( HuellaService.class, "http://localhost:8080/huellero" );
    
    @RequestLine("GET /huella")
    public List<Huella> query();
    
    @RequestLine("GET /huella/{id}")
    public Huella get(@Param("id") int id);
    
    @RequestLine("POST /huella")
    @Headers("Content-Type: application/json")
    public Integer create(Huella huella);
    
    @RequestLine("PUT /huella")
    @Headers("Content-Type: application/json")
    public Huella update(Huella huella);
    
    @RequestLine("DELETE /huella/{id}")
    public Huella destroy(@Param("id") int id);
    
    //@RequestLine("GET /huella/{id}/cliente")
    //public Cliente getCliente(@Param("id") int id);
    
}
