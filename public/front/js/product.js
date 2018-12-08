$(function () {
    var id = getSearch("productid")
    $.ajax({
        url: '/product/queryProductDetail',
        dataType: 'json',
        data: {
            id: id,
        },
        type: 'get',
        success: function (info) {
            console.log(info);
            var htmlStr = template('tmp', info);
            $('.content').html(htmlStr);
            mui(".mui-numbox").numbox();

            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    })

    var value;
    $(".content").on("click", ".size span", function () {
        $(this).addClass("orange").siblings().removeClass("orange");
        value = $(this).text();
    })
    $(".mui-btn-red").on("click", function () {
        var txt = $(".mui-numbox-input").val();
        if (!value) {
            mui.toast("请选择您的尺码");
        } else {
            mui.confirm("添加成功", '温馨提示', ['去购物车', '继续浏览'], function (e) {
                console.log(e);
                if (e.index === 0) {
                    $.ajax({
                        url: '/cart/addCart',
                        dataType: 'json',
                        data: {
                            productid: id,
                            num: txt,
                            size: value,
                        },
                        type: 'post',
                        success: function (info) {
                            console.log(info);
                            if(info.success){
                                location.href="cart.html";
                            }
                            if(info.error === 400){
                                location.href="login.html?retUrl"+location.href;
                            }
                        }
                    })
                  
                }

            })
        }

    })
})