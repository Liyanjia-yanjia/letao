$(function () {

    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            type: 'get',
            success: function (info) {
                // console.log(info);
                var htmlStr = template("firstTpl", info);
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
            $("#firstModal").modal("show");
        })

        $("#firstForm").bootstrapValidator({
            //图标显示
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            //校验
            fields: {
                categoryName: {
                    validators: {
                        notEmpty: {
                            message: "请输入一级分类名称"
                        }
                    }
                }
            }
        });

        $("#firstForm").on('success.form.bv',function (e) {
            // e.preventDefault();
            alert(111);
            console.log("gg");
            $.ajax({
                url: '/category/addTopCategory',
                dataType: 'json',
                type: 'post',
                data: $("#firstForm").serialize(),
                success:function (info) {
                    console.log(info);
                    // $("#firstModal").modal("hide");
                    // render();
                }
            })
        })
               

        
})