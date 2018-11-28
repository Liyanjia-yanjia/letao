$(function () {
    //1.导航栏的切换    
    $(".category").on('click', function () {
        $(this).next().stop().slideToggle();
    })

    //2.侧边栏的退出与进入
    $(".contain .pull-left").on('click',function () {
        $(".lt_aside").toggleClass("hide_aside");
        $(".contain .icon").toggleClass("hide_icon");
        $(".contain").toggleClass("hide_contain");
    })

    
})