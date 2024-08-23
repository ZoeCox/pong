const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.height = 700;
canvas.width = 700;

const bounceSound = document.querySelector(".bounce-sound");
const wallBounceSound = document.querySelector(".bounce-wall-sound");
const scoreSound = document.querySelector(".score-sound");
const winSound = document.querySelector(".win-sound");

let shouldWinSoundPlay = true;

const score = {
  player1: 0,
  player2: 0,
};

const paddle1 = {
  height: 100,
  width: 10,
  xCoord: 20,
  yCoord: 300,
  speed: 1.25,
};

const paddle2 = {
  height: 100,
  width: 10,
  xCoord: 670,
  yCoord: 300,
  speed: 1.25,

};

const ball = {
  xCoord: 340,
  yCoord: 360,
  directionX: 0,
  directionY: 0,
  speedY: 1,
  speedX: 1,
  radius: 10,
  moving: false,
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
  false,
);

function playerMove() {
  if ("w" in keyClick) {
    paddle1.yCoord -= paddle1.speed;
  }
  if ("s" in keyClick) {
    paddle1.yCoord += paddle1.speed;
  }
  if ("ArrowUp" in keyClick) {
    paddle2.yCoord -= paddle2.speed;
  }
  if ("ArrowDown" in keyClick) {
    paddle2.yCoord += paddle2.speed;
  }
  if (paddle1.yCoord + 20 <= 0 && "w" in keyClick) {
    paddle1.yCoord = canvas.height - 40;
  }
  if (paddle1.yCoord + 50 >= canvas.height -10  && "s" in keyClick) {
    paddle1.yCoord = -40;
  }
  if (paddle2.yCoord + 20 <= 0 && "ArrowUp" in keyClick) {
    paddle2.yCoord = canvas.height - 40;
  }
  if (paddle2.yCoord + 50 >= canvas.height - 10 && "ArrowDown" in keyClick) {
    paddle2.yCoord = -40;
  }
}

document.addEventListener(
  "keyup",
  function (event) {
    delete keyClick[event.key];
  },
  false
);

function gameStart() {
  const randomNumber = Math.round(Math.random() * 10);
  ball.directionX = randomNumber % 2 ? 1 : -1;
  ball.xCoord -= ball.speedX;
  ball.moving = true;
}

function ballMove() {
  ball.xCoord += ball.speedX * ball.directionX;
  ball.yCoord += ball.speedY * ball.directionY;
}

function roundReset() {
  ball.xCoord = 340;
  ball.yCoord = 345;
  paddle1.xCoord = 20;
  paddle1.yCoord = 290;
  paddle2.xCoord = 670;
  paddle2.yCoord = 290;
  ball.moving = false;
  ball.directionX = 0;
  ball.directionY = 0;
}

function gameReset() {
  roundReset();
  if (score.player1 === 5 || score.player2 === 5) {
    score.player1 = 0;
    score.player2 = 0;
  }
}

function endScreen() {
  context.fillStyle = "#b7c9e2";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = "66px sans-serif";
  context.fillStyle = "white";
  if (shouldWinSoundPlay)
  {winSound.play();
    shouldWinSoundPlay = false;
  }
  score.player1 === 5
    ? context.fillText("Player One Wins! 🏆", 60, 345)
    : context.fillText("Player Two Wins! 🏆", 50, 345);
  context.font = "32px sans-serif";
  context.fillStyle = "white";
  context.fillText("Press the spacebar to play again", 95, 425);
  if (" " in keyClick) {
    gameReset();
  }
}

function scoreColissionDetect() {
  if (ball.xCoord >= 700) {
    scoreSound.play();
    score.player1++;
    roundReset();
  } else if (ball.xCoord <= 0) {
    scoreSound.play();
    score.player2++;
    roundReset();
  }
}

function wallCollisionDetect() {
  const { ballBottom, ballTop } = getBallBounds();
  const doesCollideWithTop = ballTop <= 0;
  const doesCollideWithBottom = ballBottom >= canvas.height;
  if (doesCollideWithTop || doesCollideWithBottom) {
    wallBounceSound.play();
    ball.directionY = ball.directionY * -1;
  }
}

function paddleCollisionDetect() {
  const { ballLeading, ballTrailing, ballBottom, ballTop } = getBallBounds();
  const { paddle1Bounds, paddle2Bounds } = getPaddleBounds();
  const doesPaddle1TopCollide =
    ballTrailing <= paddle1Bounds.surface &&
    ballBottom >= paddle1Bounds.top &&
    ballTop <= paddle1Bounds.middleStart;
  const doesPaddle1MiddleCollide =
    ballTrailing <= paddle1Bounds.surface &&
    ballBottom >= paddle1Bounds.middleStart + 1 &&
    ballTop <= paddle1Bounds.middleEnd - 1;
  const doesPaddle1BottomCollide =
    ballTrailing <= paddle1Bounds.surface &&
    ballBottom >= paddle1Bounds.middleEnd &&
    ballTop <= paddle1Bounds.bottom;
  // paddle 1 collision
  const doesPaddle2TopCollide =
    ballLeading >= paddle2Bounds.surface &&
    ballBottom >= paddle2Bounds.top &&
    ballTop <= paddle2Bounds.middleStart;
  const doesPaddle2MiddleCollide =
    ballLeading >= paddle2Bounds.surface &&
    ballBottom >= paddle2Bounds.middleStart + 1 &&
    ballTop <= paddle2Bounds.middleEnd - 1;
  const doesPaddle2BottomCollide =
    ballLeading >= paddle2Bounds.surface &&
    ballBottom >= paddle2Bounds.middleEnd &&
    ballTop <= paddle2Bounds.bottom;
  // paddle 2 collision-
  if (doesPaddle1TopCollide || doesPaddle2TopCollide) {
    bounceSound.play();
    const randomNumber = Math.round(Math.random() * 10);
    ball.directionY = randomNumber % 2 ? -1 : -1.5;
    ball.directionX = ball.directionX * -1;
    
  } else if (doesPaddle1MiddleCollide || doesPaddle2MiddleCollide) {
    bounceSound.play();
    ball.directionX = ball.directionX * -1;
   
  } else if (doesPaddle1BottomCollide || doesPaddle2BottomCollide) {
    bounceSound.play();
    const randomNumber = Math.round(Math.random() * 10);
    ball.directionY = randomNumber % 2 ? +1 : +1.5;
    ball.directionX = ball.directionX * -1;
    
  }
}


function getBallBounds() {
  const ballLeading = ball.xCoord + ball.radius;
  const ballTrailing = ball.xCoord - ball.radius;
  const ballTop = ball.yCoord - ball.radius;
  const ballBottom = ball.yCoord + ball.radius;
  return { ballLeading, ballTrailing, ballTop, ballBottom };
}

function getPaddleBounds() {
  const paddle1Bounds = {
    top: paddle1.yCoord,
    middleStart: paddle1.yCoord + 45,
    middleEnd: paddle1.yCoord + 55,
    bottom: paddle1.yCoord + paddle1.height,
    surface: paddle1.xCoord + paddle1.width,
  };
  const paddle2Bounds = {
    top: paddle2.yCoord,
    middleStart: paddle2.yCoord + 45,
    middleEnd: paddle2.yCoord + 55,
    bottom: paddle2.yCoord + paddle2.height,
    surface: paddle2.xCoord,
  };
  return { paddle1Bounds, paddle2Bounds };
}

function checkReady() {
  this.ready = true;
  playGame();
}

function playGame() {
  playerMove();
  if (ball.moving) {
    ballMove();
    paddleCollisionDetect();
    scoreColissionDetect();
    wallCollisionDetect();
  } else if (" " in keyClick) {
    gameStart();
  }
  render();
  requestAnimationFrame(playGame);
}

function render() {
  context.fillStyle = "#b7c9e2";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(dividerImage, 335, -25, 10, 750);
  context.drawImage(
    paddleImage1,
    paddle1.xCoord,
    paddle1.yCoord,
    paddle1.width,
    paddle1.height
  );
  context.drawImage(
    paddleImage2,
    paddle2.xCoord,
    paddle2.yCoord,
    paddle2.width,
    paddle2.height
  );

  context.beginPath();
  context.arc(ball.xCoord, ball.yCoord, ball.radius, 0, Math.PI * 2, true);
  context.fillStyle = "white";
  context.lineWidth = 2.5;
  context.stroke();
  context.fill();
  context.font = "22px sans-serif";
  const { player1, player2 } = score;
  context.fillText(`Player One: ${player1}`, 20, 50);
  context.fillText(`Player Two: ${player2}`, 365, 50);
  if (score.player1 === 5 || score.player2 === 5) {
    endScreen();
  }
}

document.body.appendChild(canvas);
