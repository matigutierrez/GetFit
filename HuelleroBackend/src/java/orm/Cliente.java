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
@Table(name="tgf_cliente")
public class Cliente implements Serializable {
	public Cliente() {
	}
	
	@Column(name="id", nullable=false, length=11)	
	@Id	
	@GeneratedValue(generator="ORM_CLIENTE_ID_GENERATOR")	
	@org.hibernate.annotations.GenericGenerator(name="ORM_CLIENTE_ID_GENERATOR", strategy="native")	
	private int id;
	
	@Column(name="cli_rut", nullable=false, unique=true, length=30)	
	private String rut;
	
	@Column(name="cli_nombres", nullable=false, length=255)	
	private String nombres;
	
	@Column(name="cli_apellidos", nullable=false, length=255)	
	private String apellidos;
	
	@Column(name="cli_numerotelefonico", nullable=true, length=30)	
	private String numeroTelefonico;
	
	@Column(name="cli_direccion", nullable=true, length=255)	
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
	
	public void setRut(String value) {
		this.rut = value;
	}
	
	public String getRut() {
		return rut;
	}
	
	public void setNombres(String value) {
		this.nombres = value;
	}
	
	public String getNombres() {
		return nombres;
	}
	
	public void setApellidos(String value) {
		this.apellidos = value;
	}
	
	public String getApellidos() {
		return apellidos;
	}
	
	public void setNumeroTelefonico(String value) {
		this.numeroTelefonico = value;
	}
	
	public String getNumeroTelefonico() {
		return numeroTelefonico;
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
