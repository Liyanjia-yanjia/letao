$(function () {

    var currentPage = 1;
    var pageSize = 5;

    render();

    //渲染页面
    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            type: 'get',
            success: function (info) {
                // console.log(info);
                var htmlStr = template("secondTpl", info);
                $("tbody").html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    //显示模态框，发送请求获取一级分类
    $(".add-btn").on('click', function () {
        $("#secondModal").modal("show");
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 100,
            },
            success: function (info) {
                // console.log(info);
                var htmlStr = template("cateTpl", info);
                $(".dropdown-menu").html(htmlStr);
            }

        })
    })

    //给按钮赋值，给隐藏域添加id
    $(".dropdown-menu").on('click', 'a', function () {
        var value = $(this).text();
        // input标签获取值val(),其他标签获取值text()
        // console.log(value);
        $(".dropdownTxt").text(value);

        var id = $(this).parent().data("id");

        $("[name='categoryId']").val(id);

        $("#secondForm").data('bootstrapValidator').updateStatus('categoryId','VALID')
       
    })

    //上传图片
    $("#fileupload").fileupload({
        dataType:'json',
        done:function (e,data) {
            // console.log(data);
            $("#imgBox img").attr("src",data.result.picAddr);

            //给隐藏域设置图片地址
            $("[name='brandLogo']").val(data.result.picAddr);
            console.log(data.result.picAddr);

            //更新状态
            $("#secondForm").data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
    })

    //表单校验
    $("#secondForm").bootstrapValidator({

        //校验隐藏域
        excluded:[],

        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        //校验
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类名"
                    }
                }
            },
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类名"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传图片"
                    }
                }
            }
        }
    })

    //阻止默认提交，使用ajax提交
    $("#secondForm").on("success.form.bv",function (e) {
        e.preventDefault();
        
        $.ajax({
            url:'/category/addSecondCategory',
            data:$("#secondForm").serialize(),
            type:'post',
            dataType:'json',
            success:function (info) {
                console.log(info);

                $("#secondModal").modal("hide");
                currentPage = 1;
                render();

                //表单重置
                $("#secondForm").data('bootstrapValidator').resetForm(true);
                $(".dropdownTxt").text("请选择一级分类");
                $("#imgBox img").attr("src","./images/none.png");
            }
        })
    })
})