/**
 * Created by 54721 on 2018/12/3.
 */


$(function() {


  // 点击登录按钮时, 获取用户名和密码, 发送ajax, 进行登录
  $('#loginBtn').click(function() {

    var username = $('#username').val().trim();  // 用户名
    var password = $('#password').val().trim();  // 密码

    if ( username === "" ) {
      mui.toast("请输入用户名");
      return;
    }
    if ( password === "" ) {
      mui.toast("请输入密码");
      return;
    }

    // 已输入用户名和密码, 发送ajax
    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.error === 403 ) {
          mui.toast( "用户名或者密码错误" );
          return;
        }

        if ( info.success ) {
          // 登录成功
          // (1) 如果有传参过来, 需要跳回去
          // (2) 如果没有传参过来, 正常用户中心w
          console.log(location.search);
          if ( location.search.indexOf( "retUrl" ) != -1 ) {
            // 有传参, 跳回去  "?retUrl=http://localhost:3000/front/product.html?productId=7"
            var retUrl = location.search.replace("?retUrl=", "");
            // location.href = retUrl;
          }
          else {
            // 没有传参, 去用户中心
            // location.href = "user.html";
          }
        }
      }
    })

  })


})