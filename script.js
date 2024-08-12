const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.height = 700;
canvas.width = 700;

const paddle1 = {
  height: 100,
  width: 10,
  xCoord: 20,
  yCoord: 290,
  speed: 1,
};

const paddle2 = {
  height: 100, 
  width: 10,
  xCoord: 670,
  yCoord: 290,
  speed: 1,
};

const ball = {
  xCoord: 300,
  yCoord: 345,
  directionX: 0,
  directionY: 0,
  speed: 5,
  radius: 10
};

const dividerImage = new Image();
dividerImage.ready = false;
dividerImage.onload = checkReady;
dividerImage.src = "./icons/divider.png";

const paddleImage1 = new Image();
paddleImage1.ready = false;
paddleImage1.onload = checkReady;
paddleImage1.src = "./icons/playerPaddle.png";

const paddleImage2 = new Image();
paddleImage2.ready = false;
paddleImage2.onload = checkReady;
paddleImage2.src = "./icons/playerPaddle.png";

const keyClick = {};

document.addEventListener(
  "keydown",
  function (event) {
    keyClick[event.key] = true;
  },
  false
);

function playerMove() {
  if ("ArrowUp" in keyClick) {
    paddle1.yCoord -= paddle1.speed;
  }
  if ("ArrowDown" in keyClick) {
    paddle1.yCoord += paddle1.speed;
  }
  if ("w" in keyClick) {
    paddle2.yCoord -= paddle2.speed;
  }
  if ("s" in keyClick) {
    paddle2.yCoord += paddle2.speed;
  }
  if (paddle1.yCoord < 0) {
    paddle1.yCoord = canvas.height - 100;
  }
  if (paddle1.yCoord >= canvas.height - 10) {
    paddle1.yCoord = 0;
  }
  if (paddle2.yCoord < 0) {
    paddle2.yCoord = canvas.height - 100;
  }
  if (paddle2.yCoord >= canvas.height - 10) {
    paddle2.yCoord = 0;
  }
}

document.addEventListener(
  "keyup",
  function (event) {
    delete keyClick[event.key];
  },
  false
);

let randomNumber = Math.round(Math.random() * 10);

function ballMove () {
  function ballStart()
  { if (randomNumber % 2) {
    ball.yCoord -= ball.speed;}
    else {ball.yCoord += ball.speed;}
  }
  if (ball.xCoord === 300 && " " in keyClick) {
    ballStart();
    setInterval(ballStart, 100);
    } 
  //collision detection
    if (ball.xCoord >= (canvas.height - ball.radius)) {
      ball.yCoord -= ball.speed;
    }
    }


// function wallCollisionDetect() {
//   if ((ball.xCoord - ball.radius) >= (canvas.height -10)){
//    ball.yCoord += ball.speed; 
// }
//   if ((ball.xCoord - ball.radius) === canvas.height){
//     ball.yCoord -= ball.speed; 
// }
//   }

// function wallBounce () {
//   setInterval(wallCollisionDetect, 30)
// }
//this does also not detect the  collision or do anything about it!

// function paddleCollisionDetect() {
//   if ((ball.yCoord - ball.radius) <= paddle1.y && 
//   (ball.yCoord - ball.radius) >= (paddle1.y + paddle1.height) && ball.yCoord <= (paddle1.x + 10)){
//     ball.xCoord += ball.speed;}
//     if ((ball.yCoord -ball.radius) <= paddle2.y && 
//     (ball.yCoord - ball.radius) >= (paddle2.y + paddle1.height) && ball.yCoord <= (paddle1.x + 10)){
//        ball.xCoord -= ball.speed; 
// }
//   }
//ball.xCoord or ball.yCoord?? 

function checkReady() {
  this.ready = true;
  playGame();
}

function playGame() {
  render();
  requestAnimationFrame(playGame);
}

function render() {
  playerMove();
  ballMove();
  // wallCollisionDetect();
  // wallBounce();
  // paddleCollisionDetect();

  context.fillStyle = "#b7c9e2";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(dividerImage, 335, -25, 10, 750);
  context.drawImage(paddleImage1, paddle1.xCoord, paddle1.yCoord, paddle1.width, paddle1.height);
  context.drawImage(paddleImage2, paddle2.xCoord, paddle2.yCoord, paddle2.width, paddle2.height);

  context.beginPath();
  context.arc(ball.xCoord, ball.yCoord, ball.radius, 0, Math.PI * 2, true);
  context.fillStyle = "white";
  context.lineWidth = 2.5;
  context.stroke();
  context.fill();

 
}

document.body.appendChild(canvas);
