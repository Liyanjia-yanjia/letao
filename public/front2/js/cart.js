/**
 * Created by 54721 on 2018/12/3.
 */
$(function() {


  // 一进入页面, 发送ajax请求, 获取购物车数据
  // (1) 未登录, 后台返回error, 拦截到登陆页
  // (2) 已登录, 后台返回购物车数据
  render();
  function render () {
    $.ajax({
      type: "get",
      url: "/cart/queryCart",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.error === 400 ) {
          // 未登录, 将来登录完成需要跳回来, 需要将页面地址传过去
          location.href = "login.html?retUrl=" + location.href;
          return;
        }
        // 说明当前用户已登录, 返回的购物车数组, 需要包装
        var htmlStr = template( 'cartTpl', { list: info } );
        $('#cartList').html( htmlStr );
      }
    });
  }


  // 删除功能
  $('.lt_main').on("click", ".btn_delete", function() {

    // 获取 id
    var id = $(this).data("id");

    // 发送删除ajax请求
    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      data: {
        id: [ id ]
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 重新渲染页面
          render();
        }
      }
    })

  })


})
