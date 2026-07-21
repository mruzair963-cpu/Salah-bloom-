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
  const fajr = document.getElementById("fajr");
const dhuhr = document.getElementById("dhuhr");
const asr = document.getElementById("asr");
const maghrib = document.getElementById("maghrib");
const isha = document.getElementById("isha");
  let prayerTimings = {};
  const sunrise = document.getElementById("sunrise");
const currentPrayer = document.getElementById("currentPrayer");
const nextPrayer = document.getElementById("nextPrayer");
  const duaTitle = document.getElementById("duaTitle");
const duaArabic = document.getElementById("duaArabic");
const duaEnglish = document.getElementById("duaEnglish");
const duaUrdu = document.getElementById("duaUrdu");
const duaSource = document.getElementById("duaSource");
const shareDua = document.getElementById("shareDua");
const favoriteDua = document.getElementById("favoriteDua");

const today = new Date();
  const duas = [

{
title: "Morning Dua",

arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",

english: "O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection.",

urdu: "اے اللہ! تیرے ہی نام سے ہم نے صبح کی، تیرے ہی نام سے شام کرتے ہیں، تیرے ہی نام سے جیتے ہیں، تیرے ہی نام سے مرتے ہیں اور تیری ہی طرف دوبارہ اٹھائے جائیں گے۔",

source: "Jami' at-Tirmidhi 3391"
},

{
title: "Seeking Forgiveness",

arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",

english: "My Lord, forgive me and accept my repentance. Surely You are the Accepting of Repentance, the Most Merciful.",

urdu: "اے میرے رب! مجھے بخش دے اور میری توبہ قبول فرما، بے شک تو بہت توبہ قبول کرنے والا، نہایت رحم کرنے والا ہے۔",

source: "Sunan Abu Dawood 1516"
},

{
title: "Increase Me in Knowledge",

arabic: "رَبِّ زِدْنِي عِلْمًا",

english: "My Lord, increase me in knowledge.",

urdu: "اے میرے رب! میرے علم میں اضافہ فرما۔",

source: "Surah Taha 20:114"
}

];
  const randomDua = duas[Math.floor(Math.random() * duas.length)];

if (duaTitle) {
  duaTitle.textContent = "🤲 " + randomDua.title;
}

if (duaArabic) {
  duaArabic.textContent = randomDua.arabic;
}

if (duaEnglish) {
  duaEnglish.textContent = randomDua.english;
}

if (duaUrdu) {
  duaUrdu.textContent = randomDua.urdu;
}

if (duaSource) {
  duaSource.textContent = "📚 " + randomDua.source;
}
  if (shareDua) {

  shareDua.addEventListener("click", function () {

    const text =
`${randomDua.title}

${randomDua.arabic}

${randomDua.english}

${randomDua.urdu}

📚 ${randomDua.source}`;

    if (navigator.share) {
      navigator.share({
        title: "Daily Dua",
        text: text
      });
    } else {
      alert("Sharing is not supported on this device.");
    }

  });

  }
  if (favoriteDua) {

  favoriteDua.addEventListener("click", function () {

    localStorage.setItem("favoriteDua", JSON.stringify(randomDua));

    alert("❤️ Dua added to favorites!");

  });

  }

if(todayDate){

todayDate.textContent = today.toLocaleDateString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
});
}
  
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
        hijriDate.textContent = "🌙 Hijri date unavailable";
    }

  });
  navigator.geolocation.getCurrentPosition(function(position){

const latitude = position.coords.latitude;
const longitude = position.coords.longitude;

fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`)
.then(response => response.json())
.then(data=>{

const timings = data.data.timings;

prayerTimings = {
  Fajr: timings.Fajr,
  Dhuhr: timings.Dhuhr,
  Asr: timings.Asr,
  Maghrib: timings.Maghrib,
  Isha: timings.Isha
};

if (sunrise) sunrise.textContent = timings.Sunrise;

if (fajr) fajr.textContent = timings.Fajr;
if (dhuhr) dhuhr.textContent = timings.Dhuhr;
if (asr) asr.textContent = timings.Asr;
if (maghrib) maghrib.textContent = timings.Maghrib;
if (isha) isha.textContent = timings.Isha;

});

},function(){

if (fajr) fajr.textContent = "Location needed";
if (dhuhr) dhuhr.textContent = "Location needed";
if (asr) asr.textContent = "Location needed";
if (maghrib) maghrib.textContent = "Location needed";
if (isha) isha.textContent = "Location needed";

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
  if(resetButton){

  resetButton.addEventListener("click", function () {

    if (confirm("Reset your streak?")) {

      localStorage.setItem("streak", 0);
      localStorage.removeItem("lastCompleted");

      updateProgress();

    }

  });

  }
  function updatePrayerStatus(){

  if(Object.keys(prayerTimings).length === 0){
    return;
  }

  const now = new Date();

  let current = "Before Fajr";
  let next = "Fajr";

  let prayers = Object.entries(prayerTimings);

  for(let i = 0; i < prayers.length; i++){

    let prayerName = prayers[i][0];
    let prayerTime = prayers[i][1];

    let [hour, minute] = prayerTime.split(":");

    let time = new Date();

    time.setHours(hour);
    time.setMinutes(minute);
    time.setSeconds(0);


    if(now >= time){
      current = prayerName;

      if(i < prayers.length - 1){
        next = prayers[i + 1][0];
      }
      else{
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


updatePrayerStatus();

setInterval(updatePrayerStatus,1000);

updateProgress();

});
// Screen Navigation

function showScreen(screenId) {

  const screens = document.querySelectorAll(".screen");

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");

}


