$(function () {

    var currentPage = 1;
    var pageSize = 5;
    var id;
    var isDelete;
    render();

    function render() {
        $.ajax({
            url: '/user/queryUser',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            type: 'get',
            success: function (info) {
                // console.log(info);
                var htmlStr = template("tmp", info);
                $("tbody").html(htmlStr);

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        // console.log(page);
                        render();
                    }
                })
            }
        })
    }

    $("tbody").on('click', '.btn', function () {


        id = $(this).parent().data('id');
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

        $("#changeModal").modal("show");

    })

    $(".btn-confirm").on('click', function () {
        $("#changeModal").modal("hide");
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            dataType: 'json',
            data: {
                id: id,
                isDelete: isDelete,
            },
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    render();
                }
            }
        })
    })


})