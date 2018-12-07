/**
 * Created by 54721 on 2018/12/3.
 */
$(function() {

  // 1. 个人信息的动态渲染, 发送ajax请求
  //    (1) 如果用户未登录, 后台响应error, 提示未登录, 应该拦截到登录页
  //    (2) 如果用户已登录, 后台返回的是用户信息
  $.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function( info ) {
      console.log( info );
      if ( info.error === 400 ) {
        // 未登录, 拦截到登录页
        location.href = "login.html";
        return;
      }


      // 说明已登录, 返回的是用户信息
      var htmlStr = template( "userTpl", info );
      $('#userInfo').html( htmlStr );
    }
  })


  // 2. 退出功能
  $('#logout').click(function() {
    $.ajax({
      type: "get",
      url: "/user/logout",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 回到登录页
          location.href = "login.html";
        }
      }
    })
  })

})
