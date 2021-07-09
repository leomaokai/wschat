package com.kai.wschat.service;



import com.kai.wschat.util.RespBean;
import org.springframework.web.multipart.MultipartFile;




public interface IKFileService {

    RespBean uploadFile(MultipartFile myFile, String username);
}
