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
})