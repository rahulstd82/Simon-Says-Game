let gameSequence = [];
let playerSequence = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0; // Retrieve saved high score

let h2 = document.querySelector("h2");
let highScoreDisplay = document.createElement("h3");
highScoreDisplay.innerText = `High Score: ${highScore}`;
document.body.appendChild(highScoreDisplay);

// Start game on keypress
document.addEventListener("keypress", function () {
  if (!gameStarted) {
    gameStarted = true;
    level = 0;
    gameSequence = [];
    nextSequence();
  }
});

// Flash effect
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}

// Generate next sequence
function nextSequence() {
  playerSequence = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  let randomChosenButton = document.querySelector(`#${randomChosenColour}`);

  gameSequence.push(randomChosenColour);
  btnFlash(randomChosenButton);
}

// Handle button clicks
function btnClick() {
  let clickedButton = this;
  let clickedColour = clickedButton.id;
  playerSequence.push(clickedColour);

  btnFlash(clickedButton); // Flash effect on click
  checkAnswer(playerSequence.length - 1);
}

// Check player's input against game sequence
function checkAnswer(currentLevel) {
  if (playerSequence[currentLevel] === gameSequence[currentLevel]) {
    if (playerSequence.length === gameSequence.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    updateHighScore();
    h2.innerText = "Game Over! Press Any Key to Restart";
    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    gameStarted = false;
    gameSequence = [];
  }
}

// Update high score if the player sets a new record
function updateHighScore() {
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("highScore", highScore);  // Save high score
    highScoreDisplay.innerText = `High Score: ${highScore}`;
  }
}

// Add event listeners to buttons
let buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", btnClick);
});
