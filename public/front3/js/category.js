$(function () {
    //渲染一级分类
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        dataType:'json',
        success:function (info) {
            console.log(info);

            var htmlStr = template("cateTpl",info);
            $(".nav_left ul").html(htmlStr);
        }
    })

    //点击a使其高亮
    $(".nav_left ul").on('click','a',function () {
        $(".nav_left ul a").removeClass("current");
        $(this).addClass("current");
        //获取二级分类
        var id = $(this).data("id");
        $.ajax({
            url:'/category/querySecondCategory',
            data:{
                id:id,
            },
            dataType:'json',
            type:'get',
            success:function (info) {
                console.log(info);
            }
        })
    })
})