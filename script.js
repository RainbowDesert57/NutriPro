const mealTab = document.getElementById("meal-tab");
const statTab = document.getElementById("stats-tab");

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('show'));
  document.getElementById(tabId).classList.add('show');
  if (statTab.classList.contains("show")) {
    console.log("Div visible");
  }
  if (!statTab.classList.contains("show")) {
    console.log("Div invisible");
  }
}

// Button Click

document.getElementById("meals").addEventListener("click", function() {
  showTab("meal-tab");
});

document.getElementById("stats").addEventListener("click", function() {
  showTab("stats-tab");
});

// Animations
// const buttons = document.querySelectorAll('.nav-button');
//
// buttons.forEach(btn => {
//   btn.addEventListener('mouseenter', () => {
//     btn.style.animation = 'navButtonOut 0.3s ease forwards';
//   });
//
//   btn.addEventListener('mouseleave', () => {
//     // wait for navButtonOut to finish
//     btn.addEventListener('animationend', function handler() {
//       btn.style.animation = 'navButtonIn 0.3s ease forwards';
//       btn.removeEventListener('animationend', handler); // remove listener
//     });
//   });
// });

