$(function () {
    $(".btn-login").on("click", function () {
        var username = $("#username").val();
        var password = $("#password").val();
        if (username.trim() == "") {
            mui.toast("请输入用户名");
            return;
        }
        if (password.trim() == "") {
            mui.toast("请输入密码");
            return;
        }
        $.ajax({
            url: '/user/login',
            dataType: 'json',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function (info) {
                console.log(info);
                if (info.error === 403) {
                    mui.toast("用户名不存在");
                    return;
                }
                if (info.success) {
                    console.log(location.search);

                    if (location.search.indexOf("retUrl") != -1) {
                        var location = str.replace("?retUrl", '');
                        location.href = "location";
                    } else {
                        location.href = "user.html";
                    }

                }
            }
        })
    })
})