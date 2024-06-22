import { SNAKE_SPEED, drawSnake, snakeSegments, updateSnake } from "./snake.js";
import { drawFood, initializeFood } from "./food.js";

const gameBoard = document.querySelector('.game-board');

// Initialize food position after all modules are loaded
initializeFood();

let startTime = 0;

function main(currentTime) {
    if (checkCollision()) {
        gameOver();
        return;
    }

    window.requestAnimationFrame(main);

    const renderTimeInSecond = (currentTime - startTime) / 1000;
    if (renderTimeInSecond < 1 / SNAKE_SPEED) return;

    startTime = currentTime;
    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function gameOver() {
    const playAgain = confirm("You lost! Play again? Press OK to restart or Cancel to do nothing.");
    if (playAgain) {
        window.location.reload(); // This reloads the page to restart the game
    }
}

function checkCollision() {
    const head = snakeSegments[0];
    for (let i = 1; i < snakeSegments.length; i++) {
        if (head.x === snakeSegments[i].x && head.y === snakeSegments[i].y) {
            return true;
        }
    }
    if (head.x < 1 || head.x > 21 || head.y < 1 || head.y > 21) {
        return true;
    }
    return false;
}
