$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500)
})

//1.导航栏的切换    
$(".category").on('click', function () {
    $(this).next().stop().slideToggle();
})

//2.侧边栏的退出与进入
$(".icon .pull-left").on('click', function () {
    $(".lt_aside").toggleClass("hide_aside");
    $(".contain .icon").toggleClass("hide_icon");
    $(".contain").toggleClass("hide_contain");
})

$(function () {
    //模态框的出现
    $(".icon .pull-right").on('click', function () {
        $('#myModal').modal('show')
    })

    //模态框的退出
    $(".log-out").on('click', function () {
        $.ajax({
            url: '/employee/employeeLogout',
            dataType: 'json',
            type: 'get',
            success: function (info) {
                if (info.success) {
                    location.href = 'login.html';
                }
            }
        })
    })
})