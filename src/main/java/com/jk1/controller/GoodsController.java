package com.jk1.controller;

import com.jk1.entity.Goods;
import com.jk1.service.GoodsService;
import com.jk1.utils.Resp;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/goods")
public class GoodsController {

    @Resource
    GoodsService goodsService;

    @RequestMapping("/add")
    public Resp<Boolean> add(@RequestBody Goods goods){
        goodsService.save(goods);
        return Resp.ok(true);
    }

    @RequestMapping("/goods/add")
    public Resp<Boolean> add1(){
        return Resp.ok(true);
    }

    @RequestMapping("query_by_shop_id/{id}")
    public Resp<List> queryByShopId(@PathVariable Integer id){
        return Resp.ok(goodsService.queryBySHopId(id));
    }
}
