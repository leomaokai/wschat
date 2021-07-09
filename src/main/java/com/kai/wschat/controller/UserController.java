package com.kai.wschat.controller;


import com.kai.wschat.pojo.User;
import com.kai.wschat.service.IUserService;
import com.kai.wschat.util.Md5Util;
import com.kai.wschat.util.RespBean;
import com.kai.wschat.util.RespBeanEnum;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
public class UserController {

    @Resource
    private IUserService userService;

    @GetMapping("/")
    public String toLogin(){
        return "user/login";
    }


    @PostMapping("/login")
    @ResponseBody
    public RespBean login(@RequestBody User user, HttpSession session) {
        return userService.login(user,session);
    }
}
