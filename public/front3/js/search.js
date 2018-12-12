$(function () {
    function getHistory() {
        var str = localStorage.getItem("search_list") || '[]';
        var arr = JSON.parse(str);
        return arr;
    }

    //渲染历史记录
    render();

    function render() {
        var arr = getHistory();
        var htmlStr = template("tmp", {
            list: arr
        });
        $(".history").html(htmlStr);
    }

    //清空所有
    $(".history").on("click", ".empty", function () {
        mui.confirm("你确定要清空记录吗", "温馨提示", ["取消", "确定"], function (e) {
            if (e.index === 1) {
                localStorage.removeItem("search_list");
                render();
            }
        })
    })

    //删除一条记录
    $(".history").on("click", ".btn_delete", function () {
        var arr = getHistory();
        arr.shift();
        var str = JSON.stringify(arr);
        localStorage.setItem("search_list", str);
        var arr = getHistory();
        render();
    })

    //添加一条记录
    $(".btn-search").on("click", function () {
        //给input框赋值
        var value = $(".search input").val();
        console.log(value);

        //没有输入提示
        if (value.trim().length != 0) {
            var arr = getHistory();
            var index = arr.indexOf(value);

            //重复值删除
            if (index !== -1) {
              arr.splice(index, 1);
            }
            
            //控制记录的个数
            if(arr.length === 10){
                arr.pop();
            }

            //添加到最前面
            arr.unshift(value);
            var str = JSON.stringify(arr);
            localStorage.setItem("search_list", str);
            var arr = getHistory();
            render();

            //重置input
            $(".search input").val("");
            location.href = "searchList.html?key=" + value;

        } else {
            mui.toast("请输入搜索关键字")
        }

    })
})