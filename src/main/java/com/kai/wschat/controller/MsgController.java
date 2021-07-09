package com.kai.wschat.controller;


import com.alibaba.fastjson.JSONObject;
import com.kai.wschat.pojo.Msg;
import com.kai.wschat.pojo.User;
import com.kai.wschat.service.IKFileService;
import com.kai.wschat.service.IMsgService;
import com.kai.wschat.service.IUserService;
import com.kai.wschat.util.RespBean;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Controller
public class MsgController {

    @Resource
    private IUserService userService;
    @Resource
    private IMsgService msgService;
    @Resource
    private IKFileService fileService;
    @Value("${kai.resource}")
    private String resource;

    @GetMapping("/chat/toChat")
    public String toChat() {
        return "chat/chats";
    }

    @GetMapping("/chat/listUser")
    @ResponseBody
    public List<User> listUser(HttpSession session) {
        String username = (String) session.getAttribute("username");
        return userService.listUsername(username);
    }

    @GetMapping("/chat/listMsg/{second}")
    @ResponseBody
    public List<Msg> listMsg(@PathVariable(value = "second") String second, HttpSession session) {
        String first = (String) session.getAttribute("username");
        return msgService.listMsg(first, second);
    }

    @PostMapping("/chat/upImg")
    @ResponseBody
    public JSONObject upImg(@RequestParam(value = "file", required = false) MultipartFile img) {
        JSONObject res = new JSONObject();
        JSONObject resUrl = new JSONObject();
        LocalDate today = LocalDate.now();
        Instant timestamp = Instant.now();
        String ext = FilenameUtils.getExtension(img.getOriginalFilename());
        String filenames = today + String.valueOf(timestamp.toEpochMilli()) + "." + ext;
//        file.transferTo(new File("/ws_chat_pic/" + filenames));

        String url = resource + "/" + filenames;
        File file = new File(url);
        if (file.exists()) {
            file.delete();
        }

        try (
                BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(file, true));
                BufferedInputStream bufferedInputStream = new BufferedInputStream(img.getInputStream());
        ) {
            byte[] bytes = new byte[1024];
            int len = 0;
            while ((len = bufferedInputStream.read(bytes)) != -1) {
                bufferedOutputStream.write(bytes, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }


        resUrl.put("src", resource + "/" + filenames);
        res.put("msg", "");
        res.put("code", 0);
        res.put("data", resUrl);
        return res;
    }

    @PostMapping("/chat/fileUpload")
    @ResponseBody
    public RespBean fileUpload(@RequestParam("myFile") MultipartFile myFile, HttpSession session) {
        String username = (String) session.getAttribute("username");
        System.out.println("fileUpload" + username);
        return fileService.uploadFile(myFile, username);
    }
}
