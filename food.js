import { onSnake } from "./snake.js";

export let foodPosition;

export function initializeFood() {
    foodPosition = randomFoodPosition();
}

export function updateFood() {
    foodPosition = randomFoodPosition();
}

export function drawFood(gameBoard) {
    const foodElem = document.createElement("div");
    foodElem.classList.add("food");
    foodElem.style.gridRowStart = foodPosition.y;
    foodElem.style.gridColumnStart = foodPosition.x;
    gameBoard.append(foodElem);
}

function randomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = {
            x: Math.floor(Math.random() * 21) + 1,
            y: Math.floor(Math.random() * 21) + 1
        };
    }
    return newFoodPosition;
}
