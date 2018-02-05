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

import org.orm.*;
import org.hibernate.Query;
import org.hibernate.LockMode;
import java.util.List;

public class HuellaDAO {
	public static Huella loadHuellaByORMID(int id) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return loadHuellaByORMID(session, id);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella getHuellaByORMID(int id) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return getHuellaByORMID(session, id);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella loadHuellaByORMID(int id, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return loadHuellaByORMID(session, id, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella getHuellaByORMID(int id, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return getHuellaByORMID(session, id, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella loadHuellaByORMID(PersistentSession session, int id) throws PersistentException {
		try {
			return (Huella) session.load(orm.Huella.class, new Integer(id));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella getHuellaByORMID(PersistentSession session, int id) throws PersistentException {
		try {
			return (Huella) session.get(orm.Huella.class, new Integer(id));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella loadHuellaByORMID(PersistentSession session, int id, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			return (Huella) session.load(orm.Huella.class, new Integer(id), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella getHuellaByORMID(PersistentSession session, int id, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			return (Huella) session.get(orm.Huella.class, new Integer(id), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryHuella(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return queryHuella(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryHuella(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return queryHuella(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella[] listHuellaByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return listHuellaByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella[] listHuellaByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return listHuellaByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryHuella(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From orm.Huella as Huella");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryHuella(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From orm.Huella as Huella");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("Huella", lockMode);
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella[] listHuellaByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		try {
			List list = queryHuella(session, condition, orderBy);
			return (Huella[]) list.toArray(new Huella[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella[] listHuellaByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			List list = queryHuella(session, condition, orderBy, lockMode);
			return (Huella[]) list.toArray(new Huella[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella loadHuellaByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return loadHuellaByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella loadHuellaByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return loadHuellaByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella loadHuellaByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		Huella[] huellas = listHuellaByQuery(session, condition, orderBy);
		if (huellas != null && huellas.length > 0)
			return huellas[0];
		else
			return null;
	}
	
	public static Huella loadHuellaByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		Huella[] huellas = listHuellaByQuery(session, condition, orderBy, lockMode);
		if (huellas != null && huellas.length > 0)
			return huellas[0];
		else
			return null;
	}
	
	public static java.util.Iterator iterateHuellaByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return iterateHuellaByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateHuellaByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return iterateHuellaByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateHuellaByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From orm.Huella as Huella");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateHuellaByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From orm.Huella as Huella");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("Huella", lockMode);
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static Huella createHuella() {
		return new orm.Huella();
	}
	
	public static boolean save(orm.Huella huella) throws PersistentException {
		try {
			orm.GetfitPersistentManager.instance().saveObject(huella);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean delete(orm.Huella huella) throws PersistentException {
		try {
			orm.GetfitPersistentManager.instance().deleteObject(huella);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean refresh(orm.Huella huella) throws PersistentException {
		try {
			orm.GetfitPersistentManager.instance().getSession().refresh(huella);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean evict(orm.Huella huella) throws PersistentException {
		try {
			orm.GetfitPersistentManager.instance().getSession().evict(huella);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
}
