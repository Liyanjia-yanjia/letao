$(function () {
    var value = getSearch("key")
    $(".search input").val(value);

    $.ajax({
    url:'/product/queryProduct',
    dataType:'json',
    data:{
        proName:value,
        page:1,
        pageSize:100
    },
    type:'get',
    success:function (info) {
    console.log(info);
    var htmlStr = template('tmp',info);
    $('.item ul').html(htmlStr)
    }
    })
})