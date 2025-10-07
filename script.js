const mealTab = document.getElementById("meals-tab");
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
  showTab("meals-tab");
});

document.getElementById("stats").addEventListener("click", function() {
  showTab("stats-tab");
});

document.getElementById("news").addEventListener("click", function() {
  showTab("news-tab");
});

showTab("meals-tab");

const toggle = document.getElementById("toggleUI");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    // Turn ON glass mode
    document.querySelectorAll(".normal").forEach(el => {
      el.classList.remove("normal");
      el.classList.add("glass");
    });
  } else {
    // Turn OFF glass mode
    document.querySelectorAll(".glass").forEach(el => {
      el.classList.remove("glass");
      el.classList.add("normal");
    });
  }

  document.querySelectorAll(".card").forEach(el => {
  if (toggle.checked) {
      el.classList.add("glass");
  } else {
      el.classList.remove("glass");
  }
  });
});

const menuButton = document.querySelector(".menu-button");
const menuDropdown = document.querySelector(".menu-dropdown");

// Toggle dropdown on button click
menuButton.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent the click from reaching window
  menuDropdown.style.display = menuDropdown.style.display === "block" ? "none" : "block";
});

// Prevent clicks inside dropdown from closing it
menuDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Close dropdown when clicking outside
window.addEventListener("click", () => {
  menuDropdown.style.display = "none";
});

const navBar = document.getElementById("navBar");
navBar.classList.add("normal");

// Uncheck the toggle once
toggle.checked = false;

// const toggleBg = document.getElementById("toggleBg");
// const body = document.body;
//
// toggleBg.addEventListener("change", () => {
//   if (toggleBg.checked) {
//     // Turn ON fallback background
//       body.classList.remove("noBg");
//   } else {
//     // Turn OFF fallback background
//       body.classList.add("noBg");
//   }
// });
