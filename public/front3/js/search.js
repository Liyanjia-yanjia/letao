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
        var htmlStr = template("tmp",{list:arr});
        $(".history").html(htmlStr);
    }

    //清空所有
    $(".history").on("click",".empty",function () {
        mui.confirm("你确定要清空记录吗","温馨提示",["取消","确定"],function (e) {
            if(e.index === 1){
                localStorage.removeItem("search_list");
                render();
            }
        })
    })

    //删除一条记录
    $(".history").on("click",".btn_delete",function () {
        var arr = getHistory();
        arr.shift();
        var str = JSON.stringify(arr);
        localStorage.setItem("search_list",str);
        var arr = getHistory();
        render();
    })
})