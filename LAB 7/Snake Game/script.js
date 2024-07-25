var box = 17;
var score = 0;
var highestScore = 0;
var level = 2;
var scoreBox = document.getElementById("score");
var highestScoreBox = document.getElementById("highestScore");
var scoreTableBox = document.getElementById("scoreTable");
var scoreTable = [];
var headBox;
var head;
var tailBox;
var direction = 1;
var nextDirection = 2;
var length;
var snakeBody = [];
var block = [];
var time;
var interval;
var foodBox = document.getElementById("1");
var foodEaten;
var buttonBoxType = 1;
var button1 = document.getElementById("start");
var button2 = document.getElementById("restart");
button2.style.visibility = "hidden";
document.getElementById("l2").style.background = "#96d98c";

document.addEventListener("keydown",setDirection);

function setDirection(e){
    if(nextDirection == direction && buttonBoxType != 3){
        switch(e.code){
            case "ArrowRight" :
                if(nextDirection != 3) nextDirection = 1;
                break;
            case "ArrowDown" :
                if(nextDirection != 4) nextDirection = 2;
                break;
            case "ArrowLeft" :
                if(nextDirection != 1) nextDirection = 3;
                break;
            case "ArrowUp" :
                if(nextDirection != 2) nextDirection = 4;
                break;
        }
    }
}

function changeButton(){
    if(buttonBoxType == 1){
        buttonBoxType = 2;
        button1.innerHTML = "Pause";
        start();
    }
    else if(buttonBoxType == 2){
        buttonBoxType = 3;
        clearInterval(interval);
        interval = null;
        button1.innerHTML = "Resume";
        button2.style.visibility = "visible";
    }
    else if(buttonBoxType == 3){
        buttonBoxType = 2;
        button1.innerHTML = "Pause";
        interval = setInterval(moveHead,time);
        button2.style.visibility = "hidden";
    }
}

function out(){
    buttonBoxType = 1;
    clearInterval(interval);
    interval = null;
    button1.innerHTML = "Start";
    
    if(score > highestScore){
        highestScore = score;
        highestScoreBox.innerHTML = highestScore;
    }
}

function restart(){
    buttonBoxType = 2;
    button1.innerHTML = "Pause";
    start();
}

function start(){
    
    button2.style.visibility = "hidden";
    if(score > highestScore){
        highestScore = score;
        highestScoreBox.innerHTML = highestScore;
    }
    score = 0;
    scoreBox.innerHTML = score;

    if(interval != null){
        clearInterval(interval);
        interval = null;
    }

    headBox = document.getElementById('137');
    head = 137;
    
    time = 130;
    tailBox = document.getElementById('137');
    
    direction = 1;
    nextDirection = 1;

    foodEaten = false;
    
    while(snakeBody != null && snakeBody.length > 0){
        tailBox = document.getElementById(snakeBody.pop());
        if(tailBox != null){
            tailBox.innerHTML = "";
            tailBox.style.background = null;
            tailBox.style.borderRadius = null;
            tailBox.style.border = null;
        }
    }

    while(block != null && block.length > 0){
        tailBox = document.getElementById(block.pop());
        if(tailBox != null){
            tailBox.style.background = null;
            tailBox.style.borderRadius = null;
            tailBox.style.border = null;
        }
    }
    
    snakeBody = [head];
    headBox.style.background = "#2a4beb";
    length = 0;
    block = [];
    
    foodBox.style.background = null;
    foodBox.style.borderRadius = null;
    generateFood();

    interval = setInterval(moveHead,time);
}

function moveHead(){
    
    if(!foodEaten) moveTail();
    else foodEaten = false;
    
    temp = direction;
    direction = nextDirection;
    if(direction == 1){
        if(head % box == 0){
            if(level == 1) head-=box;
            else{
                out();
                return;
            }
        }
        head++;
        if(checkHead()){
            out();
            return;
        }
        headBox.innerHTML = "<div style='background-color: #2a43bd; transform: rotate(45deg); width: 0.6vw; height: 0.6vw;'></div>";
        headBox.style.borderRadius = null;
        if(temp != direction){
            headBox.style.borderRight = null;
            if(temp == 4){
                headBox.style.borderTopLeftRadius = "60%";
                headBox.style.borderTop = "1px solid #76c893";
            }
            else if(temp == 2){
                headBox.style.borderBottomLeftRadius = "60%";
                headBox.style.borderBottom = "1px solid #76c893";
            }
        }
        headBox = document.getElementById(head);
        headBox.style.flexDirection = "column";
        headBox.style.borderBottom = "1px solid #76c893";
        headBox.style.borderTop = "1px solid #76c893";
        headBox.style.borderTopRightRadius = "80%";
        headBox.style.borderBottomRightRadius = "80%";
    }
    else if(direction == 2){
        if(head + box > box*box){
            if(level == 1) head-=box*box;
            else{
                out();
                return;
            }
        }
        head+=box;
        if(checkHead()){
            out();
            return;
        }
        headBox.innerHTML = "<div style='background-color: #2a43bd; transform: rotate(45deg); width: 0.6vw; height: 0.6vw;'></div>";
        headBox.style.borderRadius = null;
        if(temp != direction){
            headBox.style.borderBottom = null;
            if(temp == 1){
                headBox.style.borderTopRightRadius = "60%";
                headBox.style.borderRight = "1px solid #76c893";
            } 
            else if(temp == 3){
                headBox.style.borderTopLeftRadius = "60%";
                headBox.style.borderLeft = "1px solid #76c893";
            }
        }
        headBox = document.getElementById(head);
        headBox.style.flexDirection = "row";
        headBox.style.borderRight = "1px solid #76c893";
        headBox.style.borderLeft = "1px solid #76c893";
        headBox.style.borderBottomLeftRadius = "80%";  
        headBox.style.borderBottomRightRadius = "80%";
    }
    else if(direction == 3){
        if(head % box == 1){
            if(level == 1) head+=box;
            else{
                out();
                return;
            }
        }
        head--;
        if(checkHead()){
            out();
            return;
        }
        headBox.innerHTML = "<div style='background-color: #2a43bd; transform: rotate(45deg); width: 0.6vw; height: 0.6vw;'></div>";
        headBox.style.borderRadius = null;
        if(temp != direction){
            headBox.style.borderLeft = null;
            if(temp == 4){
                headBox.style.borderTopRightRadius = "60%";
                headBox.style.borderTop = "1px solid #76c893";
            }
            else if(temp == 2){
                headBox.style.borderBottomRightRadius = "60%";
                headBox.style.borderBottom = "1px solid #76c893";
            }
        }
        headBox = document.getElementById(head);
        headBox.style.flexDirection = "column";
        headBox.style.borderBottom = "1px solid #76c893";
        headBox.style.borderTop = "1px solid #76c893";
        headBox.style.borderBottomLeftRadius = "80%";
        headBox.style.borderTopLeftRadius = "80%";
    }
    else if(direction == 4){
        if(head - box < 1){
            if(level == 1) head+=box*box;
            else{
                out();
                return;
            }
        }
        head-=box;
        if(checkHead()){
            out();
            return;
        }
        headBox.innerHTML = "<div style='background-color: #2a43bd; transform: rotate(45deg); width: 0.6vw; height: 0.6vw;'></div>";
        headBox.style.borderRadius = null;
        if(temp != direction){
            headBox.style.borderTop = null;
            if(temp == 1){
                headBox.style.borderBottomRightRadius = "60%";
                headBox.style.borderRight = "1px solid #76c893";
            }
            else if(temp == 3){
                headBox.style.borderBottomLeftRadius = "60%";
                headBox.style.borderLeft = "1px solid #76c893";
            }
        }
        headBox = document.getElementById(head);
        headBox.style.flexDirection = "row";
        headBox.style.borderRight = "1px solid #76c893";
        headBox.style.borderLeft = "1px solid #76c893";
        headBox.style.borderTopRightRadius = "80%";
        headBox.style.borderTopLeftRadius = "80%";
    }

    
    if(foodBox == headBox){
        score++;
        if(level == 3 && score % 3 == 0) generateBlock();
        scoreBox.innerHTML = score;
        generateFood();
        foodEaten = true;
    }
    
    headBox.innerHTML = "<div style='background-color: white; border-radius: 50%; width: 25%; height: 25%; margin: 8%;'> <div style='background-color: black; border-radius: 50%; width: 50%; height: 50%; margin: 15%;'> </div></div>";
    headBox.innerHTML += "<div style='background-color: white; border-radius: 50%; width: 25%; height: 25%; margin: 8%;'> <div style='background-color: black; border-radius: 50%; width: 50%; height: 50%; margin: 15%;'> </div></div>";
    headBox.style.background = "#2a4beb";
}

function moveTail(){
    if( length++ < 2 ) return;
    tailBox = document.getElementById(snakeBody.shift());
    if(tailBox != null){
        tailBox.innerHTML = "";
        tailBox.style.background = null;
        tailBox.style.borderRadius = null;
        tailBox.style.border = null;
    }
    if(snakeBody.length > 1){
        tailBox = document.getElementById(snakeBody[0]);
        tailBox.style.border = null;
        temp = snakeBody[0] - snakeBody[1];
        if(temp == 1){
            tailBox.style.borderTopRightRadius = "50%";
            tailBox.style.borderBottomRightRadius = "50%";
            tailBox.style.borderBottom = "1px solid #76c893";
            tailBox.style.borderTop = "1px solid #76c893";
        }
        else if(temp == -1){
            tailBox.style.borderBottomLeftRadius = "50%";
            tailBox.style.borderTopLeftRadius = "50%";
            tailBox.style.borderBottom = "1px solid #76c893";
            tailBox.style.borderTop = "1px solid #76c893";
        }
        else if(temp == box){
            tailBox.style.borderBottomLeftRadius = "50%";
            tailBox.style.borderBottomRightRadius = "50%";
            tailBox.style.borderRight = "1px solid #76c893";
            tailBox.style.borderLeft = "1px solid #76c893";
        }
        else if(temp == -box){
            tailBox.style.borderTopRightRadius = "50%";
            tailBox.style.borderTopLeftRadius = "50%";
            tailBox.style.borderRight = "1px solid #76c893";
            tailBox.style.borderLeft = "1px solid #76c893";
        }
    }
}

function checkHead(){
    snakeBody.push(head);
    for(i = 0;i < snakeBody.length - 1;i++){
        if(head == snakeBody[i]) return true;
    }
    for(i = 0;i < block.length;i++){
        if(head == block[i]) return true;
    }
    return false;
}

function generateFood(){
    // if(time >= 10 && snakeBody.length % 3 == 0){
    //     clearInterval(interval);
    //     interval = null;
    // }
    foodBox.innerHTML = null;
    do{
        temp = parseInt(1 + (box*box*Math.random()) );
        foodBox = document.getElementById(temp);
    }while(foodBox.style.background != '');

    foodBox.style.borderRadius = "50%";
    foodBox.style.background = "#e85d04";
    foodBox.innerHTML = "<div style='background-color: #094e03; transform: rotate(-10deg); position: relative; bottom: 40%; right: 18%; border-bottom-left-radius: 100%; border-top-right-radius: 100%; width: 0.7vw; height: 0.7vw;'> </div>";

    if(time >= 50 && snakeBody.length % 3 == 0){
        clearInterval(interval);
        interval = null;
        time-=3;
        interval = setInterval(moveHead,time);
    }
}

function generateBlock(){
    do{
        temp = parseInt(1 + (box*box*Math.random()) );
        temp2 = document.getElementById(temp);
    }while(temp2.style.background != '');
    block.push(temp);
    temp2.style.borderRadius = "20%";
    temp2.style.border = "1px solid black";
    temp2.style.background = "#115405";
}

function changeLevelTo(next){
    if(interval != null) return;
    document.getElementById("l" + level).style.background = "#3b8131";
    document.getElementById("l" + next).style.background = "#96d98c";
    level = next;
}