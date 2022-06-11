package com.jk1.dao;

import com.jk1.entity.Goods;
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
public class GoodsDao {

    Logger logger = LoggerFactory.getLogger(UserDao.class);
    @Resource
    private SessionFactory sessionFactory;

    public void save(Goods goods){
        this.sessionFactory.getCurrentSession().save(goods);
    }

    public List queryByShopId(Integer shopId){
        return sessionFactory.
                getCurrentSession().
                createQuery("from Goods where shopId=?1").
                setParameter(1,shopId).
                list();
    }
}
