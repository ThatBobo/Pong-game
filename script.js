// Pong Game Logic

// Configuration
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;
document.body.appendChild(canvas);

// Game Variables
let paddleWidth = 10;
let paddleHeight = 100;
let ballSize = 10;
let playerPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
let aiPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, speedX: 4, speedY: 4 };

// Control Variables
let upPressed = false;
let downPressed = false;

// Event Listeners for Control
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') upPressed = true;
    if (event.key === 'ArrowDown') downPressed = true;
});

window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') upPressed = false;
    if (event.key === 'ArrowDown') downPressed = false;
});

// Update Function
function update() {
    // Paddle Control
    if (upPressed && playerPaddle.y > 0) playerPaddle.y -= 5;
    if (downPressed && playerPaddle.y < canvas.height - paddleHeight) playerPaddle.y += 5;
    
    // AI Movement
    if (aiPaddle.y + paddleHeight / 2 < ball.y) {
        aiPaddle.y += 4;
    } else {
        aiPaddle.y -= 4;
    }

    // Ball Movement
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball Collision with Top and Bottom
    if (ball.y <= 0 || ball.y >= canvas.height) ball.speedY = -ball.speedY;
    
    // Ball Collision with Paddles
    if (ball.x <= playerPaddle.x + paddleWidth && ball.y >= playerPaddle.y && ball.y <= playerPaddle.y + paddleHeight) {
        ball.speedX = -ball.speedX;
    }
    if (ball.x + ballSize >= aiPaddle.x && ball.y >= aiPaddle.y && ball.y <= aiPaddle.y + paddleHeight) {
        ball.speedX = -ball.speedX;
    }

    // Ball Reset if out of bounds
    if (ball.x < 0) {
        aiPaddle.score++;
        resetBall();
    }
    if (ball.x > canvas.width) {
        playerPaddle.score++;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = -ball.speedX;
}

// Draw Function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw Paddles
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerPaddle.x, playerPaddle.y, paddleWidth, paddleHeight);
    ctx.fillStyle = 'red';
    ctx.fillRect(aiPaddle.x, aiPaddle.y, paddleWidth, paddleHeight);
    // Draw Ball
    ctx.fillStyle = 'black';
    ctx.fillRect(ball.x, ball.y, ballSize, ballSize);
    // Draw Scores
    ctx.font = '20px Arial';
    ctx.fillText(playerPaddle.score, canvas.width / 4, 20);
    ctx.fillText(aiPaddle.score, 3 * canvas.width / 4, 20);
}

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start Game
gameLoop();