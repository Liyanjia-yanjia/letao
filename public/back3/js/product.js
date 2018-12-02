$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var picArr = [];
    render();

    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                var htmlStr = template("productTpl", info);
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

    $(".btn-add").click(function () {
        $("#productModal").modal("show");

        $.ajax({
            url: '/category/querySecondCategoryPaging',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 100,
            },
            type: 'get',
            success: function (info) {
                // console.log(info);
                var htmlStr = template("cateTpl", info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    $(".dropdown-menu").on('click','a',function () {
        var value = $(this).text();
        $(".cateTxt").text(value);
        var id = $(this).parent().data("id");
        $("[name='brandId']").val(id);
        $("#productForm").data("bootstrapValidator").updateStatus("brandId","VALID");
    })

    //上传图片
    $("#fileupload").fileupload({
        dataType:'json',
        done:function (e,data) {
            console.log(data);
            var picObj = data.result;
            console.log(picObj);
            picArr.unshift(picObj);
            var picUrl = picObj.picAddr;
            $(".imgBox").prepend("<img src="+ picUrl +" style='width:100px;'>");
            if(picArr.length >= 4){
                picArr.pop();
                $(".imgBox img:last-of-type").remove();
            }
            console.log(picArr);
            if(picArr.length===3){
                $("#productForm").data("bootstrapValidator").updateStatus("picStatu","VALID");
            }
        }
    })

    //表单校验成功
    $("#productForm").on("success.form.bv",function (e) {
        e.preventDefault();
        
        var paramsStr = $("#productForm").serialize();
        paramsStr += "&picName1="+picArr[0].picName+"&picUrl="+picArr[0].picAddr+"";
        paramsStr += "&picName2="+picArr[1].picName+"&picUr2="+picArr[1].picAddr+"";
        paramsStr += "&picName3="+picArr[2].picName+"&picUr3="+picArr[2].picAddr+"";

        // console.log(paramsStr);
        $.ajax({
            url:'/product/addProduct',
            type:'post',
            dataType:'json',
            data:paramsStr,
            success:function (info) {
                if(info.success){
                    $("#productModal").modal("hide");
                    currentPage  =  1;
                    render();
                    // 重置
                    $("#productForm").data("bootstrapValidator").resetForm(true);
                    $(".cateTxt").text("请选择二级分类");
                    $(".imgBox img").remove();
                    picArr = [];
                }
            }
        })
    })
    // 表单校验
    $("#productForm").bootstrapValidator({
        excluded: [],

        //图标显示
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            picStatu: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }

        }
    })

})