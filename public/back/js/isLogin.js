$(function () {
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        dataType:'json',
        success:function (info) {
            if(info.success){
                console.log("用户已登录");
            }else{
                location.href="login.html";
            }
        }
    })
})