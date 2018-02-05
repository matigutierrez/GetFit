package model;

/**
 *
 * @author Matías
 */
public class Sede {
    
    private Integer     id;
    private String      nombre;
    private String      direccion;
    
    public Sede() {
        this.id         = null;
        this.nombre     = null;
        this.direccion  = null;
    }
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getDireccion() {
        return direccion;
    }
    
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    
}
