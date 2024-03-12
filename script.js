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

let pipes = []

let gameOver = false;

let gravity = 3;
let jumpPower = 5;
let isJumping = false;

let time = 0;

function gameLoop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        y += gravity;
        drawBackground();
        updatepipes();
        drawPipes();
        drawBird();
        requestAnimationFrame(gameLoop);
    } else {
        clearInterval(pipesspawning);
        pipesspawning = null;
    }
}

gameLoop()

let pipesspawning;

spawnpipes();

pipesspawning = setInterval(() => {
    spawnpipes();
}, 2500)

function drawBird() {
    ctx.drawImage(bird, x, y, 140, 80);
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

function updatepipes() {
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 2

        if (pipes[i].x + 100 < 0) {
            pipes.splice(i, 1);
            i--;
        }
    }
}

function spawnpipes() {
    let pipeheightArray = [100, 200, 400];
    let pipeheightIndex = Math.floor(Math.random() * pipeheightArray.length);

    let pipe = {
        top: pipeheightArray[pipeheightIndex],
        bottom: pipeheightArray[pipeheightIndex],
        x: canvas.width
    };
    pipes.push(pipe);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        if (pipe.top === 200) {
            pipe.bottom = -200;
        } else if (pipe.top === 400) {
            pipe.top = 350;
            pipe.bottom =  -100
        } else if (pipe.top === 100) {
            pipe.bottom = -350
        }
        ctx.fillRect(pipe.x, 0, 100, pipe.top);
        ctx.fillRect(pipe.x, canvas.height, 100, pipe.bottom);
    });
}