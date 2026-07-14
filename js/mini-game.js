(function() {
    const boardElement = document.getElementById('gameBoard');
    const scoreVal = document.getElementById('score');
    const highscoreVal = document.getElementById('highscore');
    const overlay = document.getElementById('gameOverlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayDesc = document.getElementById('overlayDesc');
    const actionBtn = document.getElementById('actionBtn');

    let grid = [];
    let score = 0;
    let highscore = localStorage.getItem('neon2048_highscore') || 0;
    let gameActive = false;

    highscoreVal.innerText = highscore;
    actionBtn.addEventListener('click', startGame);
    const blockedKeys = ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    window.addEventListener('keydown', function(e) {
        if (gameActive && blockedKeys.includes(e.code)) {
            e.preventDefault();
        }
        if (!gameActive) return;

        let moved = false;
        switch(e.code) {
            case 'ArrowUp': case 'KeyW': moved = moveUp(); break;
            case 'ArrowDown': case 'KeyS': moved = moveDown(); break;
            case 'ArrowLeft': case 'KeyA': moved = moveLeft(); break;
            case 'ArrowRight': case 'KeyD': moved = moveRight(); break;
        }

        if (moved) {
            spawnTile();
            renderBoard();
            checkGameOver();
        }
    }, { passive: false });
    boardElement.addEventListener('touchmove', function(e) {
        if (gameActive) e.preventDefault();
    }, { passive: false });
    function startGame() {
        overlay.classList.add('hidden');
        gameActive = true;
        score = 0;
        scoreVal.innerText = score;
        grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];

        spawnTile();
        spawnTile();
        renderBoard();
    }

    function spawnTile() {
        let emptyCells = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (grid[r][c] === 0) emptyCells.push({r, c});
            }
        }
        if (emptyCells.length > 0) {
            let rand = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            grid[rand.r][rand.c] = Math.random() < 0.9 ? 2 : 4;
            grid[rand.r][rand.c] = { val: grid[rand.r][rand.c], isNew: true };
        }
    }

    function renderBoard() {
        boardElement.innerHTML = '';
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                let cellData = grid[r][c];
                let val = typeof cellData === 'object' ? cellData.val : cellData;
                let isNew = typeof cellData === 'object' ? cellData.isNew : false;
                if (typeof cellData === 'object') grid[r][c] = val;

                let div = document.createElement('div');
                div.className = 'tile';
                if (val > 0) {
                    div.setAttribute('data-value', val);
                    div.innerText = val;
                    if (isNew) div.classList.add('new');
                }
                boardElement.appendChild(div);
            }
        }
    }
    function slide(row) {
        let arr = row.filter(val => val > 0);
        let missing = 4 - arr.length;
        let zeros = Array(missing).fill(0);
        return arr.concat(zeros);
    }

    function combine(row) {
        for (let i = 0; i < 3; i++) {
            if (row[i] !== 0 && row[i] === row[i + 1]) {
                row[i] *= 2;
                row[i + 1] = 0;
                score += row[i];
                if (score > highscore) {
                    highscore = score;
                    highscoreVal.innerText = highscore;
                    localStorage.setItem('neon2048_highscore', highscore);
                }
            }
        }
        return row;
    }

    function moveLeft() {
        let moved = false;
        for (let r = 0; r < 4; r++) {
            let row = grid[r];
            let newRow = slide(combine(slide(row)));
            if (row.join(',') !== newRow.join(',')) {
                moved = true;
                grid[r] = newRow;
            }
        }
        scoreVal.innerText = score;
        return moved;
    }

    function moveRight() {
        let moved = false;
        for (let r = 0; r < 4; r++) {
            let row = grid[r];
            let reversedRow = row.slice().reverse();
            let newRow = slide(combine(slide(reversedRow))).reverse();
            if (row.join(',') !== newRow.join(',')) {
                moved = true;
                grid[r] = newRow;
            }
        }
        scoreVal.innerText = score;
        return moved;
    }

    function moveUp() {
        let moved = false;
        for (let c = 0; c < 4; c++) {
            let col = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
            let newCol = slide(combine(slide(col)));
            if (col.join(',') !== newCol.join(',')) {
                moved = true;
                for (let r = 0; r < 4; r++) grid[r][c] = newCol[r];
            }
        }
        scoreVal.innerText = score;
        return moved;
    }

    function moveDown() {
        let moved = false;
        for (let c = 0; c < 4; c++) {
            let col = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
            let reversedCol = col.slice().reverse();
            let newCol = slide(combine(slide(reversedCol))).reverse();
            if (col.join(',') !== newCol.join(',')) {
                moved = true;
                for (let r = 0; r < 4; r++) grid[r][c] = newCol[r];
            }
        }
        scoreVal.innerText = score;
        return moved;
    }
    function checkGameOver() {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (grid[r][c] === 0) return;
            }
        }
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 3; c++) {
                if (grid[r][c] === grid[r][c + 1]) return;
            }
        }
        for (let c = 0; c < 4; c++) {
            for (let r = 0; r < 3; r++) {
                if (grid[r][c] === grid[r + 1][c]) return;
            }
        }
        gameActive = false;
        overlayTitle.innerText = "ИГРА ОКОНЧЕНА";
        overlayTitle.style.color = "#fe019a";
        overlayTitle.style.textShadow = "0 0 10px rgba(254,1,154,0.5)";
        overlayDesc.innerHTML = `Твой счет: <strong style="color:#00f2fe;">${score}</strong>`;
        actionBtn.innerText = "ЗАНОВО";
        overlay.classList.remove('hidden');
    }
})();