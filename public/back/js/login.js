$(function () {
    /**
     * 1.进行表单校验
     * 1. 用户名不能为空
     * 2. 用户密码不能为空
     *  3. 用户密码长度为6-12位
     */
    $("#form").bootstrapValidator({
        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //设置不能为空
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空",
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须是2-6位",
                    },
                    callback:{
                        message:"用户名不存在",
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空",
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须是6-12位",
                    },
                    callback:{
                        message:"密码错误",
                    }
                }
            }
        }
    })

    /*
     * 2. 校验成功后, 会触发一个事件, 表单校验成功事件
     *    默认是会提交表单的, 页面就跳转了,
     *    我们需要注册表单校验成功事件, 在成功事件中, 阻止默认的提交, 通过 ajax 提交
     * */

    $("#form").on("success.form.bv", function (e) {
        //阻止表单的默认提交
        e.preventDefault();
        //使用ajax进行提交
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $("#form").serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.error === 1000) {
                    // alert("用户名不存在!");
                    $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
                }
                if (info.error === 1001) {
                    // alert("密码错误！");
                    $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback");
                }
                if (info.success) {
                    location.href = 'index.html';
                }
            }
        });
    })

    /**
     * 点击重置按钮时，还需要重置表单的错误提示信息
     */

    $('[type="reset"]').on('click',function () {
          $("#form").data('bootstrapValidator').resetForm(true);
    })
})