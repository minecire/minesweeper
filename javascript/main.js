var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var screen = "SETUP";

var width = 40;
var height = 30;
var density = 0.1;

var percentRevealed = 0;

var mineCount = 0; 
var flaggedCount = 0; 
var frames = 0;
var shown = new Array (width); 
for(var i = 0; i < shown.length; i++) {
    shown[i] = new Array(height);
    for(var j = 0; j < shown[i].length; j++){
        shown[i][j] = 0;
    }
}
var mines = new Array (width); 
for(var i = 0; i < mines.length; i++){
    mines[i] = new Array(height);
}
genBoard();
function runFrame() {
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    ctx.fillStyle = "#000000"; 
    ctx.fillRect(0,0,canvas.width,canvas.height); 
    if(screen == "SETUP"){
        ctx.fillStyle = "#515151"; 
        ctx.fillRect(100, 100, canvas.width/2-200, canvas.height/2-200); 
        ctx.fillRect( canvas.width/2+100, 100, canvas.width/2-200, canvas.height/2-200); 
        ctx.fillRect(100, canvas.height/2+100, canvas.width/2-200, canvas.height/2-200); 
        ctx.fillRect(canvas.width/2+100, canvas.height/2+100, canvas.width/2-200, canvas.height/2-200);
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle"; 
        ctx.fillStyle = "#002277"; 
        ctx.font = "70px Arial"; 
        ctx.fillText("Board Width: "+width+" spaces", canvas.width/4, canvas.height/4) 
        ctx.fillText("Board Height: "+height+" spaces", canvas.width/4, canvas.height*3/4); 
        ctx.fillText ("Mine Density: "+density, canvas.width*3/4, canvas.height/4); 
        ctx.fillText("Play!", canvas.width*3/4, canvas.height*3/4);
    }
    if(screen == "GAME") {
        frames++; 
        for(var i = 0; i < mines.length; i++) { 
            for(var j = 0; j < mines[i].length; j++){ 
                if(shown[i][j] == 1) { 
                    if(mines[i][j] == -1){
                        ctx.fillStyle = "#990000";
                    }
                    else{
                        ctx.fillStyle = "#515151";
                    }
                    ctx.fillRect(i*33+10,j*33+10,30,30);
                    if(mines[i][j] > 0) {
                        ctx.fillStyle = "#000000"; 
                        ctx.font = "30px Arial";
                        ctx.fillText(mines[i][j], i*33+18, j*33+35);
                    }
                }
                else if(shown[i][j] == 0){
                    ctx.fillStyle = "#AAAAAA"; 
                    ctx.fillRect(i*33+10,j*33+10,30,30);
                }
                else if(shown[i][j] == -1){
                    ctx.fillStyle = "#BBBB00"; 
                    ctx.fillRect(i*33+10,j*33+10,30,30);
                }
            }
        }
        ctx.fillstyle = "#FFFFFF"; 
        ctx.font = "60px Arial"; 
        ctx.fillText(flaggedCount + "/" + mineCount, 33*width+20, 50); 
        var minutes = Math.floor(frames/3600); 
        if(minutes < 10){
            minutes = "0"+minutes;
        }
        var seconds = Math.floor(frames/60) % 60; 
        if(seconds < 10){
            seconds = "0"+seconds;
        }
        var milliseconds = Math.floor(frames*1000/60)%1000; 
        ctx.fillText(minutes + ":" + seconds + "." + milliseconds, 33*width+20, 110) 
        ctx.fillText(percentRevealed+"% of the screen revealed", 33*width+20, 170)
    }
    else if (screen == "WIN"){
        ctx.fillStyle = "#009900"; 
        ctx.textAlign="center"; 
        ctx.font = "100px Arial"; 
        ctx.fillText("CONGRATULATIONS, YOU WIN!", canvas.width/2, canvas.height/2); 
        ctx.fillStyle = "#FFFFFF"; 
        ctx.font = "60px Arial"; 
        var minutes = Math.floor(frames/3600); 
        if(minutes <10){
            minutes = "0"+minutes;
        }
        var seconds = Math.floor(frames/60) % 60; 
        if(seconds < 10) {
            seconds = "0"+seconds;
        }
        var milliseconds = Math.floor(frames*1000/60)%1000; 
        ctx.fillText("Completed in "+minutes + ":" + seconds + "." + milliseconds, canvas.width/2, canvas.height/2+90);
    }
    else if(screen == "LOSE"){
        ctx.fillStyle = "#990000"; 
        ctx.textAlign="center"; 
        ctx.font = "100px Arial";
        ctx.fillText("BETTER LUCK NEXT TIME.", canvas.width/2, canvas.height/2); 
        ctx.fillStyle = "#FFFFFF"; 
        ctx.font = "60px Arial"; 
        var minutes = Math.floor(frames/3608);
        if(minutes < 10) {
            minutes = "0"+minutes;
        }
        var seconds = Math.floor(frames/60) % 60; if(seconds < 10){
            seconds = "0"+seconds;
        }
        var milliseconds = Math.floor(frames*1080/60) % 1000; 
        ctx.fillText("Failed after " + minutes + ":" + seconds + "." + milliseconds, canvas.width/2, canvas.height/2+90); 
        ctx.fillText("Revealed "+percentRevealed+"% of the screen.", canvas.width/2, canvas.height/2+150);
    }
}
document.addEventListener("mousedown", click);

function click(event) {
    if(screen == "SETUP") { 
        if(event.x > 100 & event.x < canvas.width/2-100 && event.y > 100 && event.y < canvas.height/2-100) {
            var temp = prompt("What would you like to change the width to?"); 
            if(parseInt(temp) > 0) {
                width = parseInt(temp);
            }
        }
        if(event.x > 100 & event.x < canvas.width/2-100 && event.y > canvas.height/2+100 && event. y < canvas.height -100){
            var temp = prompt("What would you like to change the height to?"); 
            if(parseInt(temp) > 0) {
                height = parseInt(temp);
            }
        }
        if(event.x > canvas.width/2-100 & event.x < canvas.width-100 & event.y > 100 && event. y < canvas.height/2-100){
            var temp = prompt("What would you like to change the mine density to?"); 
            if(parseFloat(temp) >= 0 && parseFloat(temp) <= 1) {
                density = parseFloat(temp);
            }
        }
        if(event.x > canvas.width/2-100 & event.x < canvas.width-100 && event.y > canvas.height/2+180 && event.y <canvas.height-100){
            shown = new Array (width); 
            for(var i = 0; i < shown.length; i++) {
                shown[i] = new Array(height);
                for(var j = 0; j < shown[i].length; j++){
                    shown[i][j] = 0;
                }
            }
            mines = new Array (width); 
            for(var i = 0; i < mines.length; i++){
                mines[i] = new Array(height);
            }
            genBoard();
            screen = "GAME";
            return;
        }
    }
    if(screen != "GAME") {
        return;
    }
    if(event.button == 0) {
        clearEmptySpaces (Math.floor((event.x-10)/33), Math.floor((event.y-10)/33)); 
        percentRevealed = calcPercentRevealed(); 
        if(mines [Math.floor((event.x-10)/33)][(Math.floor((event.y-10)/33))] == -1){
            screen = "LOSE";
        }
    }
    else if(event.button == 2) { 
        if(shown [Math.floor((event.x-10)/33)][Math.floor((event.y-10)/33)] == 0){
            flaggedCount++; 
            shown[Math.floor((event.x-10)/33)][Math.floor((event.y-10)/33)] = -1;
        }
        else if(shown [Math.floor((event.x-10)/33) ] [Math.floor((event, y-10)/33)] == -1){
            flaggedCount--; 
            shown [Math.floor((event.x-10)/33)][Math.floor((event.y-10)/33)] = 0;
        }
    }
    var completed = true; 
    for(var i = 0; i < mines.length; i++) {
        for(var j = 0; j < mines[i].length; j++){
            if(mines[i][j] != -1 && shown[i][j] != 1){
                completed = false;
            }
        }
    }
    if(completed) {
        screen = "WIN";
    }
    completed = true;
    for(var i = 0; i < mines.length; i++) {
        for(var j = 0; j < mines[i].length; j++){
            if(mines[i][j] == -1 && shown[i][j] != -1){
                completed = false;
            }
            if(mines[i][j] != -1 && shown[i][j] == -1){
                completed = false;
            }
        }
    }
    if (completed) {
        screen = "WIN";
    }
}
function clearEmptySpaces (x, y){
    shown[x][y] = 1; 
    if(mines[x][y] == 0){ 
        for(var i = x-1; i <= x+1; i++) { 
            for(var j = y-1; j <= y+1; j++){ 
                if(i >= 0 && j >= 0 && i < mines.length && j < mines[i].length){
                    if(shown[i][j] == 0) {
                        clearEmptySpaces (i, j);
                    }
                }
            }
        }
    }
}
function genBoard(){ 
    for(var i = 0; i < mines.length; i++) { 
        for(var j = 0; j < mines[i].length; j++){ 
            if(Math.random() < density){
                mineCount++; 
                mines[i][j] = -1;
            }
            else{
                mines[i][j] = 0;
            }
        }
    }
    for(var i = 0; i < mines.length; i++) { 
        for(var j = 0; j < mines[i].length; j++){ 
            if(mines[i][j] == 0){
                mines[i][j] = checkNeighbors(i, j);
            }
        }
    }
}
function checkNeighbors (x, y){
    var count = 0; 
    for(var i = x-1; i <= x+1; i++){ 
        for(var j = y-1; j <= y+1; j++){ 
            if(i >= 0 && j >= 0 && i < mines.length && j < mines[i].length && mines[i][j] == -1){
                count++;
            }
        }
    }
    return count;
}
function calcPercentRevealed() {
    var count = 0; 
    for(var i = 0; i < mines.length; i++) { 
        for(var j = 0; j < mines[i].length; j++){ 
            if(shown[i][j] == 1){
                count++;
            }
        }
    }
    return Math.round(count / (mines.length*mines[0].length) * 10000.0)/100;
}
var interval = setInterval(runFrame, 1080/60);