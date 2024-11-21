document.getElementById("startButton").addEventListener("click", () => {
    const mapInput = document.getElementById("mapInput").value;
    if (mapInput.trim()) {
        initializeGame(mapInput);
    }
});

function initializeGame(mapInput) {
    const rows = mapInput.trim().split("\n").map(row => row.split(""));
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.style.display = "grid";
    gameBoard.style.gridTemplateColumns = `repeat(${rows[0].length}, 50px)`;
    
    gameBoard.innerHTML = ""; // Clear board before initializing
    rows.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const div = document.createElement("div");
            div.classList.add("cell", "hidden");
            if (cell === "I") {
                div.style.backgroundColor = "#ffc107"; // Bootstrap warning color (yellow)
                div.classList.add("robot");
            }
            if (cell === "F") div.style.backgroundColor = "#28a745"; // Bootstrap success color (green)
            div.dataset.type = cell;
            div.dataset.row = rowIndex;
            div.dataset.col = colIndex;
            gameBoard.appendChild(div);
        });
    });

    document.getElementById("toggleObstacles").style.display = "block";
    setUpControls(rows);
}

function setUpControls(map) {
    let robotPosition = findInitialPosition(map, "I");
    updateRobotPosition(robotPosition);

    document.addEventListener("keydown", (event) => {
        const keyMap = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
        const move = keyMap[event.key];
        if (move) {
            robotPosition = moveRobot(robotPosition, move, map);
            updateRobotPosition(robotPosition);
        }
    });
}

function findInitialPosition(map, type) {
    for (let i = 0; i < map.length; i++) {
        const colIndex = map[i].indexOf(type);
        if (colIndex !== -1) return [i, colIndex];
    }
    return null;
}

function moveRobot(position, move, map) {
    const [row, col] = position;
    const [dRow, dCol] = move;
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (newRow >= 0 && newRow < map.length && newCol >= 0 && newCol < map[0].length) {
        const cellType = map[newRow][newCol];
        if (cellType === "O" || cellType === "F") return [newRow, newCol];
        // Add logic for interactions with monsters and holes
    }
    return position;
}

function updateRobotPosition(position) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.remove("robot"));

    const robotCell = Array.from(cells).find(cell =>
        cell.dataset.row == position[0] && cell.dataset.col == position[1]
    );
    if (robotCell) robotCell.classList.add("robot");
}
