package com.kai.wschat.controller;


import com.alibaba.fastjson.JSONObject;
import com.kai.wschat.pojo.Msg;
import com.kai.wschat.service.IMsgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.BinaryMessage;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;


/**
 * @ServerEndpoint 可以把当前类变成websocket服务类, 客户端可以通过这个URL来连接到WebSocket服务器端
 */
@Controller
@ServerEndpoint(value = "/websocket/{username}")
public class ChatWebSocket {

    private static IMsgService msgService;

    private String toFileUsername;

    @Autowired
    public void setMsgService(IMsgService msgService) {
        ChatWebSocket.msgService = msgService;
    }

    private static ConcurrentHashMap<String, ChatWebSocket> webSocketMap = new ConcurrentHashMap<>();
    private Session websocketSession;
    private String currentUsername = "";


    @OnOpen
    public void onOpen(@PathParam(value = "username") String username, Session websocketSession) {
        currentUsername = username;
        this.websocketSession = websocketSession;
        webSocketMap.put(username, this);
    }


    @OnClose
    public void onClose() {
        if (!currentUsername.equals("")) {
            webSocketMap.remove(currentUsername);
        }
    }

    @OnMessage
    public void onMessage(String chatMsg, Session session) {
        System.out.println("=======" + chatMsg);
        JSONObject jsonObject = JSONObject.parseObject(chatMsg);
        sendToUser(jsonObject.toJavaObject(Msg.class));
    }


    /**
     * 私发
     *
     * @param msg 消息对象
     */
    private void sendToUser(Msg msg) {
        String second = msg.getSecond();
        this.toFileUsername = second;
        String content = msg.getContent();
        msgService.insertMsg(new Msg().setFirst(currentUsername).setSecond(second).setContent(content));

        try {
            if (webSocketMap.get(second) != null) {
                webSocketMap.get(second).sendMessage(currentUsername + "|" + content);
            } else {
                webSocketMap.get(currentUsername).sendMessage("0" + "|" + "当前用户不在线");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

    private void sendMessage(String s) throws IOException {
        this.websocketSession.getBasicRemote().sendText(s);
    }


}
