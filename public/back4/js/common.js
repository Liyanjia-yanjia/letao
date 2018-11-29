$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    NProgress.done();
})

$(function () {
    $(".lt_aside .category").on('click',function () {
        $(this).next().stop().slideToggle();
    })

    $(".lt_contain .header .pull-left").on('click',function () {
        $(".lt_aside").toggleClass("hide_aside");
        $(".lt_contain").toggleClass("hide_contain");
        $(".header").toggleClass("hide_header");
    })

    $(".lt_contain .header .pull-right").on('click',function () {
        $('#myModal').modal('show')
    })

    $(".modal .log-out").on('click',function () {
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