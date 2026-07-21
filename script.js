document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // ELEMENTS
  // =========================

  const todayDate = document.getElementById("todayDate");
  const hijriDate = document.getElementById("hijriDate");

  const screens = document.querySelectorAll(".screen");


  // =========================
  // DATE
  // =========================

  const today = new Date();

  if (todayDate) {
    todayDate.textContent = today.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }


  // =========================
  // HIJRI DATE
  // =========================

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  fetch(`https://api.aladhan.com/v1/gToH/${day}-${month}-${year}`)
    .then(response => response.json())
    .then(data => {

      const hijri = data.data.hijri;

      if (hijriDate) {
        hijriDate.textContent =
          `🌙 ${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
      }

    })
    .catch(() => {

      if (hijriDate) {
        hijriDate.textContent =
          "🌙 Hijri date unavailable";
      }

    });


});


// =========================
// SCREEN NAVIGATION
// =========================

function showScreen(screenId) {

  const screens = document.querySelectorAll(".screen");

  screens.forEach(screen => {
    screen.classList.remove("active");
  });


  const target = document.getElementById(screenId);

  if (target) {
    target.classList.add("active");
  }

    }
