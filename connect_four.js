function Game () {
  this.board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]];

  this.columns = document.querySelectorAll('.col');
  this.currentPlayer = 'blue';
}

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
  this.switchPlayers();
  return true;
};

Game.prototype.switchPlayers = function () {
  this.currentPlayer = this.currentPlayer === 'red' ? 'blue' : 'red';
};

const game = new Game();
const dropFields = document.querySelector('.drop-col');
const pegs = dropFields.querySelectorAll('div');

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

dropFields.addEventListener('click', function(e) {
  if (e.target.dataset.hcolumn) {
    if (game.dropPeg(parseInt(e.target.dataset.hcolumn))) {
      pegs[parseInt(e.target.dataset.hcolumn)]
        .style.background = game.currentPlayer;
    }
  }
});