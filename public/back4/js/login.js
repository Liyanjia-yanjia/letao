$(function () {
    $("#form").bootstrapValidator({
        //1. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //2.表单校验
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空",
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "长度必须为2-6位",
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
                        message: "长度必须为6-12位",
                    }
                }
            } 
        }
    })

    //检验成功
    $("#form").on('success.form.bv',function (e) {
        e.preventDefault();
        
        $.ajax({
            data:$("#form").serialize(),
            dataType:'json',
            url:'/employee/employeeLogin',
            type:'post',
            success:function (info) {
                if(info.success){
                    location.href = 'index.html';
                }
                if(info.error === 1000){
                    alert( "用户名不存在! ");
                }
                if(info.error === 1001){
                    alert( "密码错误! ");
                }

            }
     
        })
    })

    //重置
    $('[type="reset"]').on('click',function () {
        $("#form").data('bootstrapValidator').resetForm();
    })

})