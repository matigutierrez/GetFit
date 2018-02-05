package model;

import java.sql.Timestamp;

/**
 *
 * @author Matías
 */
public class CapturaHuella {
    
    private Integer     id;
    private Integer     sedeId;
    private Timestamp   fecha;
    private byte []     muestra;
    
    public CapturaHuella() {
        this.id         = null;
        this.sedeId     = null;
        this.fecha      = null;
        this.muestra    = null;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSedeId() {
        return sedeId;
    }

    public void setSedeId(Integer sedeId) {
        this.sedeId = sedeId;
    }

    public Timestamp getFecha() {
        return fecha;
    }

    public void setFecha(Timestamp fecha) {
        this.fecha = fecha;
    }

    public byte[] getMuestra() {
        return muestra;
    }

    public void setMuestra(byte[] muestra) {
        this.muestra = muestra;
    }
    
}
