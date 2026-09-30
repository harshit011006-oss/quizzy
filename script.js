const questions = [
  {
    text: "What date did I confess to you that I liked you?",
    options: [
      "13 April, 2024",
      "12 April, 2024",
      "17 April, 2024",
      "13 March, 2024"
    ],
    answer: "13 April, 2024"
  },
  {
    text: "What was the second gift I gave you as my gf?",
    options: [
      "Ring",
      "Bracelet",
      "Necklace",
      "Watch"
    ],
    answer: "Ring"
  },
  {
    text: "What did we eat on our first date?",
    options: [
      "Chaamp",
      "Burger",
      "Gol Gappe",
      "Ras Malai"
    ],
    answer: "Chaamp"
  },
  {
    text: "What was the first nickname I gave you?",
    options: [
      "Madam ji",
      "Baby GIrl",
      "Cutie Pie",
      "Dumbo"
    ],
    answer: "Dumbo"
  },
  {
    text: "Where was our first normal kiss?",
    options: [
      "Mannat's Garden",
      "Rose Garden",
      "School parking",
      "Near Allen Road"
    ],
    answer: "Near Allen"
  },
  {
    text: "Where did we first hold our hands?",
    options: [
      "Rose Garden",
      "Verka Booth Park",
      "Company Garden",
      "Allen Park"
    ],
    answer: "Rose Garden"
  }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let locked = false;

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const questionView = document.getElementById("questionView");
const resultView = document.getElementById("resultView");
const scoreTitle = document.getElementById("scoreTitle");
const scoreText = document.getElementById("scoreText");
const scoreNumber = document.getElementById("scoreNumber");
const resultIcon = document.getElementById("resultIcon");
const restartBtn = document.getElementById("restartBtn");
const quizCard = document.getElementById("quizCard");
const hearts = document.getElementById("hearts");

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function loadQuestion() {
  locked = false;
  selectedOption = null;
  nextBtn.disabled = true;

  const item = questions[currentQuestion];

  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  question.textContent = item.text;
  options.innerHTML = "";

  shuffle(item.options).forEach((optionText, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.innerHTML = `<span class="letter">${String.fromCharCode(65 + index)}</span>${optionText}`;

    button.addEventListener("click", () => selectOption(button, optionText));
    options.appendChild(button);
  });

  questionView.classList.remove("pop");
  void questionView.offsetWidth;
  questionView.classList.add("pop");
}

function selectOption(button, value) {
  if (locked) return;

  document.querySelectorAll(".option").forEach((option) => {
    option.classList.remove("selected");
  });

  button.classList.add("selected");
  selectedOption = value;
  nextBtn.disabled = false;
}

function submitAnswer() {
  if (!selectedOption || locked) return;

  locked = true;

  const correctAnswer = questions[currentQuestion].answer;
  const isCorrect = selectedOption === correctAnswer;

  if (isCorrect) {
    score++;
    burstHearts(8);
  } else {
    quizCard.classList.add("shake");
    setTimeout(() => quizCard.classList.remove("shake"), 350);
  }

  nextBtn.disabled = true;

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 420);
}

function showResult() {
  questionView.classList.add("hidden");
  resultView.classList.remove("hidden");
  progressText.textContent = "All done ♡";
  progressBar.style.width = "100%";
  scoreNumber.textContent = score;

  if (score >= 5) {
    resultTitle.textContent = "Okay... you earned it. ♡";
    scoreText.textContent = "You can claim one gift before your birthday. Consider this your official permission slip.";
    resultIcon.textContent = "🎁";
    burstHearts(28);
  } else {
    resultTitle.textContent = "Behh wait till 12 now 😭";
    scoreText.textContent = "You know us... but not enough to unlock the early gift. Your birthday clock still has one job.";
    resultIcon.textContent = "⏳";
  }

  quizCard.classList.remove("pop");
  void quizCard.offsetWidth;
  quizCard.classList.add("pop");
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  questionView.classList.remove("hidden");
  resultView.classList.add("hidden");
  loadQuestion();
}

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

  const size = 10 + Math.random() * 15;
  const duration = 7 + Math.random() * 7;
  const left = Math.random() * 100;
  const drift = `${-60 + Math.random() * 120}px`;

  heart.style.left = `${left}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.setProperty("--drift", drift);

  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), duration * 1000);
}

function burstHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(createHeart, i * 35);
  }
}

const resultTitle = document.getElementById("scoreTitle");

nextBtn.addEventListener("click", submitAnswer);
restartBtn.addEventListener("click", restartQuiz);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !nextBtn.disabled) {
    submitAnswer();
  }
});

setInterval(() => {
  if (Math.random() > 0.2) createHeart();
}, 1200);

loadQuestion();
