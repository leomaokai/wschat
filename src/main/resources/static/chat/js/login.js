layui.use('form', function () {
    var form = layui.form
        , layer = layui.layer;
});

function submitLogin() {
    let username = $("#username").val();
    let password = $("#password").val();
    if (username.length === 0) {
        layer.tips("请输入学号", '#username', {
            tips: [1, "#0FA6D8"],
            tipsMore: !1,
            time: 2000
        });
        $("#username").focus();
        return false;
    }
    if (password.length === 0) {
        layer.tips("请输入密码", '#password', {
            tips: [1, "#0FA6D8"],
            tipsMore: !1,
            time: 2000
        });
        $("#password").focus();
        return false;
    }
    let object = new Object(); //创建一个存放数据的对象
    object["username"] = username;
    object["password"] = password;
    let jsonData = JSON.stringify(object); //根据数据生成json数据
    $.ajax({
        url: basePath + "/login",
        data: jsonData,
        contentType: "application/json;charset=UTF-8", //发送数据的格式
        type: "post",
        dataType: "json", //回调
        beforeSend: function () {
            layer.msg('登陆中', {
                icon: 16
                , shade: 0.01
            });
        },
        complete: function () {
            layer.closeAll('loading');
        },
        success: function (data) {
            console.log(data);
            if (data.code != 200200) {
                layer.msg(data.message, {
                    time: 1500,
                    icon: 2,
                    offset: '350px'
                });
            } else {
                layer.msg(data.message, {
                    time: 1000,
                    icon: 1,
                    offset: '350px'
                }, function () {
                    location.href = basePath + "/chat/toChat";
                });
            }
        }
    });
}