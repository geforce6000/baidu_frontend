/**
 * Created by geforce on 2017/7/15.
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
    $(".sort").on("click", function () {
        bubblesort();
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
        displaybox += '<div style=\'height:'+queue[i]+'px;\'></div>';
    }
    $(".displaybox").html(displaybox);
    $(".displaybox div").on("click", function () {
        popup($(this).index());
    })
    $("#input").val("");
}

function inputcheck(inputnumber) {
    if (inputnumber == "") {
        console.log("没有输入值");
        return false;
    } //如果input框为空值则不进行任何操作
    if ((inputnumber < 10) || (inputnumber > 100)) {
        console.log("输入值小于10或大于100");
        return false;
    }
    if (queue.length>=19) {
        console.log("队列长度已满");
        return false;
    }
    return true;
}
//左侧入函数
function leftin () {
    if(inputcheck($("#input").val())) {
        queue.unshift($("#input").val());
        console.log("队列长度"+queue.length);
    }
    runder();
}

//右侧入函数
function rightin() {
    if(inputcheck($("#input").val())) {
        queue.push($("#input").val());
        console.log("队列长度"+queue.length);
    }
    runder();
}

//左侧出函数
function leftout() {
    var leftout = queue.shift();
    console.log("左侧出"+leftout);
    runder();
}

//右侧出函数
function rightout() {
    var rightout = queue.pop();
    console.log("右侧出"+rightout);
    runder();
}

function bubblesort() {
    if (queue.length < 2) {
        console.log("队列元素少于2个");
        return false;
    }
    for(var i=1; i<queue.length; i++) {
        for (var j=0; j<i; j++) {
            if (queue[i]<queue[j]) {
                var z=queue[j];
                queue[j]=queue[i];
                queue[i]=z;
                runder();
            }
        }
    }
    }

init();