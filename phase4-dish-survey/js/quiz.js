import { data } from "./index.js";

let currentId;

window.addEventListener("DOMContentLoaded", () => {
  if (!data) {
    console.error("Data not loaded!");
    return;
  }

  currentId = data.entry;
  loadQuestion();
});

function loadQuestion() {
  const q = data.survey[currentId];

  document.getElementById("question").innerText = q.question;
  document.getElementById("progress-bar").style.width =
    (q.step / 2) * 100 + "%";

  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt.label;
    btn.onclick = () => handleChoice(opt);
    optionsBox.appendChild(btn);
  });
}
function handleChoice(option) {
  if (option.next) {
    currentId = option.next;
    loadQuestion();
  } else if (option.outcome) {
    showResult(option.outcome);
  }
}

function showResult(protein) {
  const dish = data.dishes[protein];

  document.getElementById("quiz-box").classList.add("hidden");

  const result = document.getElementById("result");
  result.classList.remove("hidden");

  document.getElementById("dish-name").innerText = dish.name;
  document.getElementById("dish-desc").innerText = dish.rationale;
  document.getElementById("result-img").src = dish.image;
}

window.restartQuiz = function () {
  currentId = data.entry;
  step = 0;

  document.getElementById("quiz-box").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");

  document.getElementById("progress-bar").style.width = "0%";

  loadQuestion();
};

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("restart-btn");

  btn.addEventListener("click", () => {
    console.log("clicked"); 

    currentId = data.entry;

    document.getElementById("quiz-box").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");

    document.getElementById("progress-bar").style.width = "0%";

    loadQuestion();
  });
});