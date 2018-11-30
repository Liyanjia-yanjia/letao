$(function () {

    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            url:'/user/queryUser',
            dataType:'json',
            data:{
                page:currentPage,
                pageSize: pageSize,
            },
            type:'get',
            success:function (info) {
                console.log(info);
                var htmlStr = template("tmp",info);
                $("tbody").html(htmlStr);

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked:function (a,b,c,page) {
                        currentPage = page;
                        console.log(page);
                        render();
                    }
                })
            }
        })
    }

})