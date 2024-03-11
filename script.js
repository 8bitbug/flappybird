let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  

  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();

let bird = new Image();
bird.src = './flappybird.png';

let background = new Image();
background.src = 'https://user-images.githubusercontent.com/18351809/46888871-624a3900-ce7f-11e8-808e-99fd90c8a3f4.png';

let x = 100;
let y = 100;

let gameOver = false;

let gravity = 3;
let jumpPower = 6;
let isJumping = false;

let time = 0;

function gameLoop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        y += gravity
        drawBackground();
        drawBird();
        requestAnimationFrame(gameLoop)
    }
}

gameLoop()

function drawBird() {
    ctx.drawImage(bird, x, y, 170, 100);
}

function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

let jumpanimation;

document.addEventListener('keydown', function(event) {
    if ((event.key === ' ' || event.keyCode === 32) && !isJumping) {
        isJumping = true;
        function jumpAction() {
            if (time < 100) {
                gravity = 0;
                y -= jumpPower;
                time += 3;
                jumpanimation = requestAnimationFrame(jumpAction);
            } else {
                cancelAnimationFrame(jumpanimation);
                gravity = 3;
                time = 0;
            }
        }
        jumpAction();
    }
});


document.addEventListener('keyup', function(event) {
    if (event.key === ' ' || event.keyCode === 32) {
            isJumping = false;
    }
});
