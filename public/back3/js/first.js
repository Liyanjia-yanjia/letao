$(function () {

    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:'json',
            type:'get',
            success:function (info) {
                console.log(info);

                var htmlStr = template("firstTpl",info);
                $("tbody").html(htmlStr);

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function (a,b,c,page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    $(".btn-add").on('click',function () {
         $("#firstModal").modal("show");
    })

    $("#firstForm").bootstrapValidator({

        //图标显示
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类名"
                    }
                }
            }
        }
    })

    $(".btn-confirm").on('click',function (e) {

        e.preventDefault();
        
        $.ajax({
            url:'/category/addTopCategory',
            dataType:'json',
            data:$("#firstForm").serialize(),
            type:'post',
            success:function (info) {
                console.log(info);
                if(info.success){
                    $("#firstModal").modal("hide");
                    render();
                    $("#firstForm").data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })

})