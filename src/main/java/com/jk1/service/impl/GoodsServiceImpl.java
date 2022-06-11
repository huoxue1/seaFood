package com.jk1.service.impl;

import com.jk1.dao.GoodsDao;
import com.jk1.entity.Goods;
import com.jk1.service.GoodsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class GoodsServiceImpl implements GoodsService {

    @Resource
    GoodsDao goodsDao;

    @Override
    public void save(Goods goods) {
        goodsDao.save(goods);
    }

    @Override
    public List queryBySHopId(Integer shopId) {
        return goodsDao.queryByShopId(shopId);
    }
}
