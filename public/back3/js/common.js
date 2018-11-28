$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    },500)
})

$(function () {
    //模态框的出现
    $(".icon .pull-right").on('click',function () {
        $('#myModal').modal('show')
    })

    //模态框的退出
    $(".log-out").on('click',function () {
        $.ajax({
            url:'/employee/employeeLogout',
            dataType:'json',
            type:'get',
            success:function (info) {
                if(info.success){
                    location.href = 'login.html';
                }
            }
        })
    })
})