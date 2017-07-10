/**
 * Created by geforce on 2017/3/29.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = [
        ["北京", 90],
        ["上海", 40]
];

var aqiDataobj = {
        "北京": 90,
        "上海": 40
};

function getobjdata() {
    //for(x in aqiDataobj) {
    //    console.log(x);
    //    console.log(aqiDataobj[x]);
    //}
}


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    aqiData.push(getdata());
    dataforobj();
}
function dataforobj() {
    aqiDataobj[$("#aqi-city-input").val()] = $("#aqi-value-input").val();
}

function getdata() {
    var newdata=0;
    newdata = [$("#aqi-city-input").val(), $("#aqi-value-input").val()];
    return newdata;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    $("table").html("<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>");
    var trstream;
    //console.log("aqiData.length:"+aqiData.length);
    /*for (var i=0; i<aqiData.length; i++) {
        trstream = "";
        trstream = "<tr><td>"+aqiData[i][0]+"</td><td>"+aqiData[i][1]+"</td><td><button>删除</button></td></tr>";
        $("table").append(trstream);
    }*/
    for(x in aqiDataobj) {
        trstream = "";
        trstream = "<tr><td>"+x+"</td><td>"+aqiDataobj[x]+"</td><td><button>删除</button></td></tr>";
        $("table").append(trstream);
        console.log("aqidataobj:"+x+",aqi:"+aqiDataobj[x]);
    }
    $("tr button").on("click",function() {
        delBtnHandle($(this).parents("tr").index());
    });
    //console.log(aqiData.length);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    //console.log("aqidata.length:"+aqiData.length);
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(elemparent) {
    // do sth.
    aqiData.splice((elemparent-1),1);
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $("#add-btn").on("click", function () {
        addBtnHandle();
        getobjdata();
    });

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    $("tr button").on("click",function() {
        delBtnHandle($(this).parents("tr").index());
    });

}

renderAqiList();

init();
