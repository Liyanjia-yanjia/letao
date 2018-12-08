$(function () {
    $.ajax({
        url:'/user/queryUserMessage',
        dataType:'json',
        success:function (info) {
            console.log(info);
            var htmlStr = template('tmp',info);
            $('.top .info').html(htmlStr);
        }
    })

    $(".btn-back").on("click",function () {
        $.ajax({
            url:'/user/logout',
            dataType:'json',
            type:'get',
            success:function (info) {
                console.log(info);
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    })
})