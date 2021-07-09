package com.kai.wschat.util;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

//公告返回对象枚举
@Getter
@ToString
@AllArgsConstructor
public enum RespBeanEnum {

    // 通用
    SUCCESS(200,"操作成功"),
    ERROR(500,"服务端异常"),
    FAIL(400,"未知错误"),
    AUTHORITY_NOT(406,"权限不足"),
    // 登录模块
    LOGIN_ERROR(500210,"用户名或密码错误"),
    MOBILE_ERROR(500211,"手机号码格式不正确"),
    BIND_ERROR(500212,"验证码错误请重新输入"),
    USER_NOT(500213,"未登录,请登录"),
    UPDATE_PWD_ERROR(500214,"旧密码错误,请重新输入"),
    LOGIN_SUCCESS(200200,"登录成功"),
    LOGOUT_SUCCESS(200201,"退出成功"),
    UPDATE_PWD_SUCCESS(200202,"更新密码成功"),
    // 提交模块
    DISPOSE_SUCCESS(200205,"布置成功"),
    DISPOSE_ERROR(500219,"布置失败"),
    INSERT_ERROR(500215,"添加失败"),
    INSERT_SUCCESS(200203,"添加成功"),
    COMMIT_SUCCESS(200204,"提交成功"),
    COMMIT_ERROR(500216,"提交失败,文件扩展名错误或重复率较高"),
    COMMIT_NOT(500217,"打开失败"),
    INIT_ERROR(500218,"初始化失败"),
    INIT_SUCCESS(200206,"初始化成功"),
    DELETE_SUCCESS(200207,"删除成功"),
    DELETE_ERROR(500219,"删除失败"),
    UPDATE_SUCCESS(200208,"修改成功"),
    UPDATE_ERROR(500220,"修改失败"),
    CHECK_ERROR(500221,"查重失败"),
    CHECK_SUCCESS(200209,"查重成功"),
    DOWN_ERROR(500222,"下载失败"),
    DOWN_SUCCESS(200210,"下载成功"),

    // 注册
    REGISTER_SUCCESS(200211,"注册成功"),
    REGISTER_ERROR(500224,"注册失败")
    ;
    private final Integer code;
    private final String message;
}
