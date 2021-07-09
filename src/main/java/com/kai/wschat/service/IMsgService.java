package com.kai.wschat.service;

import com.kai.wschat.pojo.Msg;

import java.util.List;

public interface IMsgService {
    void insertMsg(Msg msg);

    List<Msg> listMsg(String first, String second);
}
