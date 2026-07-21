document.addEventListener("DOMContentLoaded", function () {

  // Elements
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progress = document.getElementById("progressText");
const streak = document.getElementById("streakText");
  const achievement = document.getElementById("achievement");
  const resetButton = document.getElementById("resetStreak");
  
// Today's Date

const todayDate = document.getElementById("todayDate");

const today = new Date();

todayDate.textContent = today.toLocaleDateString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});
  
  // Update Progress & Streak
  function updateProgress() {
    let checked = 0;

    checkboxes.forEach((box, index) => {
      localStorage.setItem("salah" + index, box.checked);

      if (box.checked) {
        checked++;
      }
    });

    progress.textContent = checked + " / 5";

    let days = Number(localStorage.getItem("streak")) || 0;
const currentDay = new Date().toDateString();
const lastCompleted = localStorage.getItem("lastCompleted");

if (checked === 5) {

  if (lastCompleted !== currentDay) {
    days++;
    localStorage.setItem("streak", days);
    localStorage.setItem("lastCompleted", currentDay);
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
  streak.textContent =
(localStorage.getItem("streak") || 0) + " Days";
  }

  // Restore saved checkboxes
  // Daily Reset
const currentDay = new Date().toDateString();
const savedDate = localStorage.getItem("savedDate");

  if (savedDate !== currentDay) {

  checkboxes.forEach((box, index) => {
    localStorage.setItem("salah" + index, false);
  });

  localStorage.setItem("savedDate", currentDay);
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
    localStorage.removeItem("lastCompleted");

    streak.textContent = "🔥 Streak: 0 Days";

  }

});

  updateProgress();

});
