$(function () {
    var id = getSearch("productid");
    $.ajax({
        url: '/product/queryProductDetail',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (info) {
            console.log(info);
            var htmlStr = template('tmp', info);
            // console.log(htmlStr);
            $('.product').html(htmlStr);
            var gallery = mui('.mui-slider');
            gallery.slider({
              interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    })
})