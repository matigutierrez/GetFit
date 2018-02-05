package model;

/**
 *
 * @author Matías
 */
public class Cliente {
    
    private Integer     id;
    private String      rut;
    private String      nombres;
    private String      apellidos;
    private String      numeroTelefonico;
    private String      direccion;
    
    public Cliente() {
        this.id                 = null;
        this.rut                = null;
        this.nombres            = null;
        this.apellidos          = null;
        this.numeroTelefonico   = null;
        this.direccion          = null;
    }
    
    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getRut() {
        return this.rut;
    }
    
    public void setRut(String rut) {
        this.rut = rut;
    }
    
    public String getNombres() {
        return this.nombres;
    }
    
    public void setNombres(String nombres) {
        this.nombres = nombres;
    }
    
    public String getApellidos() {
        return this.apellidos;
    }
    
    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }
    
    public String getNumeroTelefonico() {
        return this.numeroTelefonico;
    }
    
    public void setNumeroTelefonico(String numeroTelefonico) {
        this.numeroTelefonico = numeroTelefonico;
    }
    
    public String getDireccion() {
        return this.direccion;
    }
    
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    
}
