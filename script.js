document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progress = document.querySelector("h3");
  const streak = document.querySelectorAll("h3")[1];
  const achievement = document.getElementById("achievement");
  const resetButton = document.getElementById("resetStreak");
  

const duaBox = document.getElementById("dua");
const hadithBox = document.getElementById("hadith");
  async function loadDailyDhikr() {
  try {
    const response = await fetch("https://api.islamic.app/v1/dhikr/morning");
    const result = await response.json();

    if (result.data && result.data.length > 0) {
      const random =
        result.data[Math.floor(Math.random() * result.data.length)];

      duaBox.innerHTML =
        "<strong>Arabic:</strong><br>" +
        random.arabic +
        "<br><br><strong>English:</strong><br>" +
        random.translation;
    }
  } catch (error) {
    duaBox.innerHTML =
      "Unable to load today's dua. Please check your internet connection.";
  }
  }

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

resetButton.addEventListener("click", function () {
  localStorage.setItem("streak", 0);
  streak.innerHTML = "🔥 Streak: 0 Days";
});
loadDailyDhikr();

  updateProgress();
});
