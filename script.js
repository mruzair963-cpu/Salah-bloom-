document.addEventListener("DOMContentLoaded", function () {

  // Elements
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progress = document.getElementById("progressText");
const streak = document.getElementById("streakText");
  const achievement = document.getElementById("achievement");
  const resetButton = document.getElementById("resetStreak");
  
// Today's Date

const todayDate = document.getElementById("todayDate");
  const hijriDate = document.getElementById("hijriDate");

const today = new Date();

todayDate.textContent = today.toLocaleDateString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});
  const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

fetch(`https://api.aladhan.com/v1/gToH/${day}-${month}-${year}`)
  .then(response => response.json())
  .then(data => {
    const hijri = data.data.hijri;

    hijriDate.textContent =
      `🌙 ${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
  })
  .catch(() => {
    hijriDate.textContent = "🌙 Hijri date unavailable";
  });
  
  // Update Progress & Streak
  function updateProgress() {
    let checked = 0;

    checkboxes.forEach((box, index) => {
      localStorage.setItem(`salah${index}`, box.checked.toString());

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
  (localStorage.getItem("streak") || 0) + " Days";
  }

  // Restore saved checkboxes
  // Daily Reset
const currentDay = new Date().toDateString();
const savedDate = localStorage.getItem("savedDate");

  if (savedDate !== currentDay) {

  checkboxes.forEach((box, index) => {
  localStorage.setItem(`salah${index}`, "false");
  box.checked = false;
});

  localStorage.setItem("savedDate", currentDay);
    achievement.textContent = "🌱 Keep growing your Salah habit!";
    progress.textContent = "0 / 5";
  }

// Restore saved checkboxes
checkboxes.forEach((box, index) => {

  box.checked = localStorage.getItem(`salah${index}`) === "true";

  box.addEventListener("change", updateProgress);

});

  // Reset streak
  resetButton.addEventListener("click", function () {

  if (confirm("Reset your streak?")) {

    localStorage.setItem("streak", 0);
    localStorage.removeItem("lastCompleted");

    updateProgress();

  }

});

  updateProgress();

});
