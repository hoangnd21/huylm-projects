const path = location.pathname.includes("pages")
  ? "../components/header.html"
  : "components/header.html";

fetch(path)
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-container").innerHTML = data;

    fixLinks();
    initTheme();   
  });


/* ===== FIX LINK ===== */
function fixLinks() {
  const links = document.querySelectorAll("[data-link]");

  links.forEach(link => {
    const target = link.getAttribute("data-link");

    if (location.pathname.includes("pages")) {
      link.href = "../" + target;
    } else {
      link.href = target;
    }
  });
}

/* ===== DARK MODE ===== */
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