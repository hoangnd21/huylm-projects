const dishes = {
  steak: {
    img: "../assets/steak.jpg",
    title: "Grilled Ribeye",
    desc: "Juicy ribeye grilled to perfection."
  },
  shrimp: {
    img: "../assets/shrimp.jpg",
    title: "Garlic Shrimp",
    desc: "Fresh shrimp with garlic butter."
  },
  fish: {
    img: "../assets/fish.jpg",
    title: "Roasted Fish",
    desc: "Light roasted fish with herbs."
  },
  pork: {
    img: "../assets/pork.jpg",
    title: "Pork Chop",
    desc: "Tender pork with cider glaze."
  },
 
  salad: {
    img: "../assets/salad.jpg",
    title: "Salad",
    desc: "This salad is made with fresh ingredients for extra crunch"
  }
};

function openPopup(key) {
  const dish = dishes[key];
  document.getElementById("popup").classList.add("show");

  document.getElementById("popup-img").src = dish.img;
  document.getElementById("popup-title").innerText = dish.title;
  document.getElementById("popup-desc").innerText = dish.desc;
}

function closePopup() {
  document.getElementById("popup").classList.remove("show");
}

function outsideClick(e) {
  if (e.target.id === "popup") closePopup();
}

function filterDish(type) {
  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      type === "all" || card.dataset.type === type
        ? "block"
        : "none";
  });
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

let pos = 0;
const max = 2;

function slideRight() {
  pos--;
  if (pos < -max) pos = 0;
  document.getElementById("sliderTrack").style.transform =
    `translateX(${pos * 280}px)`;
}

function slideLeft() {
  pos++;
  if (pos > 0) pos = -max;
  document.getElementById("sliderTrack").style.transform =
    `translateX(${pos * 280}px)`;
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
});

document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));