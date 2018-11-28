var myChart = echarts.init(document.querySelector(".echarts_left"));

// 指定图表的配置项和数据
var option1 = {
    title: {
        text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
        data: ['人数', '销量']
    },
    xAxis: {
        data: ["一月", "二月", "三月", "四月", "五月", "六月"]
    },
    yAxis: {},
    series: [{
            name: '人数',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
        },
        {
            name: '销量',
            type: 'bar',
            data: [15, 30, 16, 20, 14, 46]
        }
    ]
};

// 使用刚指定的配置项和数据显示图表
myChart.setOption(option1);

var myChart = echarts.init(document.querySelector(".echarts_right"));

// 指定图表的配置项和数据
option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年11月',
        x:'right'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','匡威','彪马','万斯']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'匡威'},
                {value:135, name:'彪马'},
                {value:1548, name:'万斯'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option2);