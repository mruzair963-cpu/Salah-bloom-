document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progress = document.querySelector("h3");
  const streak = document.querySelectorAll("h3")[1];
  const achievement = document.getElementById("achievement");
  const resetButton = document.getElementById("resetStreak");
  const duas = [
  "Allahumma a'inni ala dhikrika wa shukrika wa husni ibadatik.",
  "Rabbighfir li warhamni wa anta khairur rahimeen.",
  "Allahumma inni as'alukal jannah wa a'udhu bika minan naar."
];

const hadiths = [
  "The most beloved deeds to Allah are those done regularly, even if they are few.",
  "Cleanliness is half of faith.",
  "Allah does not look at your appearance, but at your hearts and deeds."
];

const duaBox = document.getElementById("dua");
const hadithBox = document.getElementById("hadith");

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
duaBox.innerHTML = duas[Math.floor(Math.random() * duas.length)];
hadithBox.innerHTML = hadiths[Math.floor(Math.random() * hadiths.length)];

  updateProgress();
});
