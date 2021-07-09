package com.kai.wschat.service;

import com.kai.wschat.pojo.User;
import com.kai.wschat.util.RespBean;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface IUserService {
    RespBean login(User user, HttpSession session);

    List<User> listUsername(String username);
}
