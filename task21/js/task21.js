/**
 * Created by geforce on 2017/7/18.
 */
//保存数字的数组
var queue = [];
var splitsign =[",","，","、","\b","\n"];

//初始化函数，用于设定左侧入-右侧出共4个按钮和搜索按钮的点击函数
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
    $(".search").on("click", function () {
        specialsearch();
    });
}

//为string对象原型添加一个replaceAll方法，可以将string中所有位置的同一值全部进行替换
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

//查找搜索框中的值在队列中的位置，并改变其div的背景色
function specialsearch() {
    var key = $(".searchbox").val();
    if (key == "") {
        console.log("没有搜索关键字");
        return;
    }
    for (var i= 0; i<queue.length; i++) {
        var found=queue[i].indexOf(key);
        if (found!=-1) {
            $(".displaybox").children().eq(i).css("background-color","blue");
        } else {
            $(".displaybox").children().eq(i).css("background-color","#99CCFF");
        }
    }
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
    });
    $(".displaybox div").on("mouseover", function () {
        $(this).html("点击删除"+$(this).html());
        $(this).css("background-color","red");
    });
    $(".displaybox div").on("mouseout", function () {
        $(this).html($(this).html().slice(4));
        $(this).css("background-color","#99CCFF");
    });
    $("#input").val("");
}

function checkin() {
    var inputchar = $.trim($("#input").val());
    for(var i=0; i<splitsign.length; i++) {
        inputchar = inputchar.replaceAll(splitsign[i]," ");
    }
    return inputchar.split(" ");
}
//左侧入函数
function leftin () {
    if ($("#input").val() == "") return; //如果input框为空值则不进行任何操作
    var input = checkin();
    input.reverse();
    for(var i=0;i<input.length;i++) {
        if(input[i] != "") {
            queue.unshift(input[i]);
        }
    }
    runder();
}

//右侧入函数
function rightin() {
    if ($("#input").val() == "") return; //如果input框为空值则不进行任何操作
    var input=checkin();
    console.log(input);
    for(var i=0;i<input.length;i++) {
        if(input[i] != "") {
            queue.push(input[i]);
        }
    }
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