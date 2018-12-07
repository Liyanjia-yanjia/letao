$(function () {
    var id = getSearch("productid")
    $.ajax({
        url:'/product/queryProductDetail',
        dataType:'json',
        data:{
            id:id,
        },
        type:'get',
        success:function (info) {
            console.log(info);
            var htmlStr = template('',info);
            $('').html(htmlStr)
        }
    })
})