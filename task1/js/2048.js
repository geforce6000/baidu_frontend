/**
 * Created by geforce on 2017/3/15.
 */
$(document).ready(function(){
    addnewnumber();
    addnewnumber();
    $("#inputbox").keydown(function(event){
        if (event.which === 37) {
            moveleft();
        } else if (event.which === 38) {
            moveup();
        } else if (event.which === 39) {
            moveright();
        } else if (event.which === 40) {
            movedown();
        } else {
        }
    });
});

function showasline() {
    var line = [];
    var grid;
    for (var i=0;i<4;i++) {
        line[i]=[];
        for (var j=0;j<4;j++) {
            grid = "#"+i+j;
            line[i][j] = Number($(grid).text());
        }
        //console.log(line[i]);
    }
    return line;
}

function showasrow() {
    var row = [];
    var grid;
    for (var i=0;i<4;i++) {
        row[i]=[];
        for (var j=0;j<4;j++) {
            grid = "#"+j+i;
            row[i][j] = Number($(grid).text());
        }
        //console.log(row[i]);
    }
    return row;
}

function addnewnumber() {
    var square = showasline();
    var pool=[],grid;
    for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
            grid="#"+i+j;
            if($(grid).text()=="") {
                pool.push(grid);
            }
        }
    }
    var position = Math.floor(Math.random()*pool.length);
    var num = Math.random()>0.5?4:2;
    $(pool[position]).text(num);
    paintgrid(pool[position]);
}

function colorcode(gridvalue) {
    var code=[
        "#FFFFFF",
        "#F8F8F8",
        "#F0F0F0",
        "#E8E8E8",
        "#E0E0E0",
        "#D8D8D8",
        "#D0D0D0",
        "#C8C8C8",
        "#C0C0C0",
        "#B8B8B8",
        "#B0B0B0",
        "#A8A8A8",
        "#A0A0A0"
    ];

    switch(gridvalue)
    {
        case 2:
            return code[2];
        case 4:
            return code[3];
        case 8:
            return code[4];
        case 16:
            return code[5];
        case 32:
            return code[6];
        case 64:
            return code[7];
        case 128:
            return code[8];
        case 256:
            return code[9];
        case 512:
            return code[10];
        case 1024:
            return code[11];
        case 2048:
            return code[12];
    }
}

function paintgrid(grid) {
    var gridvalue = Number($(grid).text());
    var code = colorcode(gridvalue);
    $(grid).css("background-color","#F8F8F8");
    $(grid).css("background-color",code);
}

function deathcheck() {
    var square = showasline();
    var grid,gridleft,gridright;
    for (i = 0; i < 4; i++) {
        for (j = 1; j < 3; j++) {
            grid="#"+i+j;
            gridleft="#"+i+(j-1);
            gridright="#"+i+(j+1);
            if ($(grid).text() == "") return;
            if ($(gridleft).text() == "") return;
            if ($(gridright).text() == "") return;
            if (square[i][j] == square[i][j - 1]) { console.log("grid"+i+j+"=grid"+i+(j-1)); return;}
            if (square[i][j] == square[i][j + 1]) { console.log("grid"+i+j+"=grid"+i+(j+1)); return;}
            if (square[j][i] == square[j - 1][i]) { console.log("grid"+j+i+"=grid"+(j-1)+i); return;}
            if (square[j][i] == square[j + 1][i]) { console.log("grid"+j+i+"=grid"+(j+1)+i); return;}
        }
    }
    alert("游戏失败了");

}

function checkline(line) {
    for(var i=0;i<3;i++) {
        if(line[i] == "") {
            line.push("");
            continue;
        }
        if(line[i] == line[i+1]) {
            line[i] = Number(line[i])*2;
            line[i+1]="";

        }
        //if(line[i] != line[i+1])
    }
    var newline=[];
    for(i=0;i<4;i++) {
        if (line[i] != "") {
            newline.push(line[i]);
        }
    }
    return newline;
}

function moveleft() {
    var square = showasline(); //获取矩阵数据
    for (i=0;i<4;i++) {
        square[i] = checkline(square[i]);
    }
    var grid;
    for (i=0;i<4;i++) {
        for(j=0;j<4;j++) {
            grid="#"+i+j;
            $(grid).text("");
            $(grid).text(square[i][j]);
            paintgrid(grid);
        }
    }
    addnewnumber();
    deathcheck();
}

function moveright() {

    var square = showasline();

    for (var i=0;i<4;i++) {
        square[i] = square[i].reverse();
        square[i] = checkline(square[i]);
    }

    for (i=0;i<4;i++){
        for(j=3;j>=0;j--) {
            grid="#"+i+j;
            $(grid).text("");
            $(grid).text(square[i][3-j]);
            paintgrid(grid);
        }
    }
    addnewnumber();
    deathcheck();
}

function moveup() {
    var square = showasrow();

    for (var i=0;i<4;i++) {

        square[i] = checkline(square[i]);
    }

    for (i=0;i<4;i++){
        for(j=0;j<4;j++) {
            grid="#"+i+j;
            $(grid).text("");
            $(grid).text(square[j][i]);
            paintgrid(grid);
        }
    }
    addnewnumber();
    deathcheck();

}

function movedown() {
    var square = showasrow();

    for (var i=0;i<4;i++) {

        square[i] = square[i].reverse();
        square[i] = checkline(square[i]);
    }

    for (i=0;i<4;i++){
        for(j=0;j<4;j++) {
            grid="#"+i+j;
            $(grid).text("");
            $(grid).text(square[j][3-i]);
            paintgrid(grid);
        }
    }
    addnewnumber();
    deathcheck();
}
