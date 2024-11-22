// script.js

const asciiData = [
  {
    art: `  ^__^
  (oo)\\_______
  (__)\\       )\\/\\
      ||----w |
      ||     ||`,
    answer: "cow",
    hint: "This animal produces milk.",
  },
  {
    art: `   /\\_/\\  
  ( o.o ) 
   > ^ <`,
    answer: "cat",
    hint: "It loves to purr.",
  },
  {
    art: `    .--.
   |o_o |
   |:_/ |
  //   \\ \\\\
 (|     | )
/'\\_   _/\\\`
\\___)=(___/`,
    answer: "robot",
    hint: "It can be programmed to work.",
  },
  {
    art: `
       _______
      /       \\
     /         \\
    /___________\\
    |    _      _|
    |[] | | [] | |
    |___|_|____|_|`,
    answer: "house",
    hint: "This is where people live.",
  },
  {
    art: `
      / \\__
    (    @\\____
    /         O
   /   (_____/
  /_____/   U`,
    answer: "dog",
    hint: "This loyal animal is often called 'man's best friend.'",
  },
];
let remainingQuestions = [...asciiData];
let score = 0;
let startTime = null;
let totalTime = 0;
let readyToReset = false;

const output = document.getElementById("output");
const userInput = document.getElementById("user-input");

function initializeGame() {
  currentQuestion = null;
  printToTerminal("Welcome to the ASCII Art Quiz Game!");
  printToTerminal("Press Enter to start.");
  remainingQuestions = [...asciiData];
  score = 0;
  startTime = null;
  totalTime = 0;
  readyToReset = false;
}

function printToTerminal(text) {
  const newLine = document.createElement("div");
  newLine.textContent = text;
  output.appendChild(newLine);
  output.scrollTop = output.scrollHeight;
}

function clearTerminal() {
  output.innerHTML = "";
}

function clearInput() {
  userInput.value = "";
}

function askQuestion() {
  if (remainingQuestions.length === 0) {
    endGame();
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  const question = remainingQuestions[randomIndex];
  remainingQuestions.splice(randomIndex, 1); // Remove the question to avoid repetition
  currentQuestion = question;

  printToTerminal("\nGuess this ASCII art:");
  printToTerminal(currentQuestion.art);
  printToTerminal("Your answer:");
  startTime = Date.now();
}

function handleInput(event) {
  if (event.key === "Enter") {
    const answer = userInput.value.trim().toLowerCase();

    if (readyToReset) {
      clearTerminal();
      initializeGame();
    } else if (!currentQuestion) {
      printToTerminal("Starting the quiz...");
      askQuestion();
    } else {
      const timeTaken = (Date.now() - startTime) / 1000; // Time in seconds
      totalTime += timeTaken;

      if (answer === currentQuestion.answer) {
        printToTerminal(
          `Correct! 🎉 Time taken: ${timeTaken.toFixed(2)} seconds.`,
        );
        score += Math.max(10 - Math.floor(timeTaken), 1); // Scoring penalizes slower answers
      } else {
        printToTerminal(`Wrong! Hint: ${currentQuestion.hint}`);
        return; // Let the user guess again
      }

      currentQuestion = null;
      askQuestion();
    }

    clearInput();
  }
}

function endGame() {
  readyToReset = true;
  printToTerminal("\nGame Over!");
  printToTerminal(`Final Score: ${score}`);
  printToTerminal(`Total Time: ${totalTime.toFixed(2)} seconds`);
  printToTerminal("Press Enter to Restart");
}

userInput.addEventListener("keydown", handleInput);

initializeGame();
