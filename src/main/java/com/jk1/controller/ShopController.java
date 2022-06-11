package com.jk1.controller;

import com.jk1.entity.Shop;
import com.jk1.service.ShopService;
import com.jk1.utils.Resp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/shop")
public class ShopController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    ShopService service;

    @RequestMapping("/add")
    public Resp<Boolean> add(@RequestBody Shop shop){
        service.save(shop);
        return Resp.ok(true);
    }

    @RequestMapping("/query/{id}")
    public Resp<Shop> query(@PathVariable Integer id){
        return Resp.ok(service.queryById(id));
    }

    @RequestMapping("/delete/{id}")
    public Resp<Boolean> delete(@PathVariable Integer id){
        Shop shop = new Shop();
        shop.setId(id);
        service.delete(shop);
        return Resp.ok(true);
    }

    @RequestMapping("/list")
    public Resp<List> list(){
        return Resp.ok(service.list());
    }
}
