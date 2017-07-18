/**
 * Created by geforce on 2017/7/14.
 */

//保存数字的数组
var queue = [];

//初始化函数，用于设定左侧入-右侧出共4个按钮的点击函数
function init () {
    $(".leftin").on("click", function () {
        leftin();
    });
    $(".rightin").on("click", function () {
        rightin();
    });
    $(".leftout").on("click", function () {
        leftout();
    });
    $(".rightout").on("click", function () {
        rightout();
    });
}

//单击队列中数字即在队列中删除该元素
function popup(indexno) {
    queue.splice(indexno,1);
    runder();
}

//显示函数，按顺序显示数字中的每个值，并给每个值捆绑一个单击响应函数popup()
function runder() {
    var displaybox = "";
    for (var i=0; i<queue.length; i++) {
        displaybox += '<div>' + queue[i] + '</div>';
    }
    $(".displaybox").html(displaybox);
    $(".displaybox div").on("click", function () {
        popup($(this).index());
    })
}

//左侧入函数
function leftin () {
    if ($("#input").val() == "") return; //如果input框为空值则不进行任何操作
    queue.unshift($("#input").val());
    runder();
}

//右侧入函数
function rightin() {
    if ($("#input").val() == "") return; //如果input框为空值则不进行任何操作
    queue.push($("#input").val());
    runder();
}

//左侧出函数
function leftout() {
    var leftout = queue.shift();
    alert(leftout);
    runder();
}

//右侧出函数
function rightout() {
    var rightout = queue.pop();
    alert(rightout);
    runder();
}

init();