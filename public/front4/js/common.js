mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	indicators: false, //是否显示滚动条
});

/**
	存储数据
	var newArr = ["aa","bb","cc","dd"];
	var arr = JSON.stringify(newArr);
	localStorage.setItem("search_list2",arr);
 */
function getSearch(k) {
	var str = location.search;
	str = decodeURI(str);
	str = str.slice(1);
	var arr = str.split("&");
	var obj = {};
	arr.forEach(function (v,i) {
		var key = v.split("=")[0];
		var value = v.split("=")[1];
		obj[key] = value;
	})
	console.log(obj[k]);
	return obj[k];

}