$(function () {

    function getHistory() {
        var str = localStorage.getItem("search_list2") || '[]';
        var arr = JSON.parse(str);
        return arr;
    }
    render();
    function render() {
        var arr = getHistory();
        console.log(arr);
        var htmlStr = template("tmp",{list:arr});
        $(".history").html(htmlStr);
    }

    $(".history").on("click",'.empty',function () {
        mui.confirm("您确定要清空历史记录吗？","温馨提示",["取消","确定"],function (e) {
            if(e.index === 1){
                localStorage.removeItem("search_list2");
                render();
            }
        })
    })
})