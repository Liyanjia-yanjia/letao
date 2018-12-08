$(function () {
    if
    $.ajax({
        url:'/cart/queryCart',
        dataType:'json',
        type:'get',
        success:function (info) {
            console.log(info);
            var htmlStr = template('tmp',info);
            $('.tmp').html(htmlStr)
        }
    })
})