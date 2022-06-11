package com.jk1.service.impl;

import com.jk1.dao.UserDao;
import com.jk1.entity.User;
import com.jk1.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    UserDao userDao;

    @Override
    public Integer login(String username, String password) {
        User user = userDao.queryByUserName(username);
        if (user == null || !user.getPassword().equals(password)){
            return -1;
        }else {
            return user.getId();
        }
    }

    @Override
    public Integer register(User user) {
        User user1 = userDao.queryByUserName(user.getUsername());
        if (user1 != null){
            return -1;
        }
        userDao.save(user);
        return 0;
    }

    @Override
    public User queryById(Integer id) {
        return userDao.queryById(id);
    }

    @Override
    public List list() {
        return userDao.list();
    }
}
