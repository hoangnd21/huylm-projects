const currentPath = location.pathname.toLowerCase();

const isSubPage =
  currentPath.includes("/staff/") ||
  currentPath.includes("/finance/") ||
  currentPath.includes("/portfolio/") ||
  currentPath.includes("/quiz/") ||
  currentPath.includes("/weather/") ||
  currentPath.includes("/phase4-dish-survey/");

const headerPath = isSubPage
  ? "../components/header.html"
  : "./components/header.html";

fetch(headerPath)
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header-container").innerHTML = data;

    fixLinks();
    initTheme();
  });

function fixLinks() {
  const links = document.querySelectorAll("[data-link]");

  links.forEach((link) => {
    const target = link.dataset.link;

    if (isSubPage) {
      link.href = "../" + target;
    } else {
      link.href = target;
    }
  });
}

function initTheme() {
  const btn = document.getElementById("themeToggle");

  if (!btn) return;

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    btn.innerText = "☀️";
  }

  btn.onclick = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      btn.innerText = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      btn.innerText = "🌙";
    }
  };
}

function initTheme() {
  const btn = document.getElementById("themeToggle");

  if (!btn) return;

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    btn.innerText = "☀️";
  }

  btn.onclick = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      btn.innerText = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      btn.innerText = "🌙";
    }
  };
}
function initTheme() {
  const btn = document.getElementById("themeToggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    btn.innerText = "☀️";
  }

  btn.onclick = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      btn.innerText = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      btn.innerText = "🌙";
    }
  };
}