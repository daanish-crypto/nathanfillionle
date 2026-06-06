const answer = "NATHANFILLION";
const today = new Date().toISOString().slice(0, 10); //date object to compare with played var

//checks if player has played before, adds already played screen if true
if (localStorage.getItem("nathanfillionlePlayed") === today) {
    document.body.innerHTML = `
        <div style="
            color:white;
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            font-size:2rem;
            text-align:center;
        ">
            You've already played today's NathanFillionle.
        </div>
    `;
    throw new Error("Already played today");
}

//keeps track of position on board
let currentRow = 0;
let currentCol = 0;
let gameOver = false;

//board
const board = document.getElementById("board");

//changes pos on bboard
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

//keyboard creation
const keyboard = document.getElementById("keyboard");
const rows = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ENTERZXCVBNMBACK"
];

//creates all keys in per row
rows.forEach(rowText => {
    const row = document.createElement("div");
    row.className = "keyboard-row";
    if (rowText === "ENTERZXCVBNMBACK") {

        const enter = createKey("ENTER", true);
        row.appendChild(enter);

        "ZXCVBNM".split("").forEach(letter => {
            row.appendChild(createKey(letter));
        });

        const back = createKey("⌫", true);
        back.dataset.key = "Backspace";
        row.appendChild(back);

    } else {

        rowText.split("").forEach(letter => {
            row.appendChild(createKey(letter));
        });
    }

    keyboard.appendChild(row);
});

//creates keyboard keys on page
function createKey(text, large = false) {
    const button = document.createElement("button");
    button.className = "key";
    if (large) {
        button.classList.add("large");
    }
    button.textContent = text;
    button.id = `key-${text}`;
    if (text === "⌫") {
    button.dataset.key = "Backspace";
    }
    else if (text === "ENTER") {
    button.dataset.key = "Enter";
    }
    else {
    button.dataset.key = text;
    }       

    button.addEventListener("click", () => {

        handleKey({
            key: button.dataset.key
        });
    });

    return button;
}

//fills tile depending on key input
function handleKey(e) {
    if (gameOver) return;
    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
        if (currentCol < 13) {
            const tile = document.getElementById(
                `r${currentRow}c${currentCol}`
            );

            tile.textContent = key;
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

//changes color of the key
function updateKey(letter, color) {

    const key = document.getElementById(
        `key-${letter}`
    );

    if (!key) return;

    if (key.classList.contains("green"))
        return;

    if (
        key.classList.contains("yellow") &&
        color === "gray"
    )
        return;

    if (
        key.classList.contains("yellow") &&
        color === "green"
    ) {
        key.classList.remove("yellow");
    }

    key.classList.remove("gray");

    key.classList.add(color);
}

//submits the users guess and compares with nathanfillion
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
        localStorage.setItem(
            "nathanfillionlePlayed",
            today
        );
        setTimeout(() => {
            alert("You win!");
        }, 200);
        return;
    }
    currentRow++;
    currentCol = 0;

    if (currentRow >= 3) {
        gameOver = true;
        localStorage.setItem(
            "nathanfillionlePlayed",
            today
        );
        setTimeout(() => {
            alert(`Game Over! The answer was ${answer}`);
        }, 200);
    }
}

// changes key colors based on if its in the word or no
function scoreGuess(guess) {
    for (let i = 0; i < 13; i++) {
        const tile = document.getElementById(
            `r${currentRow}c${i}`
        );
        const letter = guess[i];
    if (letter === answer[i]) {
        tile.classList.add("green");
        updateKey(letter, "green");
    }
    else if (answer.includes(letter)) {
        tile.classList.add("yellow");
        updateKey(letter, "yellow");
    }
    else {
        tile.classList.add("gray");
        updateKey(letter, "gray");
    }
    }
}