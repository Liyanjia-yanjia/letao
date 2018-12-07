$(function () {
    $(".btn-login").on("click",function () {
        var username = $("#username").val();
        var password = $("#password").val();
        if(username.trim() == ""){
            mui.toast("请输入用户名");
            return;
        }
        if(password.trim() == ""){
            mui.toast("请输入密码");
            return;
        }
        $.ajax({
            url:'/user/login',
            dataType:'json',
            type:'post',
            data:{
                username:username,
                password:password
            },
            success:function (info) {
                console.log(info);
                if(info.error === 403){
                    mui.toast("用户名不存在");
                }
                if(info.success){
                    var str = location.srearch;
                    var value = str.indexOf("retURL");
                    if(value === -1 ){
                        location.href="user.html";
                    }else{
                        var location = str.replace("?retUrl",'');
                        location.href="location";
                    }
                   
                }
            }
        })
    })
})