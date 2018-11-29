$(function () {

    //定义变量当前页和每页的条数
    var currentPage = 1;
    var pageSize = 5;

    //提取两个参数作为全局变量
    var id;
    var isDelete;
    //进入页面先渲染一次
    render();

    //封装渲染函数
    function render() {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            success: function (info) {
                console.log(info);
                var htmlstr = template('tmp', info);
                $("tbody").html(htmlstr);

                //分页插件
                //bootstrap版本为3，，必须填参数
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, 
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
                    //注册页面的点击事件
                    onPageClicked: function (a, b, c, page) {
                        //保存当前页
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }


    //改变状态的模态框显示
    $("tbody").on('click', '.btn', function () {
        $("#changeModal").modal("show");
        //获取当前改变的id和状态
        id = $(this).parent().data("id");
        //判断状态的改变
        isDelete = $(this).hasClass("btn-danger")?0:1;

    })

    $(".confirm_btn").on("click", function (e) {
        //先阻止默认跳转
        e.preventDefault();
        
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            dataType:'json',
            data:{
                id:id,
                isDelete:isDelete,
            },
            success:function (info) {
                if(info.success){
                    $("#changeModal").modal("hide");  
                    render();
                }
            }
        })
    })

})