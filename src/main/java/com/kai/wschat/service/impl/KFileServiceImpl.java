package com.kai.wschat.service.impl;

import com.kai.wschat.mapper.KFileMapper;
import com.kai.wschat.pojo.KFile;
import com.kai.wschat.service.IKFileService;
import com.kai.wschat.util.RespBean;
import com.kai.wschat.util.RespBeanEnum;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

import java.io.*;


@Service
public class KFileServiceImpl implements IKFileService {

    @Resource
    private KFileMapper fileMapper;
    @Value("${kai.resource}")
    private String resource;

    @Override
    public RespBean uploadFile(MultipartFile videoFile, String name) {

        String originalFilename = videoFile.getOriginalFilename();
        String ext = FilenameUtils.getExtension(originalFilename);
        KFile kFile = new KFile();
        String HTTPUrl = "http://localhost:89/" + name + "/" + originalFilename;
        String url = resource + "/" + name + "/" + originalFilename;
        kFile.setFilename(originalFilename).setUsername(name).setUrl(HTTPUrl);
        File file = new File(url);
        if (file.exists()) {
            file.delete();
        }
        try (
                BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(file, true));
                BufferedInputStream bufferedInputStream = new BufferedInputStream(videoFile.getInputStream());
        ) {
            byte[] bytes = new byte[1024];
            int len = 0;
            while ((len = bufferedInputStream.read(bytes)) != -1) {
                bufferedOutputStream.write(bytes, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        fileMapper.insertOne(kFile);
        return RespBean.success(RespBeanEnum.INSERT_SUCCESS,HTTPUrl);
    }


}
