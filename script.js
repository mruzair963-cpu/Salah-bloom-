document.addEventListener("DOMContentLoaded", function () {

  // Elements
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progress = document.querySelector(".card:nth-child(1) h3");
  const streak = document.querySelector(".card:nth-child(2) h3");
  const achievement = document.getElementById("achievement");
  const resetButton = document.getElementById("resetStreak");

  // Update Progress & Streak
  function updateProgress() {
    let checked = 0;

    checkboxes.forEach((box, index) => {
      localStorage.setItem("salah" + index, box.checked);

      if (box.checked) {
        checked++;
      }
    });

    progress.textContent = "📊 Progress: " + checked + "/5";

    let days = Number(localStorage.getItem("streak")) || 0;
const today = new Date().toDateString();
const lastCompleted = localStorage.getItem("lastCompleted");

if (checked === 5) {

  if (lastCompleted !== today) {
    days++;
    localStorage.setItem("streak", days);
    localStorage.setItem("lastCompleted", today);
  }

  achievement.textContent =
    "🏆 Achievement: Amazing! All Salah completed today!";

} else if (checked >= 3) {

  achievement.textContent =
    "🌸 Great job! You're making progress.";

} else {

  achievement.textContent =
    "🌱 Keep growing your Salah habit!";
}

streak.textContent =
  "🔥 Streak: " + (localStorage.getItem("streak") || 0) + " Days";
  }

  // Restore saved checkboxes
  checkboxes.forEach((box, index) => {
    box.checked = localStorage.getItem("salah" + index) === "true";

    box.addEventListener("change", updateProgress);
  });

  // Reset streak
  resetButton.addEventListener("click", function () {
    if (confirm("Reset your streak?")) {
      localStorage.setItem("streak", 0);
      streak.textContent = "🔥 Streak: 0 Days";
    }
  });

  updateProgress();

});
