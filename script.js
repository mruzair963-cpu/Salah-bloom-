document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progress = document.querySelector("h3");
  const streak = document.querySelectorAll("h3")[1];
  const achievement = document.getElementById("achievement");
  const resetButton = document.getElementById("resetStreak");

  function updateProgress() {
    let checked = 0;

    checkboxes.forEach((box, index) => {
      if (box.checked) checked++;
      localStorage.setItem("salah" + index, box.checked);
    });

    progress.innerHTML = "Progress: " + checked + "/5";

    if (checked === 5) {
      let days = Number(localStorage.getItem("streak")) || 0;
      days++;
      localStorage.setItem("streak", days);

      achievement.innerHTML =
        "🏆 Achievement: Amazing! All Salah completed today!";
    } else {
      achievement.innerHTML =
        "🌱 Achievement: Keep growing your Salah habit!";
    }

    streak.innerHTML =
      "🔥 Streak: " + (localStorage.getItem("streak") || 0) + " Days";
  }

  checkboxes.forEach((box, index) => {
    box.checked = localStorage.getItem("salah" + index) === "true";
    box.addEventListener("change", updateProgress);
  });

  updateProgress();
});
