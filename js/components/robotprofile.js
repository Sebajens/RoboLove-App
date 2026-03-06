import { loadNav } from "./nav.js";
// henter navigationen fra en anden fil

export async function loadRobotProfile() {
  const glowBox = document.querySelector(".glow-box");
  // finder boksen der holder hele indholdet

  // FIX: Denne linje er flyttet herned, så den kun kører på robotprofile-siden
  glowBox.classList.add("glow-profile");
  // gør glow-boksen større på denne side

  const page = document.createElement("div");
  page.classList.add("profile-wrapper-page");
  glowBox.appendChild(page);
  // laver en ny container inde i glowBox hvor alt skal vises

  const selectedId = localStorage.getItem("selectedRobot");
  // henter ID'et på den robot man klikkede på i swipe-siden

  if (!selectedId) {
    // hvis ingen robot er valgt → vis besked
    page.innerHTML = `
      <p style="color:white; text-align:center; margin-top:20px;">
        No robot selected.
      </p>
    `;
    loadNav();
    return;
  }

  const response = await fetch("./data/robots.json");
  const data = await response.json();
  // henter JSON-filen og laver den om til JavaScript

  const bot = data.robots.find((r) => r.id == selectedId);
  // finder robotten i JSON der matcher det valgte ID

  if (!bot) {
    // hvis robotten ikke findes → vis fejl
    page.innerHTML = `
      <p style="color:white; text-align:center; margin-top:20px;">
        Robot not found.
      </p>
    `;
    loadNav();
    return;
  }

  // ABOUT ME – laver p-tags ud fra arrayet
  let formattedAbout = "";

  if (Array.isArray(bot.about_me_long)) {
    formattedAbout = bot.about_me_long
      .map((p) => `<p class="profile-about-text">${p}</p>`)
      .join("");
  } else {
    formattedAbout = `<p class="profile-about-text">${bot.about_me_long}</p>`;
  }

  // laver hele HTML'en for profilen
  page.innerHTML = `
    <div class="profile-wrapper">

      <div class="profile-top-box">

        <div class="profile-image-box">
          <img class="profile-avatar" src="${bot.image}" alt="${bot.id}">
        </div>

        <p class="profile-name-main">${bot.name}</p>
        <p class="profile-name-sub">${bot.unit_type} - ${bot.version}</p>

        <div class="profile-about-box">
          <p class="profile-about-label">About me:</p>
          ${formattedAbout}
        </div>

        <div class="profile-tags">
          <div class="profile-tag">${bot.unit_type}</div>
          <div class="profile-tag">Compatible:<br>${bot.compatible_with}</div>
          <div class="profile-tag">AI Level:<br>${bot.ai_level}</div>
        </div>

        <div class="profile-status-box">
          <p class="profile-status">
            <strong>Status:</strong> ${bot.status}<br>
            RoboLove v2.8 - Secure Match Protocol
          </p>
        </div>

        <div class="profile-about-box">
          <p class="profile-about-label">Interests:</p>
          <p class="profile-about-text">
            ${
              bot.interests && bot.interests.length > 0
                ? bot.interests.join("<br>")
                : "No interests listed."
            }
          </p>
        </div>

        <div class="profile-sync-row">
          <button class="profile-decline" id="decline-btn">
            Decline Sync
            <span class="sync-icon">✖</span>
          </button>

          <button class="profile-decline" id="go-back-btn">
            Go back
          </button>

          <button class="profile-sync" id="sync-btn">
            Initiate Sync
            <span class="sync-icon">❤</span>
          </button>
        </div>
        
      </div>

    </div>
  `;

  // Funktion der markerer at vi kommer FRA en profil
  function goBackToSwipe() {
    localStorage.setItem("cameFromProfile", "yes");
    window.location.href = "swipe.html";
  }

  // Decline → tilbage til swipe
  document
    .getElementById("decline-btn")
    .addEventListener("click", goBackToSwipe);

  // Go back → tilbage til swipe (uden at gemme)
  document
    .getElementById("go-back-btn")
    .addEventListener("click", goBackToSwipe);

  // Initiate Sync → gem robot → tilbage til swipe
  document.getElementById("sync-btn").addEventListener("click", () => {
    let syncs = JSON.parse(localStorage.getItem("syncedBots")) || [];

    if (!syncs.includes(bot.id)) {
      syncs.push(bot.id);
      localStorage.setItem("syncedBots", JSON.stringify(syncs));
    }

    goBackToSwipe();
  });

  loadNav();
  // loader navigationen nederst på siden
}
