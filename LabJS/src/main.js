document.addEventListener('DOMContentLoaded', () => {
  const gameMap = document.getElementById('gameMap');
  const startGame = document.getElementById('startGame');
  const gameBoard = document.getElementById('gameBoard');
  const toggleObstacles = document.getElementById('toggleObstacles');

  let boardData = [];
  let robotPosition = { x: 0, y: 0 };

  // Función para iniciar el juego
  startGame.addEventListener('click', () => {
    const mapInput = gameMap.value.trim();
    if (!mapInput) {
      alert('Por favor, ingresa un mapa válido.');
      return;
    }
    boardData = parseMap(mapInput);
    renderBoard();
    toggleObstacles.style.display = 'block';
  });

  // Función para alternar obstáculos
  toggleObstacles.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.toggle('hidden'));
    toggleObstacles.textContent =
        toggleObstacles.textContent === 'Mostrar obstáculos' ? 'Ocultar obstáculos' : 'Mostrar obstáculos';
  });

  // Función para interpretar el mapa
  function parseMap(map) {
    return map.split('\n').map(row => row.split(''));
  }

  // Función para renderizar el tablero
  function renderBoard() {
    gameBoard.innerHTML = ''; // Limpia el tablero
    boardData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const div = document.createElement('div');
        div.classList.add('cell', 'hidden');
        div.dataset.row = rowIndex;
        div.dataset.col = colIndex;

        // Establecer contenido inicial
        if (cell === 'I') {
          div.textContent = '🤖';
          div.classList.remove('hidden'); // Mostrar casilla inicial
        } else if (cell === 'F') {
          div.textContent = '🏁';
          div.classList.remove('hidden'); // Mostrar casilla final
        }

        gameBoard.appendChild(div);
      });
    });

    // Ajustar estilos para el tablero
    const columns = boardData[0].length;
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }

});
