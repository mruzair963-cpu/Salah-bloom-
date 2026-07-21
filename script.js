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


// =========================
// PRAYER TIMES SYSTEM
// =========================

let prayerTimings = {};


const fajr = document.getElementById("fajr");
const dhuhr = document.getElementById("dhuhr");
const asr = document.getElementById("asr");
const maghrib = document.getElementById("maghrib");
const isha = document.getElementById("isha");
const sunrise = document.getElementById("sunrise");

const currentPrayer = document.getElementById("currentPrayer");
const nextPrayer = document.getElementById("nextPrayer");



function loadPrayerTimes() {

  navigator.geolocation.getCurrentPosition(function(position) {

console.log("Location received");


    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;


    fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`)

    .then(response => response.json())

    .then(data => {


      const timings = data.data.timings;


      prayerTimings = {

        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha

      };


      if(fajr) fajr.textContent = timings.Fajr;
      if(dhuhr) dhuhr.textContent = timings.Dhuhr;
      if(asr) asr.textContent = timings.Asr;
      if(maghrib) maghrib.textContent = timings.Maghrib;
      if(isha) isha.textContent = timings.Isha;

      if(sunrise) sunrise.textContent = timings.Sunrise;


      updatePrayerStatus();


    });


  }, function(){


    if(fajr) fajr.textContent = "Location needed";
    if(dhuhr) dhuhr.textContent = "Location needed";
    if(asr) asr.textContent = "Location needed";
    if(maghrib) maghrib.textContent = "Location needed";
    if(isha) isha.textContent = "Location needed";


  });


}



function updatePrayerStatus(){


  if(Object.keys(prayerTimings).length === 0){
    return;
  }


  const now = new Date();


  let current = "Before Fajr";
  let next = "Fajr";


  const prayers = Object.entries(prayerTimings);



  for(let i = 0; i < prayers.length; i++){


    const prayerName = prayers[i][0];
    const prayerTime = prayers[i][1];


    const [hour, minute] = prayerTime.split(":");


    const time = new Date();

    time.setHours(hour);
    time.setMinutes(minute);
    time.setSeconds(0);



    if(now >= time){

      current = prayerName;


      if(i < prayers.length - 1){

        next = prayers[i + 1][0];

      } else {

        next = "Fajr (Tomorrow)";

      }

    }


  }



  if(currentPrayer){
    currentPrayer.textContent = current;
  }


  if(nextPrayer){
    nextPrayer.textContent = next;
  }


}



loadPrayerTimes();


setInterval(updatePrayerStatus,1000);
