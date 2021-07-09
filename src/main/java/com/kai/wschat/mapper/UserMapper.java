package com.kai.wschat.mapper;


import com.kai.wschat.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {


    User selectOneByUsername(@Param(value = "username") String username);

    void insertUser(@Param(value = "username") String username, @Param(value = "password") String newPassword);

    List<User> listUsername(@Param(value = "currUsername") String username);
}
