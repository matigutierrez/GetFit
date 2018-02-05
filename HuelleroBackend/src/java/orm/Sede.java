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
@Table(name="tgf_sede")
public class Sede implements Serializable {
	public Sede() {
	}
	
	@Column(name="id", nullable=false, length=11)	
	@Id	
	@GeneratedValue(generator="ORM_SEDE_ID_GENERATOR")	
	@org.hibernate.annotations.GenericGenerator(name="ORM_SEDE_ID_GENERATOR", strategy="native")	
	private int id;
	
	@Column(name="sed_nombre", nullable=false, unique=true, length=255)	
	private String nombre;
	
	@Column(name="sed_direccion", nullable=false, unique=true, length=255)	
	private String direccion;
	
	private void setId(int value) {
		this.id = value;
	}
	
	public int getId() {
		return id;
	}
	
	public int getORMID() {
		return getId();
	}
	
	public void setNombre(String value) {
		this.nombre = value;
	}
	
	public String getNombre() {
		return nombre;
	}
	
	public void setDireccion(String value) {
		this.direccion = value;
	}
	
	public String getDireccion() {
		return direccion;
	}
	
	public String toString() {
		return String.valueOf(getId());
	}
	
}
