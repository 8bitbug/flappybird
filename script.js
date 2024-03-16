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

let canvasClickHandler;
let canvasHoverHandler;

function gameLoop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        y += gravity;
        drawBackground();
        updatepipes();
        drawPipes();
        drawBird();
        checkCollision();
        IsGameOver();
        startGameButton = null;
        requestAnimationFrame(gameLoop);
    } else {
        gameOverScreen();
        canvasHoverHandler = function(event) {
            if (
                event.clientX >= (canvas.width / 2 - (canvas.width / 6.2)) * 1.23456789 &&
                event.clientX <= (canvas.width / 2 - (canvas.width / 6.2)) * 1.23456789 + 200 &&
                event.clientY >= (canvas.height / 2 - (canvas.height / Math.PI) + Math.PI * 2) * 3.5 &&
                event.clientY <= (canvas.height / 2 - (canvas.height / Math.PI) + Math.PI * 2) * 3.5 + 50
            ) {
                canvas.style.cursor = 'pointer';
            } else {
                canvas.style.cursor = 'default'
            }
        }

        canvas.addEventListener('mousemove', canvasHoverHandler);
        canvasClickHandler = function(event) {
            let rect = canvas.getBoundingClientRect();
            let clickX = event.clientX - rect.left;
            let clickY = event.clientY - rect.top;

            if (
                clickX >= (canvas.width / 2 - (canvas.width / 6.2)) * 1.23456789 &&
                clickX <= (canvas.width / 2 - (canvas.width / 6.2)) * 1.23456789 + 200 &&
                clickY >= (canvas.height / 2 - (canvas.height / Math.PI) + Math.PI * 2) * 3.5 &&
                clickY <= (canvas.height / 2 - (canvas.height / Math.PI) + Math.PI * 2) * 3.5 + 50
            ) {
                restartGame();
                canvas.removeEventListener('click', canvasClickHandler);
                canvas.removeEventListener('mousemove', canvasHoverHandler);
                canvas.style.cursor = 'default';
            }
        };
        canvas.addEventListener('click', canvasClickHandler);
    }
}

function checkCollision() {
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        if (
            x + 140 >= pipe.x &&
            x <= pipe.x + 100 &&
            (y <= pipe.top || y + 80 >= canvas.height - pipe.bottom)
        ) {
            gameOver = true;
            return;
        }
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
    let pipeheightArray = [100, 150, 200, 250, 300];
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
        } else if (pipe.top === 300) {
            pipe.bottom =  -100
        } else if (pipe.top === 100) {
            pipe.bottom = -300
        } else if (pipe.top === 150) {
            pipe.bottom = -250
        } else if (pipe.top === 250) {
            pipe.bottom = -150
        };

        ctx.fillRect(pipe.x, 0, 100, pipe.top);
        ctx.fillRect(pipe.x, canvas.height, 100, pipe.bottom);
    });
}

function IsGameOver() {
    if (y <= Math.PI / Math.PI - Math.PI) {
        gameOver = true;
    }

    if (y >= canvas.height - 75) {
        gameOver = true;
    }
}

function gameOverScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    ctx.fillStyle = 'tan';
    ctx.fillRect(canvas.width / 2 - (canvas.width / 6.2), canvas.height / 2 - (canvas.height / Math.PI) + Math.PI * 2, 420, 450);
    ctx.fillStyle = 'orange';
    ctx.fillRect((canvas.width / 2 - (canvas.width / 6.2)) * 1.23456789, (canvas.height / 2 - (canvas.height / Math.PI) + Math.PI * 2) * 3.5, 200, 50)
    ctx.fillStyle = 'white';
    ctx.font = '30px sans-serif';
    ctx.fillText('Restart', (canvas.width / 2 - (canvas.width / 6.2)) * 1.345, (canvas.height / 2 - (canvas.height / Math.PI) + Math.PI * 2) * 3.77);
    ctx.font = '50px lora';
    ctx.fillText('Game Over',  (canvas.width / 2 - (canvas.width / 6.2)) * 1.22,  (canvas.height / 2 - (canvas.height / Math.PI) + Math.PI * 2) * 1.7)
}

function restartGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    y = 100;
    pipes = [];
    gameOver = false;
    gravity = 3;
    jumpPower = 5;
    isJumping = false;
    time = 0;
    gameLoop()
    clearInterval(pipesspawning);
    spawnpipes();
    pipesspawning = setInterval(spawnpipes, 2500);
}