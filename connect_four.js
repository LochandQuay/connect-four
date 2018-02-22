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
    return alert('Invalid move');
  }
  
  while (this.board[col][i]) {
    i -= 1;
  }

  this.board[col][i] = this.currentPlayer;
  this.columns[col].children[i].style.background = this.currentPlayer;
  this.switchPlayers();
};

Game.prototype.switchPlayers = function () {
  this.currentPlayer = this.currentPlayer === 'red' ? 'blue' : 'red';
};

const game = new Game();

game.columns.forEach(col => {
  col.addEventListener('click', function (e) {
    return game.dropPeg(parseInt(col.dataset.column));
  });
});

const dropFields = document.querySelector('.drop-col');

dropFields.addEventListener('mouseover', function (e) {
  if (e.target.dataset.hcolumn) {
    const pegs = dropFields.querySelectorAll('div');
    pegs.forEach(function (peg) {
      peg.style.background = 'white';
      // return;
    });
    pegs[parseInt(e.target.dataset.hcolumn)]
      .style.background = game.currentPlayer;
  }
}, true);

dropFields.addEventListener('mouseout', function (e) {
  if (!e.toElement.dataset.hcolumn) {
    const pegs = dropFields.querySelectorAll('div');
    pegs.forEach(function (peg) {
      peg.style.background = 'white';
      return;
    });
  }
});

dropFields.addEventListener('click', function(e) {
  if (e.target.dataset.hcolumn) {
    return game.dropPeg(parseInt(e.target.dataset.hcolumn));
  }
});