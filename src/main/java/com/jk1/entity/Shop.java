package com.jk1.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;

@Table(name = "shop")
@Entity
public class Shop {

    @GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    @Column(name = "id")
    private Integer id;

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Shop(Integer id, String avatar, String shopName, Integer adminId, String introduction) {
        this.id = id;
        this.avatar = avatar;
        this.shopName = shopName;
        this.adminId = adminId;
        this.introduction = introduction;
    }

    @Column(name = "avatar")
    private String avatar;

    @JsonProperty("shop_name")
    @Column(name = "shop_name")
    private String shopName;

    @JsonProperty("admin_id")
    @Column(name = "admin_id")
    private Integer adminId;

    @Column(name = "introduction")
    private String introduction;

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }



    public Shop() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }



}
