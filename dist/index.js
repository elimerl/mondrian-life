import {Colors} from "./Colors.js";
import {Game} from "./GameOfLife.js";
const ctx = document.getElementById("canvas").getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const game = new Game(Array.from({length: Math.floor(window.innerWidth * 3 / 75)}, () => {
  return Array.from({length: Math.floor(window.innerHeight * 3 / 75)}, () => {
    return 0;
  });
}));
function set(x, y, v) {
  game.board[y][x] = v;
}
set(1, 0, 1);
set(2, 1, 1);
set(0, 2, 1);
set(1, 2, 1);
set(2, 2, 1);
const colors = Array.from({length: Math.floor(window.innerWidth * 3 / 75)}, () => {
  return Array.from({length: Math.floor(window.innerHeight * 3 / 75)}, () => {
    return sample([Colors.RED, Colors.BLUE, Colors.YELLOW, Colors.GREY]);
  });
});
setInterval(frame, 50);
let paused = false;
function frame() {
  if (!paused)
    game.step();
  ctx.fillStyle = Colors.WHITE;
  ctx.fillRect(0, 0, window.innerWidth * 3, window.innerHeight * 3);
  render();
}
function render() {
  game.board.forEach((row, y) => {
    ctx.fillStyle = "black";
    ctx.fillRect(y * 78 - 3, 0, 3, window.innerHeight * 3);
    ctx.fillStyle = "black";
    ctx.fillRect(0, y * 78 - 3, window.innerWidth * 3, 3);
    row.forEach((v, x) => {
      if (v === 1) {
        ctx.fillStyle = colors[y][x];
        ctx.fillRect(x * 78, y * 78, 75, 75);
      }
    });
  });
}
document.onkeydown = (ev) => {
  if (ev.key === "p") {
    paused = !paused;
  }
  if (ev.key === "s") {
    const a = document.createElement("a");
    a.download = "life.png";
    a.href = ctx.canvas.toDataURL();
    a.click();
  }
};
ctx.scale(1 / 3, 1 / 3);
