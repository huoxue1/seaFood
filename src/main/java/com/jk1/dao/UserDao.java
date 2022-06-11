package com.jk1.dao;

import com.jk1.entity.User;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Component
@Transactional
public class UserDao {

    Logger logger = LoggerFactory.getLogger(UserDao.class);
    @Resource
    private SessionFactory sessionFactory;

    public void save(User user){
        logger.info(sessionFactory.toString());
        sessionFactory.getCurrentSession().save(user);
    }


    public User queryByUserName(String username){
        return (User) sessionFactory.getCurrentSession().createQuery("from User where username=?1")
        .setParameter(1,username).uniqueResult();
    }

    public User queryById(Integer id){
        return (User) sessionFactory.
                getCurrentSession().
                createQuery("from User where id=?1").
                setParameter(1,id).
                uniqueResult();
    }

    public List list(){
        return sessionFactory.getCurrentSession().createQuery("from User").list();
    }
}
