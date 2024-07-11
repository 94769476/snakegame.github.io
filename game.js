const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

const box = 20;
const canvasSize = 400;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;
let d;

document.addEventListener('keydown', direction);

function direction(event) {
    let key = event.keyCode;
    if (key === 37 && d !== 'RIGHT') {
        d = 'LEFT';
    } else if (key === 38 && d !== 'DOWN') {
        d = 'UP';
    } else if (key === 39 && d !== 'LEFT') {
        d = 'RIGHT';
    } else if (key === 40 && d !== 'UP') {
        d = 'DOWN';
    }
}

function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            return true;
        }
    }
    return newHead.x < 0 || newHead.y < 0 || newHead.x >= canvasSize || newHead.y >= canvasSize;
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'white';
        ctx.strokeStyle = 'red';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === 'LEFT') snakeX -= box;
    if (d === 'UP') snakeY -= box;
    if (d === 'RIGHT') snakeX += box;
    if (d === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (collision(newHead, snake)) {
        clearInterval(game);
        finalScoreElement.textContent = score;
        gameOverElement.classList.remove('hidden');
        postScore(score); // post the score to the server
        return;
    }

    snake.unshift(newHead);

    scoreElement.textContent = 'Score: ' + score;
}

function restartGame() {
    gameOverElement.classList.add('hidden');
    snake = [{ x: 9 * box, y: 10 * box }];
    score = 0;
    d = undefined;
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    game = setInterval(draw, 100);
}

let game = setInterval(draw, 100);

