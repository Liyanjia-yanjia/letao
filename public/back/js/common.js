$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    },500)
})

$(function () {
    //1.导航栏二级分类的切换
    $(".category").on('click', function () {
        $(this).next().stop().slideToggle("active");
    })

    //2.侧边栏的退出进来
    $(".icon-left").on('click',function () {
        $(".lt_aside").toggleClass("hidden_aside");
        $('.lt_contain').toggleClass("hidden_contain");
        $('.lt_header').toggleClass("hidden_header");
    })

    //显示模态框
    $(".icon-right").on('click',function () {
        $('#myModal').modal('show');
    })

    //退出
    $(".logOutBtn").on('click',function () {
        $.ajax({
            url:'/employee/employeeLogout',
            dataType:'json',
            type:'get',
            success:function (info) {
                console.log(info);
                if(info.success){
                    location.href="login.html";
                }
            }
        })
    }) 
})
