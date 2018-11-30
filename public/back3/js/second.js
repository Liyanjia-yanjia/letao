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

    $(".btn-add").on('click', function () {
        $("#secondModal").modal("show");

        $.ajax({
            url: '/category/queryTopCategoryPaging',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 50,
            },
            type: 'get',
            success: function (info) {
                console.log(info);
                var htmlStr = template("cateTpl", info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    $(".dropdown-menu").on('click','a',function () {
        var value = $(this).text();
        $(".cateTxt").text(value);

        $("#secondForm").data('bootstrapValidator').updateStatus('categoryId','VALID')
    })

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
          var url = data.result.picAddr;
          $(".imgBox img").attr('src',url);
          $("#secondForm").data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
  });

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
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类名"
                    }
                }
            },
           brandLogo:{
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    })
})