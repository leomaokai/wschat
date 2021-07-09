package com.kai.wschat.service.impl;


import com.kai.wschat.mapper.MsgMapper;
import com.kai.wschat.pojo.Msg;
import com.kai.wschat.service.IMsgService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class MsgServiceImpl implements IMsgService {

    @Resource
    private MsgMapper msgMapper;
    @Override
    public void insertMsg(Msg msg) {
        msgMapper.insertMsg(msg);
    }

    @Override
    public List<Msg> listMsg(String first, String second) {
        return msgMapper.listMsg(first,second);
    }
}
