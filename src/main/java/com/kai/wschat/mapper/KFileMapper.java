package com.kai.wschat.mapper;

import com.kai.wschat.pojo.KFile;
import org.apache.ibatis.annotations.Param;


public interface KFileMapper {
    void insertOne(@Param("kFile")KFile kFile);
}
