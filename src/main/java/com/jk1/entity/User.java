package com.jk1.entity;


import javax.persistence.*;

@Table(name = "user")
@Entity
public class User {

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    @Column(name = "id")
    private Integer id;

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public User(String username, String password, Integer id, Integer role) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.role = role;
    }

    // 用户权限等级，0代表普通用户，1代表超级管理员
    @Column(name = "role")
    private Integer role;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User(String username, String password, Integer id) {
        this.username = username;
        this.password = password;
        this.id = id;
    }

    public User() {

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
