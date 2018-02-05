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
@Table(name="tgf_huella")
public class Huella implements Serializable {
	public Huella() {
	}
	
	@Column(name="id", nullable=false, length=11)	
	@Id	
	@GeneratedValue(generator="ORM_HUELLA_ID_GENERATOR")	
	@org.hibernate.annotations.GenericGenerator(name="ORM_HUELLA_ID_GENERATOR", strategy="native")	
	private int id;
	
	@ManyToOne(targetEntity=orm.Cliente.class, fetch=FetchType.LAZY)	
	@org.hibernate.annotations.Cascade({org.hibernate.annotations.CascadeType.SAVE_UPDATE, org.hibernate.annotations.CascadeType.LOCK})	
	@JoinColumns({ @JoinColumn(name="tgf_cliente_id", referencedColumnName="id", unique=true, nullable=false) })	
	private orm.Cliente cliente;
	
	@Column(name="hue_huella", nullable=false)	
	private java.sql.Blob huella;
	
	private void setId(int value) {
		this.id = value;
	}
	
	public int getId() {
		return id;
	}
	
	public int getORMID() {
		return getId();
	}
	
	public void setHuella(java.sql.Blob value) {
		this.huella = value;
	}
	
	public java.sql.Blob getHuella() {
		return huella;
	}
	
	public void setCliente(orm.Cliente value) {
		this.cliente = value;
	}
	
	public orm.Cliente getCliente() {
		return cliente;
	}
	
	public String toString() {
		return String.valueOf(getId());
	}
	
}
