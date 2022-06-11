package com.jk1.service;

import com.jk1.entity.User;

import java.util.List;

public interface UserService {
    Integer login(String username,String password);
    Integer register(User user);
    User queryById(Integer id);
    List list();
}
