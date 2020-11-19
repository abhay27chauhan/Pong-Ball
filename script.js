let ball = document.querySelector('.ball');
let board = document.querySelector('.board');
let boardBounds = board.getBoundingClientRect();
let leftPaddle = document.querySelector('.left');
let rightPaddle = document.querySelector('.right');
let y = true;
let x = true;
let leftPlayerLives = 3;
let rightPlayerLives = 3;

document.addEventListener("keydown", (e) => {
    if(e.key == 'w'){
        movePaddle(leftPaddle, -window.innerHeight*0.1);
    }else if(e.key == 's'){
        movePaddle(leftPaddle, window.innerHeight*0.1);
    }else if(e.key == 'ArrowUp'){
        movePaddle(rightPaddle, -window.innerHeight*0.1);
    }else if(e.key == 'ArrowDown'){
        movePaddle(rightPaddle, window.innerHeight*0.1);
    }
})

function setColor(idx){
    let allicons = document.querySelectorAll(".fas.fa-circle");
    allicons[idx].style.color = "#686de0";
}

function movePaddle(cPaddle, change){
    let cPaddleBounds = cPaddle.getBoundingClientRect();

    if(cPaddleBounds.top+change>=boardBounds.top && cPaddleBounds.bottom+change<=boardBounds.bottom){
        cPaddle.style.top = cPaddleBounds.top+change+"px";
    }
}

function moveBall(){
    let ballcord = ball.getBoundingClientRect();
    let ballTop = ballcord.top;
    let ballLeft = ballcord.left;
    let ballBottom = ballcord.bottom;
    let ballRight = ballcord.right;

    // check if collided with any players horizontal boundary

    let hasTouchedLeft = ballLeft<boardBounds.left;
    let hasTouchedRight = ballRight>boardBounds.right;

    if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerLives--;
            setColor(leftPlayerLives);
            if(leftPlayerLives == 0){
                alert("Game Over! Player B Won !!");
                document.location.reload;
            }else{
                return resetGame();
            }
        }else{
            rightPlayerLives--;
            setColor(3+rightPlayerLives);
            if(rightPlayerLives == 0){
                alert("Game Over! Player A Won !!");
                document.location.reload;
            }else{
                return resetGame();
            }
        }
    }

    function resetGame(){
        ball.style.top = window.innerHeight*0.45+"px";
        ball.style.left = window.innerWidth*0.50+"px";
        requestAnimationFrame(moveBall);
    }

    // is ball in bound

    // handleVerticalBound
    if(ballTop <= boardBounds.top || ballBottom >= boardBounds.bottom){
        y = !y;
    }
    // handleHorizontalBound
    if(ballLeft <= boardBounds.left || ballRight >= boardBounds.right){
        x = !x;
    }

    // collision
    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();
    
    if(ballLeft<=leftPaddleBounds.right && ballRight>=leftPaddleBounds.left && ballTop+30>=leftPaddleBounds.top && ballBottom-30<=leftPaddleBounds.bottom){
        x = !x;
    }

    if(ballLeft<=rightPaddleBounds.right && ballRight>=rightPaddleBounds.left && ballTop+30>=rightPaddleBounds.top && ballBottom-30<=rightPaddleBounds.bottom){
        x = !x;
    }

    ball.style.top = y==true ? ballTop+6+"px" : ballTop-6+"px";
    ball.style.left = x==true ? ballLeft+6+"px" : ballLeft-6+"px";
    requestAnimationFrame(moveBall);

}

requestAnimationFrame(moveBall);

