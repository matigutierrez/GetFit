package restapi;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 *
 * @author Matías
 */
@Configuration
public class Config {
    
    @Bean
    @Primary
    public ObjectMapper getObjectMapper() {
        
        ObjectMapper objectMapper = new ObjectMapper();
        
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        
        return objectMapper;
        
    }
    
}
