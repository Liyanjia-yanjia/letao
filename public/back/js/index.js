// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector(".main_echarts .left"));

// 指定图表的配置项和数据
var option1 = {
    title: {
        text: '2018年注册人数'
    },
    //提示框组件
    tooltip: {},
    //图例
    legend: {
        data: ['人数','效率'],
    },

    xAxis: {
        data: ["一月", "二月", "三月", "四月", "五月", "六月"]
    },
    yAxis: {},
    //数据
    series: [{
            name: '人数',
            type: 'line', //柱形图
            data: [5, 20, 36, 10, 10, 20]
        },
        {
            name: '效率',
            type: 'line', //柱形图
            data: [20, 40, 16, 10, 60, 23]
        }
    ],
    backgroundColor: "#F9D2D2",
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option1);

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector(".main_echarts .right"));

// 指定图表的配置项和数据
option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','匡威','彪马','New Balance']
    },
    series : [
        {
            name: '热门品牌',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:435, name:'耐克'},
                {value:510, name:'阿迪'},
                {value:234, name:'匡威'},
                {value:335, name:'彪马'},
                {value:148, name:'New Balance'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 50,
                    shadowOffsetX: 10,
                    shadowColor: '#ccc'
                }
            }
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option2);