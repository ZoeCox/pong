const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.height = 700;
canvas.width = 700;

const paddle1 = {
  xCoord: 20,
  yCoord: 290,
  speed: 1,
};

const paddle2 = {
  xCoord: 670,
  yCoord: 290,
  speed: 1,
};

const ball = {
  xCoord: 300,
  yCoord: 345,
  speed: 5,
  ballReady: false,
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
  context.fillStyle = "#b7c9e2";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(dividerImage, 335, -25, 10, 750);
  context.drawImage(paddleImage1, paddle1.xCoord, paddle1.yCoord, 10, 100);
  context.drawImage(paddleImage2, paddle2.xCoord, paddle2.yCoord, 10, 100);

  context.beginPath();
  context.arc(ball.xCoord, ball.yCoord, 10, 0, Math.PI * 2, true);
  context.fillStyle = "white";
  context.lineWidth = 2.5;
  context.stroke();
  context.fill();

  //   ballMove();
}

document.body.appendChild(canvas);
