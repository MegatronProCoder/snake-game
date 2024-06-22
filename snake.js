import { foodPosition, updateFood } from "./food.js";

export let SNAKE_SPEED = 1;
const EXPANSION_RATE = 1;
export const snakeSegments = [
    { x: 11, y: 11 }
];

let inputDirection = { x: 0, y: 0 };

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (inputDirection.y === 1) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (inputDirection.y === -1) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (inputDirection.x === 1) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (inputDirection.x === -1) break;
            inputDirection = { x: 1, y: 0 };
            break;
    }
});

export function updateSnake() {
    if (onSnake(foodPosition)) {
        expandSnake();
        updateFood();
        SNAKE_SPEED += 0.2
    }

    for (let i = snakeSegments.length - 1; i >= 1; i--) {
        snakeSegments[i] = { ...snakeSegments[i - 1] };
    }

    snakeSegments[0].x += inputDirection.x;
    snakeSegments[0].y += inputDirection.y;

}

export function drawSnake(gameBoard) {
    snakeSegments.forEach(segment => {
        const snakeElem = document.createElement('div');
        snakeElem.classList.add('snake');
        snakeElem.style.gridRowStart = segment.y;
        snakeElem.style.gridColumnStart = segment.x;
        gameBoard.append(snakeElem);
    });
}


export function onSnake(position) {
    return snakeSegments.some(segment => {
        return segment.x === position.x && segment.y === position.y;
    });
}

function expandSnake() {
    for (let i = 0; i < EXPANSION_RATE; i++) {
        snakeSegments.push({ ...snakeSegments[snakeSegments.length - 1] });
    }
}

