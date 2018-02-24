function blankBoard () {
  return ([
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]]);
}

function Game () {
  this.board = blankBoard();

  this.columns = document.querySelectorAll('.col');
  this.currentPlayer = 'blue';
}

// Drop peg if valid move, otherwise alert and try again
Game.prototype.dropPeg = function (col) {
  let i = this.board[col].length - 1;
  if (this.board[col][0]) {
    alert('Invalid move');
    return false;
  }
  
  while (this.board[col][i]) {
    i -= 1;
  }

  this.board[col][i] = this.currentPlayer;
  this.columns[col].children[i].style.background = this.currentPlayer;

  if (this.gameWon()) {
    const player = this.currentPlayer;
    // Use event loop to ensure peg is dropped before alert is called
    setTimeout(function () {
      alert(player[0].toUpperCase() + player.slice(1) + ' wins!');
    }, 0);
    return;
  }
  this.switchPlayers();
  return true;
};

Game.prototype.switchPlayers = function () {
  this.currentPlayer = this.currentPlayer === 'red' ? 'blue' : 'red';
};

// Reset game
Game.prototype.reset = function () {
  this.board = blankBoard();
  this.currentPlayer = 'blue';

  document.querySelectorAll('.square').forEach(function (square) {
    square.style.background = 'white';
  });
};

// Win logic
Game.prototype.gameWon = function () {
  const board = this.board;
  const player = this.currentPlayer;

  function rowWin () {
    for (let row = 0; row < board[0].length; row++) {
      for (let i = 0; i <= board.length - 4; i++) {
        let test = [board[i][row], board[i + 1][row], board[i + 2][row], board[i + 3][row]];
        if (test.every(el => el === player)) {
          return true;
        }
      }
    }
    return false;
  }
  
  function colWin () {
    let win = false;
    board.forEach(function (row) {
      for (let i = 0; i <= row.length - 4; i++) {
        if (row.slice(i, i + 4).every(el => el === player)) {
          win = true;
          return;
        }
      }
    });
    return win;
  }

  function diagWin () {
    // Check [1, 1] deltas
    for (let i = 0; i <= board.length - 4; i++) {
      for (let j = 0; j <= board[i].length - 4; j++) {
        let test = [board[i][j], board[i + 1][j + 1], 
          board[i + 2][j + 2], board[i + 3][j + 3]];
        if (test.every(el => el === player)) {
          return true;
        }
      }
    }
    // Check [-1, 1] deltas
    for (let i = board.length - 1; i >= board.length - 4; i--) {
      for (let j = 0; j <= board[i].length - 4; j++) {
        let test = [board[i][j], board[i - 1][j + 1],
        board[i - 2][j + 2], board[i - 3][j + 3]];
        
        if (test.every(el => el === player)) {
          return true;
        }
      }
    }

    return false;
  }

  return rowWin() || colWin() || diagWin();
};

const game = new Game();
const dropFields = document.querySelector('.drop-col');
const pegs = dropFields.querySelectorAll('div');


// Drop peg on column click and show piece hover above column
game.columns.forEach(col => {
  col.addEventListener('click', function (e) {
    if (game.dropPeg(parseInt(col.dataset.column))) {
      pegs[parseInt(col.dataset.column)]
        .style.background = game.currentPlayer;
    }
  });

  col.addEventListener('mouseover', function (e) {
    pegs.forEach(function (peg) {
      peg.style.background = 'white';
    });
    pegs[parseInt(e.currentTarget.dataset.column)]
      .style.background = game.currentPlayer;
  });

  col.addEventListener('mouseout', function (e) {
    if (!e.toElement.dataset.column) {
      pegs.forEach(function (peg) {
        peg.style.background = 'white';
      });
    }
  });
});

// Show piece hover above column
dropFields.addEventListener('mouseover', function (e) {
  if (e.target.dataset.hcolumn) {
    pegs.forEach(function (peg) {
      peg.style.background = 'white';
    });
    pegs[parseInt(e.target.dataset.hcolumn)]
      .style.background = game.currentPlayer;
  }
}, true);

dropFields.addEventListener('mouseout', function (e) {
  if (!e.toElement.dataset.hcolumn) {
    pegs.forEach(function (peg) {
      peg.style.background = 'white';
    });
  }
});

// Drop peg on click above column
dropFields.addEventListener('click', function(e) {
  if (e.target.dataset.hcolumn) {
    if (game.dropPeg(parseInt(e.target.dataset.hcolumn))) {
      pegs[parseInt(e.target.dataset.hcolumn)]
        .style.background = game.currentPlayer;
    }
  }
});

document.getElementById('reset').addEventListener('click', function (e) {
  return game.reset();
});