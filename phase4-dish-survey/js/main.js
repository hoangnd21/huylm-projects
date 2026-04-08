const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".fade-up, .fade-left, .fade-right")
  .forEach(el => observer.observe(el));
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  let scroll = window.scrollY;

  hero.style.backgroundPositionY = scroll * 0.5 + "px";
});

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    img.style.transformOrigin = `${x}px ${y}px`;
  });
});


