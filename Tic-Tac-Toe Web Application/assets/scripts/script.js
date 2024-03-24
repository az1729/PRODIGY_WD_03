let currentPlayer = 'X';
        let board = Array(9).fill('');
        let twoPlayersMode = true;

        function chooseTwoPlayers() {
            twoPlayersMode = true;
            startGame();
        }

        function chooseWithComputer() {
            twoPlayersMode = false;
            startGame();
        }

        function startGame() {
            currentPlayer = 'X';
            board = Array(9).fill('');
            hideWinnerPopup();
            renderBoard();
            if (!twoPlayersMode && currentPlayer === 'O') {
                makeComputerMove();
            }
        }

        function handleClick(index) {
            if (board[index] === '' && !checkWinner() && !checkDraw()) {
                board[index] = currentPlayer;
                renderBoard();
                if (checkWinner()) {
                    displayWinnerPopup();
                } else if (checkDraw()) {
                    displayDrawPopup();
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    if (!twoPlayersMode && currentPlayer === 'O') {
                        makeComputerMove();
                    }
                }
            }
        }

        function makeComputerMove() {
            const emptyCells = board.reduce((acc, cell, index) => (cell === '' ? [...acc, index] : acc), []);
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            setTimeout(() => handleClick(randomIndex), 500);
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6] // diagonals
            ];

            return winningCombinations.some(combination => {
                const [a, b, c] = combination;
                return board[a] && board[a] === board[b] && board[a] === board[c];
            });
        }

        function checkDraw() {
            return board.every(cell => cell !== '');
        }

        function renderBoard() {
            const boardContainer = document.getElementById('board');
            boardContainer.innerHTML = '';

            for (let i = 0; i < board.length; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.textContent = board[i];
                cell.addEventListener('click', () => handleClick(i));
                boardContainer.appendChild(cell);
            }
        }

        function displayWinnerPopup() {
            const winnerPopup = document.getElementById('winner-popup');
            const winnerMessage = document.getElementById('winner-message');
            winnerMessage.textContent = `Player ${currentPlayer} wins!`;
            winnerPopup.style.display = 'block';
        }

        function displayDrawPopup() {
            const winnerPopup = document.getElementById('winner-popup');
            const winnerMessage = document.getElementById('winner-message');
            winnerMessage.textContent = "It's a draw!";
            winnerPopup.style.display = 'block';
        }

        function hideWinnerPopup() {
            const winnerPopup = document.getElementById('winner-popup');
            winnerPopup.style.display = 'none';
        }

        function resetGame() {
            startGame();
        }