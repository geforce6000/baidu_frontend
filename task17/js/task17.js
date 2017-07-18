/**
 * Created by geforce on 2017/7/11.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var bars="",height=0;
    switch (pageState.nowGraTime) {
        case "day": {
            height = 1;
            break;
        }
        case "week": {
            height = 10;
            break;
        }
        case "month": {
            height = 20;
            break;
        }
    }
    for (aqi in chartData) {
        bars += "<div style='width: "+chartData[aqi]+"; height:"+height+"'></div>";
    }
    $(".aqi-chart-wrap").html(bars);
    chartData = {};
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(timechange) {
    // 确定是否选项发生了变化
    if (timechange != pageState.nowGraTime) {
        pageState.nowGraTime = timechange;
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(city) {
    // 确定是否选项发生了变化
    if (city === undefined) {
        city = "北京";
    }
    if (city != pageState.nowSelectCity) {
        pageState.nowSelectCity = city;
    }
    // 设置对应数据
    initAqiChartData();

    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    pageState.nowGraTime = $(":checked").attr('value');
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citylist;
    for (city in aqiSourceData) {
        citylist += "<option>" + city + "</option>";
    }
    $("#city-select").html(citylist);
    pageState.nowSelectCity = "北京";
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    //citySelectChange();
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    switch (pageState.nowGraTime) {
         case "day": {
             for (aqi in aqiSourceData[pageState.nowSelectCity]) {
                 chartData[aqi] = aqiSourceData[pageState.nowSelectCity][aqi];
             }
             break;
         }
         case "week": {
             var weekaverage=0, countday=1;
             for (aqi in aqiSourceData[pageState.nowSelectCity]) {
                 weekaverage += aqiSourceData[pageState.nowSelectCity][aqi];
                 countday++;
                 if (countday%7==0) {
                     chartData[aqi] = weekaverage/7;
                     weekaverage = 0;
                 }
             }
         break;
         }
         case "month": {
             var monthdata={"01":0,"02":0,"03":0}, monthdays={"01":0,"02":0,"03":0};
             for (aqi in aqiSourceData[pageState.nowSelectCity]) {
                 monthdata[aqi.slice(5,7)] += aqiSourceData[pageState.nowSelectCity][aqi];
                 monthdays[aqi.slice(5,7)] += 1;
             }
             for (months in monthdata) {
                 chartData[months] = monthdata[months]/monthdays[months];
             }
         break;
         }
     }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();  //初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
    initCitySelector(); //初始化城市Select下拉选择框中的选项
    initAqiChartData(); //初始化图表需要的数据格式
    renderChart();      //绘图
    $("#city-select").on("change", function () {
        citySelectChange($(this).val());
    });
    $(":radio").on("click", function () {
        graTimeChange($(this).attr('value'));
    })

}

init();

console.log(aqiSourceData);