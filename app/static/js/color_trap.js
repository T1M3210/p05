const colorGrid = document.getElementById("color-grid");
const colorInstruction = document.getElementById("color-instruction");

let correctIndex = -1;
let guessCount = 0;

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return [r, g, b];
}

function generateColorGame() {
  colorGrid.innerHTML = "";
  guessCount = 0;

  const [targetR, targetG, targetB] = generateRandomColor();
  colorInstruction.textContent = `Click the color closest to RGB(${targetR}, ${targetG}, ${targetB})`;

  correctIndex = Math.floor(Math.random() * 16);

  for (let i = 0; i < 16; i++) {
    let r = targetR + Math.floor(Math.random() * 100) - 50;
    let g = targetG + Math.floor(Math.random() * 100) - 50;
    let b = targetB + Math.floor(Math.random() * 100) - 50;

    // Clamp values to 0-255
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    if (i === correctIndex) {
      r = targetR;
      g = targetG;
      b = targetB;
    }

    const square = document.createElement("div");
    square.className = "color-square";
    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    square.dataset.index = i;

    square.addEventListener("click", handleGuess);

    colorGrid.appendChild(square);
  }
}

function handleGuess(event) {
  const clickedIndex = parseInt(event.target.dataset.index);

  if (clickedIndex === correctIndex) {
    Array.from(colorGrid.children)[correctIndex].style.outline = "4px solid green";

    setTimeout(() => {
      window.location.href = "end";
    }, 1500);
  } else {
    guessCount++;
    if (guessCount < 3) {
      alert(`Wrong! You have ${3 - guessCount} guesses left.`);
    } else {
      Array.from(colorGrid.children)[correctIndex].style.outline = "4px solid green";

      setTimeout(() => {
        generateColorGame();
      }, 2500);
    }
  }
}

window.onload = generateColorGame;
