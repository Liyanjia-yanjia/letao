$(function () {

    var currentPage = 1;
    var pageSize = 5;

    render();

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

    $(".dropdown-menu").on('click', 'a', function () {
        var value = $(this).text();
        // input标签获取值val(),其他标签获取值text()
        // console.log(value);
        $(".dropdownTxt").text(value);

        var id = $(this).parent().data("id");
        $("[name='categoryId']").val(id);
        console.log(id);
        $("#secondForm").data('bootstrapValidator').updateStatus('categoryId','VALID')
       
    })

    $("#fileupload").fileupload({
        dataType:'json',
        done:function (e,data) {
            // console.log(data);
            $("#imgBox img").attr("src",data.result.picAddr);
            $("#secondForm").data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
    })

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
})