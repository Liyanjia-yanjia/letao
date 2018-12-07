/**
 * Created by 54721 on 2018/12/3.
 */

$(function() {

  // 1. 获取地址栏传递过来的 productId
  var productId = getSearch('productId');

  // 2. 根据productId进行渲染
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    dataType: "json",
    success: function( info ) {
      console.log( info );
      var htmlStr = template("productTpl", info);
      $('.lt_main .mui-scroll').html( htmlStr );

      // 手动初始化轮播图
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });

      // 手动初始化数字框
      mui('.mui-numbox').numbox();
    }
  });

  // 3. 给尺码添加可选功能
  $('.lt_main').on("click", ".lt_size span", function() {
    // 给当前的添加current类, 移除其他的current类
    $(this).addClass("current").siblings().removeClass("current");
  })


  // 4. 加入购物车
  $('#addCart').click(function() {

    // 收集用户选择的商品信息, 发送请求
    // 收集尺码 和 数量,  产品id在全局已有
    var size = $('.lt_size span.current').text();   // 获取尺码
    var num = $('.mui-numbox-input').val(); // 获取数量

    if ( size === null ) {
      mui.toast("请选择尺码");
      return;
    }

    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        size: size,
        num: num
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.error === 400 ) {
          // 当前用户未登录, 拦截到登录页
          // 由于需要在登录完成后, 跳转回来, 所以需要将当前页的地址作为参数传过去
          location.href = "login.html?retUrl=" + location.href;
          return;
        }

        if ( info.success ) {
          // 加入购物车成功, 显示确认框
          mui.confirm("添加成功", "文星提示", ["去购物车", "继续浏览"], function( e ) {
            // e.index 就是点击的按钮的下标
            if ( e.index === 0 ) {
              location.href = "cart.html";
            }
          })
        }
      }
    })

  })


})
