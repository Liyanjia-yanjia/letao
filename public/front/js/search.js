$(function () {

    // var arr = ["张三", "李四", "王五", "赵六" ];
    // var jsonStr = JSON.stringify( arr );
    // localStorage.setItem( 'search_list', jsonStr );

    render();

    //获取本地历史的数组
    function getHistory() {
        //获取本地存储里的数据
        var jsonStr = localStorage.getItem("search_list") || "[]";
        //将数据转成数组
        var arr = JSON.parse(jsonStr);
        return arr;
    }

    //渲染
    function render() {
        var arr = getHistory();
        console.log(arr);
        var htmlStr = template("historyTpl", {
            list: arr
        });
        $(".history").html(htmlStr);
    }

    //清空所有
    $(".history").on('click', '.btn-empty', function () {
        mui.confirm("你确定要清空所有历史记录吗？",
            '温馨提示', ["取消", "确定"],
            function (e) {
                console.log(e);
                //根据下标判断是取消还是确定
                if (e.index == 1) {
                    //清除本地中的数组
                    localStorage.removeItem('search_list');
                    render();
                }
            })
    })

    //删除一条数据
    $(".history").on("click",".btn-delete",function () {
        //获取本地存储中的数组
        var arr = getHistory();
        //获取点击删除的下标
        var index = $(this).data("index");
        //根据下标将数组中的那一项删除
        arr.splice(index,1);
        //将删除后的数组放回本地数据存储
        localStorage.setItem("search_list",JSON.stringify(arr));
        //重新渲染
        render();

    })


    //添加记录
    $(".btn-search").on('click', function () {
        var value = $(".lt_main input").val().trim();
        if(value == ""){
            mui.toast("请输入搜索关键字");
            return;
        }
        var arr = getHistory();
        var i = arr.indexOf(value);
        if(i !==-1){
            arr.splice(i,1);
        }
        if(arr.length >=10){
            arr.pop();
        }
        arr.unshift(value);
        localStorage.setItem("search_list",JSON.stringify(arr));
        render();
        $(".lt_main input").val("");
        location.href="search.html?key="+value;
    })
})