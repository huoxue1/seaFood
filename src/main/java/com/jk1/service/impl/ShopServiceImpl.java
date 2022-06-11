package com.jk1.service.impl;

import com.jk1.dao.ShopDao;
import com.jk1.entity.Shop;
import com.jk1.service.ShopService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {

    @Resource
    ShopDao shopDao;

    @Override
    public void save(Shop shop) {
        shopDao.save(shop);
    }

    @Override
    public Shop queryById(Integer id) {
        return shopDao.queryById(id);
    }

    @Override
    public void delete(Shop shop) {
        shopDao.delete(shop);
    }

    @Override
    public List list() {
        return shopDao.list();
    }
}
