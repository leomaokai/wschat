// layui.use(['form', 'element'], function () {
//     var form = layui.form;
//     var e = layui.element;
//     form.on('submit(lookuser)', function (data) {
//         $.ajax({
//             url: basePath + "/chat/lkuser/" + data.field.username,
//             data: "",
//             contentType: "application/json;charset=UTF-8", //发送数据的格式
//             type: "post",
//             dataType: "json", //回调
//             beforeSend: function () {
//                 layer.load(1, {
//                     content: '查询中...',
//                     success: function (layero) {
//                         layero.find('.layui-layer-content').css({
//                             'padding-top': '39px',
//                             'width': '60px'
//                         });
//                     }
//                 });
//             },
//             complete: function () {
//                 layer.closeAll('loading');
//             },
//             success: function (data) {
//                 if (data.status != 200) {
//                     layer.msg(data.message, {
//                         time: 1500,
//                         icon: 2,
//                         offset: '350px'
//                     });
//                 } else {
//                     setUserInfo(data.data.userinfo);
//                 }
//             }
//         });
//         return false;
//     });
// });

var editIndex;
var layedit;
layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form,
        layer = layui.layer;
    layedit = layui.layedit;
    //设置上传图片接口
    layedit.set({
        uploadImage: {
            url: basePath + '/chat/upImg' //接口url
            , type: 'POST' //默认post
            , size: 1024 * 5
        }
    });
    //创建一个编辑器
    editIndex = layedit.build('LAY_demo_editor', {
        tool: ['face' //删除线
            , 'image'
            , 'strong' //加粗
            , 'italic' //斜体
            , 'underline' //下划线
            , '|' //分割线
            , '|' //分割线
            , '|' //分割线
            , '|' //分割线
            , '|' //分割线
            , '|' //分割线
        ],
        height: 120 //设置编辑器高度
    });

    form.verify({
        content: function () {
            layedit.sync(editIndex)
        }
    });
    form.render();
});
document.onkeydown = function (event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) { //回车键的键值为13
        send();
    }
};

/*控制鼠标移动到div显示或者隐藏div的滚动*/
function leftscroll(id) {
    if (id == 1) {
        document.getElementById("leftscroll").style.overflowY = "auto";
        document.getElementById("leftscroll").style.overflowX = "hidden";
    } else if (id == 2) {
        document.getElementById("leftscroll").style.overflowY = "hidden";
        document.getElementById("leftscroll").style.overflowX = "hidden";
    } else if (id == 3) {
        document.getElementById("msgcontent").style.overflowY = "auto";
        document.getElementById("msgcontent").style.overflowX = "hidden";
    } else if (id == 4) {
        document.getElementById("msgcontent").style.overflowY = "hidden";
        document.getElementById("msgcontent").style.overflowX = "hidden";
    }
}

// var info = new Vue({
//     el: '#userinfo',
//     data() {
//         return {
//             userinfo: []
//         }
//     },
//     mounted: function () {
//         window.setUserInfo = this.setUserInfo;
//     },
//     methods: {
//         // /**添加好友查询用户信息*/
//         // setUserInfo: function (info) {
//         //     var that = this;
//         //     that.userinfo = info;
//         //     $("#info").show();
//         // },
//         // adduser:function (uid) {
//         //     $.ajax({
//         //         url: basePath + "/chat/adduser/" + uid,
//         //         data: "",
//         //         contentType: "application/json;charset=UTF-8", //发送数据的格式
//         //         type: "post",
//         //         dataType: "json", //回调
//         //         beforeSend: function () {
//         //             layer.load(1, {
//         //                 content: '添加中...',
//         //                 success: function (layero) {
//         //                     layero.find('.layui-layer-content').css({
//         //                         'padding-top': '39px',
//         //                         'width': '60px'
//         //                     });
//         //                 }
//         //             });
//         //         },
//         //         complete: function () {
//         //             layer.closeAll('loading');
//         //         },
//         //         success: function (data) {
//         //             if (data.status != 200) {
//         //                 layer.msg(data.message, {
//         //                     time: 1500,
//         //                     icon: 2,
//         //                     offset: '350px'
//         //                 });
//         //             } else {
//         //                 layer.msg(data.message, {
//         //                     time: 1000,
//         //                     icon: 1,
//         //                     offset: '350px'
//         //                 }, function () {
//         //                     getlistnickname();//刷新好友列表
//         //                 });
//         //             }
//         //         }
//         //     });
//         // }
//     }
// })
var actuserid = null;
var app = new Vue({
    el: '#vuechat',
    data() {
        return {
            listUser: [],
            listMessage: [],
            loginUsername: username,
        }
    },
    mounted: function () {
        this.getListUser();
        window.alertnote = this.alertnote;
        window.activeuser = this.activeuser;
        window.appendmsg = this.appendmsg;
        window.getListUser = this.getListUser;
        window.sendFile = this.sendFile;
    },
    methods: {
        /**点击预览图片*/
        openimg: function (id) {
            var imgs = document.getElementById(id).getElementsByTagName("img");
            var pho = "";
            for (var i = 0; i < imgs.length; i++) {
                var img = '<img src="' + $(imgs[i]).attr("src") + '" style="width:100%;">'
                layer.open({
                    type: 1,
                    title: false, //不显示标题
                    closeBtn: 0, //不显示关闭按钮
                    shade: 0.6,//遮罩透明度
                    shadeClose: true, //开启遮罩关闭
                    anim: 0,
                    content: img
                });
            }
        },
        /*新信息提示*/
        alertnote: function (msgtouid) {
            var that = this;
            for (var i = 0; i < that.listUser.length; i++) {
                console.log(that.listUser[i].username);
                if (that.listUser[i].username === msgtouid) {
                    layer.msg(that.listUser[i].username + '发来一条信息', {
                        time: 1500,
                        icon: 0,
                        offset: '50px'
                    });
                }
            }
        },
        /*添加聊天记录*/
        appendmsg(revive, send, text) {
            this.listMessage.push({second: revive, first: send, content: text});
            console.log(this.listMessage);
            setTimeout(function () {
                document.getElementById("msg_end").scrollIntoView();
            }, 500)
        },
        /*设置点击左侧的列表的时候切换样式同时查找聊天记录*/
        selectStyle: function (item) {
            // this.$nextTick(function () {
            //     this.listUser.forEach(function (item) {
            //         Vue.set(item, 'active', false);
            //     });
            //     Vue.set(item, 'active', true);
            // });
            console.log(item)
            this.getMessageList(item.username);
            actuserid = item.username;
        },
        /*获取左侧的聊天窗口*/
        getListUser: function () {
            var that = this;
            $.ajax({
                url: basePath + "/chat/listUser",
                data: "",
                contentType: "application/json;charset=UTF-8",
                type: "get",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    that.listUser = data;
                    $("#leftc").show();
                    $("#appLoading").hide();
                },
                error: function (err) {
                    console.log("err:", err);
                }
            });
        },
        sendFile: function () {
            console.log("sendFile");
            let formData = new FormData();
            formData.append("myFile", document.getElementById("file").files[0]);
            $.ajax({
                type: 'post',
                url: basePath + '/chat/fileUpload',
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    // console.log(data);
                    // appendmsg(actuserid,this.loginUsername,data.obj);
                    // document.getElementById("msg_end").scrollIntoView();
                    let object = new Object();
                    object["second"] = actuserid;
                    object["content"] = data.obj;
                    let jsonData = JSON.stringify(object);
                    websocket.send(jsonData); //websocket发送数据
                    appendmsg(actuserid, username, data.obj); //vue追加聊天数据
                    document.getElementById("msg_end").scrollIntoView();
                }
            })
        },
        /*获取聊天记录*/
        getMessageList: function (username) {
            $("#waits").hide();
            $("#words").hide();
            $("#appLoading2").show();
            var that = this;
            $.ajax({
                type: 'get',
                url: basePath + '/chat/listMsg/' + username,
                dataType: 'json',
                contentType: "application/json;charset=UTF-8",
                success: function (msg) {
                    console.log(msg)
                    that.listMessage = msg;
                    $("#words").show();
                    $("#appLoading2").hide();
                },
                error: function (err) {
                    console.log("err:", err);
                }
            })
        }
    }, watch: {
        //聊天记录渲染完毕后，将滚动条滚动到最下面
        listMessage: function () {
            setTimeout(function () {
                document.getElementById("msg_end").scrollIntoView(
                    {
                        behavior: "smooth"
                    }
                );
            }, 500)
        }
    }
})
//var randnumber=Math.ceil(Math.random()*1000)+1;
var websocket = null;
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    //连接WebSocket节点
    websocket = new WebSocket("ws://localhost:8700/websocket/" + username);
} else {
    alert('Not support websocket')
}
//连接发生错误的回调方法
websocket.onerror = function () {
    //setMessageInnerHTML("error");
};
//连接成功建立的回调方法
websocket.onopen = function (event) {
    //setMessageInnerHTML("open");
}
//接收到消息的回调方法
websocket.onmessage = function (event) {
    setMessageInnerHTML(event.data);
}
//连接关闭的回调方法
websocket.onclose = function () {
    //setMessageInnerHTML("close");
}
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    websocket.close();
};

//将消息显示在网页上
function setMessageInnerHTML(innerHTML) {
    let msgs = innerHTML.split("|");
    console.log(msgs);
    if (msgs[0] === actuserid) {
        appendmsg(actuserid, msgs[0], msgs[1]);
    } else if (msgs[0] === "0") {
        layer.msg('当前用户不在线', {
            time: 1500,
            icon: 0,
            offset: '50px'
        });
    } else {
        alertnote(msgs[0])
    }
    document.getElementById("msg_end").scrollIntoView();
}

//关闭连接
function closeWebSocket() {
    websocket.close();
}

//发送消息
function send() {
    var layedit = layui.layedit;
    var message = layedit.getContent(editIndex);
    if (message.length == 0) {
        layer.msg("请输入发送的内容", {
            time: 2500,
            icon: 2,
            offset: "300px"
        });
        return;
    }
    // 将内容设置为空
    layedit.setContent(editIndex, "", false);
    var object = new Object();
    object["second"] = actuserid;
    object["content"] = message;
    var jsonData = JSON.stringify(object);
    websocket.send(jsonData); //websocket发送数据
    this.appendmsg(actuserid, username, message); //vue追加聊天数据
    document.getElementById("msg_end").scrollIntoView();
}

// function sendFile() {
//
//     // let inputElement = document.getElementById("file");
//     // let fileList = inputElement.files;
//     // console.log(fileList);
//     //
//     // // 消息框显示文件名
//     // for (let i = 0; i < fileList.length; i++) {
//     //     let object = new Object();
//     //     object["second"] = actuserid;
//     //     object["content"] = fileList[i].name;
//     //     object["type"] = 0;
//     //     let jsonData = JSON.stringify(object);
//     //     websocket.send(jsonData); //websocket发送数据
//     //     this.appendmsg(actuserid, username, fileList.name); //vue追加聊天数据
//     //     document.getElementById("msg_end").scrollIntoView();
//     //
//     //     let fileReader = new FileReader();
//     //     fileReader.readAsArrayBuffer(fileList[i]);
//     //
//     //     fileReader.onload = function loaded(evt) {
//     //         let binaryString = evt.target.result;
//     //         let fileObject = new Object();
//     //         fileObject["second"] = actuserid;
//     //         fileObject["fileByte"] = evt.target.result;
//     //         fileObject["type"] = 1;
//     //         websocket.send(JSON.stringify(fileObject));
//     //     }
//     // }
//
//
// }

// function sendaudio(message) {
//     if (actuserid == null) {
//         layer.msg("聊天界面未选择用户", {
//             time: 2500,
//             icon: 2,
//             offset: "300px"
//         });
//         return;
//     }
//     var object = new Object();
//     object["reciveuserid"] = actuserid;
//     object["msgtype"] = 0;
//     object["sendtext"] = "<audio controls class=\"audio-player\"><source src=" +  message + " type=\"audio/mp3\"></audio>";
//     var jsonData = JSON.stringify(object);
//     websocket.send(jsonData);
//     appendmsg("0", actuserid, userid, "<audio controls class=\"audio-player\"><source src=" +  message + " type=\"audio/mp3\"></audio>");
//     document.getElementById("msg_end").scrollIntoView();
// }

//layui面板刷新保留在当前面板
$(".layui-tab-title li").click(function () {
    var picTabNum = $(this).index();
    sessionStorage.setItem("picTabNum", picTabNum);
});
$(function () {
    var getPicTabNum = sessionStorage.getItem("picTabNum");
    $(".layui-tab-title li").eq(getPicTabNum).addClass("layui-this").siblings().removeClass("layui-this");
    $(".layui-tab-content>div").eq(getPicTabNum).addClass("layui-show").siblings().removeClass("layui-show");
})