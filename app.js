const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const computerChoiceText = document.querySelector("#computer-choice");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const winsPara = document.querySelector("#wins");
const lossesPara = document.querySelector("#losses");
const drawsPara = document.querySelector("#draws");
const lastUserChoice = document.querySelector("#last-user-choice");
const lastComputerChoice = document.querySelector("#last-computer-choice");
const lastResult = document.querySelector("#last-result");
const resetBtn = document.querySelector("#reset-btn");
const themeToggle = document.querySelector("#theme-toggle");

let userScore = 0;
let compScore = 0;

let wins = 0;
let losses = 0;
let draws = 0;

const loadData = () => {
  const storedData = JSON.parse(localStorage.getItem("rpsData"));
  if (!storedData) return;
  userScore = storedData.userScore || 0;
  compScore = storedData.compScore || 0;
  wins = storedData.wins || 0;
  losses = storedData.losses || 0;
  draws = storedData.draws || 0;
  updateUI();
};

const saveData = () => {
  localStorage.setItem(
    "rpsData",
    JSON.stringify({
      userScore,
      compScore,
      wins,
      losses,
      draws,
    }),
  );
};

const updateUI = () => {
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  winsPara.innerText = wins;
  lossesPara.innerText = losses;
  drawsPara.innerText = draws;
};

const generateComputerChoice = () => {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

const handleDraw = (userChoice, computerChoice) => {
  draws++;
  msg.innerText = "🤝 It's a Draw!";
  msg.style.backgroundColor = "#f39c12";
  computerChoiceText.innerText = `Computer chose: ${computerChoice}`;
  lastUserChoice.innerText = userChoice;
  lastComputerChoice.innerText = computerChoice;
  lastResult.innerText = "Draw 🤝";
  updateUI();
  saveData();
};

const showWinner = (userWin, userChoice, computerChoice) => {
  computerChoiceText.innerText = `Computer chose: ${computerChoice}`;
  lastUserChoice.innerText = userChoice;
  lastComputerChoice.innerText = computerChoice;
  if (userWin) {
    userScore++;
    wins++;
    msg.innerText = `🎉 You Won! ${userChoice} beats ${computerChoice}`;
    msg.style.backgroundColor = "#27ae60";
    lastResult.innerText = "You Won 🎉";
  } else {
    compScore++;
    losses++;
    msg.innerText = `😢 You Lost! ${computerChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "#e74c3c";
    lastResult.innerText = "Computer Won 💻";
  }
  updateUI();
  saveData();
};

const playGame = (userChoice) => {
  const computerChoice = generateComputerChoice();
  if (userChoice === computerChoice) {
    handleDraw(userChoice, computerChoice);
    return;
  }
  let userWin = true;
  if (userChoice === "Rock") {
    userWin = computerChoice === "Scissors";
  } else if (userChoice === "Paper") {
    userWin = computerChoice === "Rock";
  } else {
    userWin = computerChoice === "Paper";
  }
  showWinner(userWin, userChoice, computerChoice);
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  wins = 0;
  losses = 0;
  draws = 0;
  updateUI();
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  computerChoiceText.innerText = "Computer chose: ?";
  lastUserChoice.innerText = "-";
  lastComputerChoice.innerText = "-";
  lastResult.innerText = "-";
  localStorage.removeItem("rpsData");
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.innerText = "☀️ Light Mode";
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  if (isDark) {
    themeToggle.innerText = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.innerText = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

loadData();
updateUI();
