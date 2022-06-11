package com.jk1.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "goods")
public class Goods {

    @GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @JsonProperty("goods_name")
    @Column(name = "goods_name")
    private String goodsName;


    @JsonProperty("shop_id")
    @Column(name = "shop_id")
    private Integer shopId;

    @Column(name = "count")
    private Integer count;

    @Column(name = "price")
    private Float price;

    public Goods(Integer id, String goodsName, Integer shopId, Integer count, Float price) {
        this.id = id;
        this.goodsName = goodsName;
        this.shopId = shopId;
        this.count = count;
        this.price = price;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }



    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public Goods() {
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
