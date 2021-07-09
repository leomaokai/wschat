package com.kai.wschat.service.impl;


import com.kai.wschat.mapper.UserMapper;
import com.kai.wschat.pojo.User;
import com.kai.wschat.service.IUserService;
import com.kai.wschat.util.Md5Util;
import com.kai.wschat.util.RespBean;
import com.kai.wschat.util.RespBeanEnum;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Resource
    private UserMapper userMapper;
    @Value("${kai.resource}")
    private String resource;

    @Override
    @Transactional
    public RespBean login(User user, HttpSession session) {
        String newPassword = Md5Util.StringInMd5(user.getPassword());
        User userTemp = userMapper.selectOneByUsername(user.getUsername());
        if (userTemp == null) {
            userMapper.insertUser(user.getUsername(), newPassword);
            session.setAttribute("username", user.getUsername());
            File file = new File(resource + "/" + user.getUsername());
            if (!file.exists()) {
                file.mkdirs();
            }
            return RespBean.success(RespBeanEnum.LOGIN_SUCCESS);
        } else if (userTemp.getPassword().equals(newPassword)) {
            session.setAttribute("username", user.getUsername());
            return RespBean.success(RespBeanEnum.LOGIN_SUCCESS);
        }
        return RespBean.error(RespBeanEnum.LOGIN_ERROR);
    }

    @Override
    public List<User> listUsername(String username) {
        return userMapper.listUsername(username);
    }
}
