$(function () {
    
    var id;

    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        dataType:'json',
        success:function (info) {
            console.log(info);
            var htmlStr = template("cateTpl",info);
            $(".cate").html(htmlStr);
            renderById(info.rows[0].id);
        }
    })

    $(".cate").on('click','a',function () {
        id = $(this).parent().data('id');
        renderById(id);

        $(".cate a").removeClass("active");
        $(this).addClass("active");
        
    })
    function renderById(id) {
        $.ajax({
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            dataType:'json',
            type:'get',
            success:function (info) {
                console.log(info);
                var htmlStr = template("categoryTpl",info);
                $(".category").html(htmlStr);
            }
        })
    }
})