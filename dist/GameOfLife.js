export class Game {
  constructor(board) {
    this.board = board;
  }
  step() {
    this.board = this.board.map((row, cellY) => {
      return row.map((cell, cellX) => {
        let numberOfLiveNeighbours = 0;
        for (let y = cellY - 1; y <= cellY + 1; y++) {
          for (let x = cellX - 1; x <= cellX + 1; x++) {
            if (y === cellY && x === cellX)
              continue;
            numberOfLiveNeighbours += this.board?.[y]?.[x] || 0;
          }
        }
        if (cell && [2, 3].includes(numberOfLiveNeighbours))
          return 1;
        if (!cell && numberOfLiveNeighbours === 3)
          return 1;
        return 0;
      });
    });
  }
}
