/**
 * Created by geforce on 2017/7/10.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {
    "北京": 90,
    "上海": 40
};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = $("#aqi-city-input").val();
    var aqi = $("#aqi-value-input").val();
    aqiData[city] = Number(aqi);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var trstream;
    $("table").html("<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>");
    for (aqi in aqiData) {
        trstream += "<tr><td>" + aqi + "</td><td>" + aqiData[aqi] + "</td><td><button>删除</button></td></tr>";
    }
    $("table").append(trstream);
    buttonAddfunc();
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(todelete) {
    // do sth.
    //console.log(todelete+" by delBtnHandle!");
    delete aqiData[todelete];
    renderAqiList();
}

function init() {
    renderAqiList()
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $("#add-btn").on("click", function () {
        addBtnHandle();
    });
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}
function buttonAddfunc() {
    $("tr button").on("click", function () {
        var target = $(this).parent().parent().children().html();
        delBtnHandle(target);
    });
}
init();