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

public class CapturaHuellaDAO {
	public static CapturaHuella loadCapturaHuellaByORMID(int id) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return loadCapturaHuellaByORMID(session, id);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella getCapturaHuellaByORMID(int id) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return getCapturaHuellaByORMID(session, id);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella loadCapturaHuellaByORMID(int id, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return loadCapturaHuellaByORMID(session, id, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella getCapturaHuellaByORMID(int id, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return getCapturaHuellaByORMID(session, id, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella loadCapturaHuellaByORMID(PersistentSession session, int id) throws PersistentException {
		try {
			return (CapturaHuella) session.load(orm.CapturaHuella.class, new Integer(id));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella getCapturaHuellaByORMID(PersistentSession session, int id) throws PersistentException {
		try {
			return (CapturaHuella) session.get(orm.CapturaHuella.class, new Integer(id));
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella loadCapturaHuellaByORMID(PersistentSession session, int id, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			return (CapturaHuella) session.load(orm.CapturaHuella.class, new Integer(id), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella getCapturaHuellaByORMID(PersistentSession session, int id, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			return (CapturaHuella) session.get(orm.CapturaHuella.class, new Integer(id), lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryCapturaHuella(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return queryCapturaHuella(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryCapturaHuella(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return queryCapturaHuella(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella[] listCapturaHuellaByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return listCapturaHuellaByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella[] listCapturaHuellaByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return listCapturaHuellaByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static List queryCapturaHuella(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From orm.CapturaHuella as CapturaHuella");
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
	
	public static List queryCapturaHuella(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From orm.CapturaHuella as CapturaHuella");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("CapturaHuella", lockMode);
			return query.list();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella[] listCapturaHuellaByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		try {
			List list = queryCapturaHuella(session, condition, orderBy);
			return (CapturaHuella[]) list.toArray(new CapturaHuella[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella[] listCapturaHuellaByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			List list = queryCapturaHuella(session, condition, orderBy, lockMode);
			return (CapturaHuella[]) list.toArray(new CapturaHuella[list.size()]);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella loadCapturaHuellaByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return loadCapturaHuellaByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella loadCapturaHuellaByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return loadCapturaHuellaByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella loadCapturaHuellaByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		CapturaHuella[] capturaHuellas = listCapturaHuellaByQuery(session, condition, orderBy);
		if (capturaHuellas != null && capturaHuellas.length > 0)
			return capturaHuellas[0];
		else
			return null;
	}
	
	public static CapturaHuella loadCapturaHuellaByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		CapturaHuella[] capturaHuellas = listCapturaHuellaByQuery(session, condition, orderBy, lockMode);
		if (capturaHuellas != null && capturaHuellas.length > 0)
			return capturaHuellas[0];
		else
			return null;
	}
	
	public static java.util.Iterator iterateCapturaHuellaByQuery(String condition, String orderBy) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return iterateCapturaHuellaByQuery(session, condition, orderBy);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateCapturaHuellaByQuery(String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		try {
			PersistentSession session = orm.GetfitPersistentManager.instance().getSession();
			return iterateCapturaHuellaByQuery(session, condition, orderBy, lockMode);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static java.util.Iterator iterateCapturaHuellaByQuery(PersistentSession session, String condition, String orderBy) throws PersistentException {
		StringBuffer sb = new StringBuffer("From orm.CapturaHuella as CapturaHuella");
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
	
	public static java.util.Iterator iterateCapturaHuellaByQuery(PersistentSession session, String condition, String orderBy, org.hibernate.LockMode lockMode) throws PersistentException {
		StringBuffer sb = new StringBuffer("From orm.CapturaHuella as CapturaHuella");
		if (condition != null)
			sb.append(" Where ").append(condition);
		if (orderBy != null)
			sb.append(" Order By ").append(orderBy);
		try {
			Query query = session.createQuery(sb.toString());
			query.setLockMode("CapturaHuella", lockMode);
			return query.iterate();
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static CapturaHuella createCapturaHuella() {
		return new orm.CapturaHuella();
	}
	
	public static boolean save(orm.CapturaHuella capturaHuella) throws PersistentException {
		try {
			orm.GetfitPersistentManager.instance().saveObject(capturaHuella);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean delete(orm.CapturaHuella capturaHuella) throws PersistentException {
		try {
			orm.GetfitPersistentManager.instance().deleteObject(capturaHuella);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean refresh(orm.CapturaHuella capturaHuella) throws PersistentException {
		try {
			orm.GetfitPersistentManager.instance().getSession().refresh(capturaHuella);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
	public static boolean evict(orm.CapturaHuella capturaHuella) throws PersistentException {
		try {
			orm.GetfitPersistentManager.instance().getSession().evict(capturaHuella);
			return true;
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new PersistentException(e);
		}
	}
	
}
