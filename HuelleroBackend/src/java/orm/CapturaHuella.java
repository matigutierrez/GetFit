/**
 * "Visual Paradigm: DO NOT MODIFY THIS FILE!"
 * 
 * This is an automatic generated file. It will be regenerated every time 
 * you generate persistence class.
 * 
 * Modifying its content may cause the program not work, or your work may lost.
 */

/**
 * Licensee: Universidad de La Frontera
 * License Type: Academic
 */
package orm;

import java.io.Serializable;
import javax.persistence.*;
@Entity
@org.hibernate.annotations.Proxy(lazy=false)
@Table(name="tgf_captura_huella")
public class CapturaHuella implements Serializable {
	public CapturaHuella() {
	}
	
	@Column(name="id", nullable=false, length=11)	
	@Id	
	@GeneratedValue(generator="ORM_CAPTURAHUELLA_ID_GENERATOR")	
	@org.hibernate.annotations.GenericGenerator(name="ORM_CAPTURAHUELLA_ID_GENERATOR", strategy="native")	
	private int id;
	
	@ManyToOne(targetEntity=orm.Sede.class, fetch=FetchType.LAZY)	
	@org.hibernate.annotations.Cascade({org.hibernate.annotations.CascadeType.SAVE_UPDATE, org.hibernate.annotations.CascadeType.LOCK})	
	@JoinColumns({ @JoinColumn(name="tgf_sede_id", referencedColumnName="id", nullable=false) })	
	private orm.Sede sede;
	
	@Column(name="cah_fecha", nullable=false)	
	private java.sql.Timestamp fecha;
	
	@Column(name="cah_muestra", nullable=false)	
	private java.sql.Blob muestra;
	
	private void setId(int value) {
		this.id = value;
	}
	
	public int getId() {
		return id;
	}
	
	public int getORMID() {
		return getId();
	}
	
	public void setFecha(java.sql.Timestamp value) {
		this.fecha = value;
	}
	
	public java.sql.Timestamp getFecha() {
		return fecha;
	}
	
	public void setMuestra(java.sql.Blob value) {
		this.muestra = value;
	}
	
	public java.sql.Blob getMuestra() {
		return muestra;
	}
	
	public void setSede(orm.Sede value) {
		this.sede = value;
	}
	
	public orm.Sede getSede() {
		return sede;
	}
	
	public String toString() {
		return String.valueOf(getId());
	}
	
}
