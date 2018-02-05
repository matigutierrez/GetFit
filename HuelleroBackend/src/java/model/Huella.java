package model;

/**
 *
 * @author Matías
 */
public class Huella {
    
    private Integer     id;
    private Integer     clienteId;
    private byte []     huella;
    
    public Huella() {
        
        this.id         = null;
        this.clienteId  = null;
        this.huella     = null;
        
    }
    
    public Integer getId() {
        
        return this.id;
        
    }
    
    public void setId(Integer id) {
        
        this.id = id;
        
    }
    
    public Integer getClienteId() {
        
        return this.clienteId;
        
    }
    
    public void setClienteId(Integer clienteId) {
        
        this.clienteId = clienteId;
        
    }
    
    public byte [] getHuella() {
        
        return this.huella;
        
    }
    
    public void setHuella(byte [] huella) {
        
        this.huella = huella;
        
    }
    
}
