const answer = "NATHANFILLION";

let currentRow = 0;
let currentCol = 0;
let gameOver = false;

const board = document.getElementById("board");

// Create board
for (let r = 0; r < 3; r++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let c = 0; c < 13; c++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.id = `r${r}c${c}`;
        row.appendChild(tile);
    }

    board.appendChild(row);
}

document.addEventListener("keydown", handleKey);

function handleKey(e) {

    if (gameOver) return;

    if (/^[a-zA-Z]$/.test(e.key)) {

        if (currentCol < 13) {

            const tile = document.getElementById(
                `r${currentRow}c${currentCol}`
            );

            tile.textContent = e.key.toUpperCase();

            currentCol++;
        }
    }

    else if (e.key === "Backspace") {

        if (currentCol > 0) {

            currentCol--;

            const tile = document.getElementById(
                `r${currentRow}c${currentCol}`
            );

            tile.textContent = "";
        }
    }

    else if (e.key === "Enter") {

        if (currentCol === 13) {
            submitGuess();
        }
    }
}

function submitGuess() {

    let guess = "";

    for (let i = 0; i < 13; i++) {
        guess += document
            .getElementById(`r${currentRow}c${i}`)
            .textContent;
    }

    scoreGuess(guess);

    if (guess === answer) {
        gameOver = true;

        setTimeout(() => {
            alert("You win!");
        }, 300);

        return;
    }

    currentRow++;
    currentCol = 0;

    if (currentRow >= 3) {

        gameOver = true;

        setTimeout(() => {
            alert(`Game Over! The answer was ${answer}`);
        }, 300);
    }
}

function scoreGuess(guess) {

    for (let i = 0; i < 13; i++) {

        const tile = document.getElementById(
            `r${currentRow}c${i}`
        );

        const letter = guess[i];

        if (letter === answer[i]) {
            tile.classList.add("green");
        }
        else if (answer.includes(letter)) {
            tile.classList.add("yellow");
        }
        else {
            tile.classList.add("gray");
        }
    }
}