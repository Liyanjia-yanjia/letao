$.ajax({
    url:'/employee/checkRootLogin',
    dataType:'json',
    type:'get',
    success:function (info) {
        console.log(info);
        if(info.success){
            console.log("用户已登录");
        }
        if(info.error === 400){
            location.href="login.html";
        }
    }
})