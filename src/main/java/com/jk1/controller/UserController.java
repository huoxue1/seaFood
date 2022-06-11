package com.jk1.controller;

import com.jk1.entity.User;
import com.jk1.service.UserService;
import com.jk1.utils.Resp;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    UserService userService;

    @RequestMapping("/login")
    private Resp<Integer> login(@RequestBody User user){
        Integer login = userService.login(user.getUsername(), user.getPassword());
        if (login == -1){
            return Resp.error(403,"账号密码错误");
        }else {
            return Resp.ok(login);
        }
    }

    @RequestMapping("/check_login")
    private Resp<User> checkLogin(HttpServletRequest request){
        int userId;
        try {
            userId = Integer.parseInt(request.getHeader("sea_user_id"));
        }catch (NumberFormatException e){
            return Resp.error(403,"用户未登录");
        }

        User user = userService.queryById(userId);
        if (user == null){
            return Resp.error(403,"用户不存在或未登录");
        }
        return Resp.ok(user);

    }


    @RequestMapping("/register")
    private Resp<Boolean> register(@RequestBody User user){
        // 默认注册的用户都是普通用户
        user.setRole(0);
        Integer register = userService.register(user);
        if (register == -1){
            return Resp.error(403,"该账号已存在");
        }
        return Resp.ok(true);
    }


    @RequestMapping("/list")
    private Resp<List> list(){
        return Resp.ok(userService.list());
    }


}
