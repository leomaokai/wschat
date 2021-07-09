package com.kai.wschat.mapper;


import com.kai.wschat.pojo.Msg;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MsgMapper {
    void insertMsg(Msg msg);

    List<Msg> listMsg(@Param("first") String first,@Param("second") String second);
}
