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
                var htmlStr = template("secondTpl",info);
                $("tbody").html(htmlStr);

                $("#paginator").bootstrapPaginator({
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

    $(".add-btn").on('click',function () {
         $("#secondModal").modal("show");
         $.ajax({
             url:'/category/queryTopCategoryPaging',
             type:'get',
             dataType:'json',
             data:{
                 page:1,
                 pageSize:100,
             },
             success:function (info) {
                console.log(info);
                var htmlStr = template("cateTpl",info);
                $(".dropdown-menu").html(htmlStr);
             }

         })
    })
})