$(function () {
    var name = getSearch("key");
    $(".search input").val(name);

    $(".sort a").on("click",function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).children("i").toggleClass("fa fa-angle-up").toggleClass("fa fa-angle-down");
        render();

    })

    $(".btn-search").on("click",function () {
        name = $(".search input").val();
        render();
    })

    render();
    function render() {
        var obj = {
            proName:name,
            page:1,
            size:10,
        };
        var $active = $(".sort a.active");
        if($active.length === 1 && $active.children("i").hasClass("fa-angle-up")){
            var sortName = $active.data("type");

            var sortValue = 1;
            obj[sortName] = sortValue;
        }else{
            var sortName = $active.data("type");

            var sortValue = 2;
            obj[sortName] = sortValue;
        }

        $(".product ul").html("<div class='loading'></div>");
        // $(".laoding").hide();
        setTimeout(function(){
            $.ajax({
                url: '/product/queryProduct',
                data: obj,
                dataType: 'json',
                success: function (info) {
                    console.log(info);
                    var htmlStr = template("tmp", info);
                    $(".product ul").html(htmlStr);
                }
            })
        },1000)

    }
})