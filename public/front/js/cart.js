$(function () {
    render();
    function render() {
        $.ajax({
            url: '/cart/queryCart',
            dataType: 'json',
            type: 'get',
            success: function (info) {
                if(info.error === 400){
                    location.href='login.html';
                }else{
                    var htmlStr = template("mainTpl", {
                        list: info
                    });
                    console.log(info);
                    $('.content').html(htmlStr);
                }
            }
        })
    }
   
    $(".content").on("click", '.btn_delete',function () {
        var id = $(this).data("id");
        $.ajax({
            url: '/cart/deleteCart',
            dataType: 'json',
            data: {
                id: id,
            },
            type: 'get',
            success: function (info) {
                console.log(info);
                if(info.success){
                    render();
                }
            }
        })
    })

    // $(".content").on("click", '.btn_edit',function () {
    //     var id = $(this).data("id");
    //     $.ajax({
    //         url: '/cart/deleteCart',
    //         dataType: 'json',
    //         data: {
    //             id: id,
    //         },
    //         type: 'get',
    //         success: function (info) {
    //             console.log(info);
    //             if(info.success){
    //                 render();
    //             }
    //         }
    //     })
    // })

})