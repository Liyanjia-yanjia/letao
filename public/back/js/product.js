$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var picArr = [];

    render();

    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            success: function (info) {
                console.log(info);
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

    //点击添加按钮，显示模态框
    $(".add-btn").on('click', function () {
        $("#productModal").modal("show");

        //发送请求获取二级分类名称
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 100,
            },
            type: 'get',
            success: function (info) {
                var htmlStr = template("cateTpl", info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    //给下拉框赋值
    $(".dropdown-menu").on('click', 'a', function () {
        var value = $(this).text();
        $(".dropdownTxt").text(value);

        $("#productForm").data('bootstrapValidator').updateStatus("brandName", 'VALID');

        var id = $(this).parent().data('id');
        $("[name='brandName']").val(id);
    })

    //上传图片
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            var picObj = data.result;
            console.log(picObj);

            picArr.unshift(picObj);

            var picUrl = picObj.picAddr;
            $(".imgBox").prepend("<img src=" + picUrl + " style='width:100px;'>");

            if(picArr.length>=4){
                picArr.pop();
                $(".imgBox img:last-of-type").remove();
            }
            if(picArr.length === 3){
                $("#productForm").data("bootstrapValidator").updateStatus('picStatus','VALID')
            }
        }
    });

    //表单校验
    $("#productForm").bootstrapValidator({
        excluded: [],

        //图标显示
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            brandName: {
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
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
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
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传三张图片"
                    }
                }
            }
        }
    })

    //校验成功事件
    $("#productForm").on('success.form.bv',function (e) {
        e.preventDefault();
        var paramsStr = $("#productForm").serialize();
        // var paramsStr += "&picnName1=xx&picAddr1=xx";
        paramsStr += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
        paramsStr += "&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
        paramsStr += "&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
        
        $.ajax({
            url:'/product/addProduct',
            type:'post',
            data:paramsStr,
            dataType:'json',
            success:function (info) {
                console.log(info);
                $("#productModal").modal("hide");
                currentPage = 1;
                render();

                //重置表单
            }

        })
    })
})