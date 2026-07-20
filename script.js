document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progress = document.querySelector("h3");
  const streak = document.querySelectorAll("h3")[1];

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
    }

    streak.innerHTML =
      "🔥 Streak: " + (localStorage.getItem("streak") || 0);
  }

  checkboxes.forEach((box, index) => {
    box.checked = localStorage.getItem("salah" + index) === "true";
    box.addEventListener("change", updateProgress);
  });

  updateProgress();
});
