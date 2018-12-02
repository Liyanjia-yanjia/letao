$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();

    // 渲染
    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            type: 'get',
            success: function (info) {
                // console.log(info);
                var htmlStr = template("secondTpl", info);
                $("tbody").html(htmlStr);

                $("#pagintor").bootstrapPaginator({
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

    // 点击出现模态框
    $(".btn-add").on('click', function () {
        $("#secondModal").modal("show");
        // 发送请求获取分类名称
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 50,
            },
            type: 'get',
            success: function (info) {
                // console.log(info);
                var htmlStr = template("cateTpl", info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    //给按钮赋值
    $(".dropdown-menu").on('click', 'a', function () {
        var value = $(this).text();
        $(".cateTxt").text(value);

        $("#secondForm").data('bootstrapValidator').updateStatus('categoryId', 'VALID')

        var id = $(this).parent().data("id");
        $("[name='categoryId']").val(id);

    })

    // 上传图片，发送请求，存进服务器
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            var url = data.result.picAddr;
            $(".imgBox img").attr('src', url);
            $("#secondForm").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
            $("[name='brandLogo']").val(url);
        }
    });

    $("#secondForm").on("success.form.bv", function (e) {
        e.preventDefault();

        $.ajax({
            url: '/category/addSecondCategory',
            data: $("#secondForm").serialize(),
            dataType: 'json',
            type: 'post',
            success: function (info) {
                if (info.success) {
                    $("#secondModal").modal("hide");
                    currentPage = 1;
                    render();

                    //重置表单
                    $("#secondForm").data("bootstrapValidator").resetForm(true);
                    $(".cateTxt").text("请选择一级分类名");
                    $(".imgBox img").attr('src', "./images/none.png");
                }
            }
        })
    })
    // 表单校验
    $("#secondForm").bootstrapValidator({

        excluded: [],

        //图标显示
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类名"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类名"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    })
})