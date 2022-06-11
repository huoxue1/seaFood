package com.jk1.service;

import com.jk1.entity.Shop;

import java.util.List;

public interface ShopService {
    void save(Shop shop);
    Shop queryById(Integer id);
    void delete(Shop shop);
    List list();
}
