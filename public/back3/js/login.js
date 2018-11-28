$(function () {
    $("#form").bootstrapValidator({

        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        //表单校验
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空",
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "长度必须为2-6位"
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
                        message: "长度必须为6-12位"
                    },
                    callback:{
                        message:"密码错误",
                    }
                }
            }
        },
        
    })

    //校验成功
    $("#form").on('success.form.bv',function (e) {
        //阻止默认跳转
        e.preventDefault();
        //发送请求
        $.ajax({
            url:'/employee/employeeLogin',
            data:$("#form").serialize(),
            type:'post',
            dataType:'json',
            success:function (info) {
                console.log(info);
                if(info.error === 1000){
                    $("#form").data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if(info.error === 1001){
                    $("#form").data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
                if(info.success){
                    location.href = 'index.html';
                }
            }
        })
    })

    //重置按钮处理
    $('[type="reset"]').on('click',function () {
        //reset按钮本身会重置内容
        $("#form").data('bootstrapValidator').resetForm(true);
        //不传参=>重置内容，传参=>重置状态
    })
})
