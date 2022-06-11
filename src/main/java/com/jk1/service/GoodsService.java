package com.jk1.service;

import com.jk1.entity.Goods;

import java.util.List;

public interface GoodsService {
    void save(Goods goods);
    List queryBySHopId(Integer shopId);
}
