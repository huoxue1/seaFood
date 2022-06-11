package com.jk1.dao;

import com.jk1.entity.Shop;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Component
@Transactional
public class ShopDao {

    Logger logger = LoggerFactory.getLogger(UserDao.class);
    @Resource
    private SessionFactory sessionFactory;

    public void save(Shop shop){
        this.sessionFactory.getCurrentSession().save(shop);
    }

    public Shop queryById(Integer id){
        return (Shop) sessionFactory.
                getCurrentSession().
                createQuery("from Shop where id=?1").
                setParameter(1,id).
                uniqueResult();
    }

    public void delete(Shop shop){
        sessionFactory.getCurrentSession().delete(shop);
    }

    public List list(){
        return sessionFactory.getCurrentSession().createQuery("from Shop").list();
    }

}
