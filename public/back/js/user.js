
$.ajax({
    url:'/user/queryUser',
    type:'get',
    dataType:'json',
    data:{
        page:1,
        pageSize:5,
    },
    success:function (info) {
        // console.log(info);
        // console.log(info.rows);
        var obj = {
            list:info.rows,
        }
        var htmlstr = template('tmp',obj);
        $("tbody").html(htmlstr);
    }
})

