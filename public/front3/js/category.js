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
    var id;
    render();
    function render() {
        $.ajax({
            url:'/category/querySecondCategory',
            data:{
                id: id || 1,
            },
            dataType:'json',
            type:'get',
            success:function (info) {
                console.log(info);
                var htmlStr = template("categoryTpl",info);
                $(".nav_right ul").html(htmlStr);
            }
        })
    }
    $(".nav_left ul").on('click','a',function () {
        $(".nav_left ul a").removeClass("current");
        $(this).addClass("current");
        //获取二级分类
        id = $(this).data("id");
        render();
        
    })
})