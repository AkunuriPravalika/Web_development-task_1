// Select elements
const colorButtons = document.querySelectorAll(".color-btn");
const randomBtn = document.getElementById("randomColor");
const themeBtn = document.getElementById("themeBtn");

// Predefined color buttons
colorButtons.forEach(btn => {
  btn.style.backgroundColor = btn.dataset.color;
  btn.addEventListener("click", () => {
    document.body.style.background = btn.dataset.color;
  });
});

// Random color generator
randomBtn.addEventListener("click", () => {
  const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  document.body.style.background = randomColor;
});

// Dark/Light mode toggle
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️ Light Mode";
  } else {
    themeBtn.textContent = "🌙 Dark Mode";
  }
});
