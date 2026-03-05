import { loadNav } from "./nav.js";

export async function loadSyncRobotProfile() {
  const glowBox = document.querySelector(".glow-box");

  // Ryd alt gammelt indhold (undtagen header)
  glowBox
    .querySelectorAll(
      `
    .welcome-wrapper,
    .syncs-page,
    .profile-wrapper,
    .profile-wrapper-page,
    .swipe-view,
    .chat-wrapper,
    .syncprofile-page,
    .nav-wrapper
  `,
    )
    .forEach((el) => el.remove());

  glowBox.classList.remove("glow-profile");

  // Opret container
  const page = document.createElement("div");
  page.classList.add("syncprofile-page");
  glowBox.appendChild(page);

  page.innerHTML = `
    <div class="syncprofile-wrapper">

      <div class="syncprofile-topbox">

        <div class="syncprofile-imagebox">
          <img class="syncprofile-avatar" id="syncprofile-avatar">
        </div>

        <!-- NAVN -->
        <p class="syncprofile-name" id="syncprofile-name"></p>

        <!-- UNIT + VERSION (NYT FELT) -->
        <p class="syncprofile-unitline" id="syncprofile-unitline"></p>

        <div class="syncprofile-aboutbox">
          <p class="syncprofile-aboutlabel">About me:</p>
          <p id="syncprofile-about"></p>
        </div>

        <div class="syncprofile-tags">
          <div class="syncprofile-tag" id="syncprofile-unit"></div>
          <div class="syncprofile-tag" id="syncprofile-compatible"></div>
          <div class="syncprofile-tag" id="syncprofile-ai"></div>
        </div>

        <div class="syncprofile-statusbox">
          <p class="syncprofile-status" id="syncprofile-status"></p>
        </div>

        <div class="syncprofile-btnrow">
          <button class="syncprofile-btn" id="syncprofile-back">Go back</button>
          <button class="syncprofile-btn delete" id="syncprofile-delete">Delete sync</button>
          <button class="syncprofile-btn chat" id="syncprofile-chat">Chat</button>
        </div>

      </div>

    </div>
  `;

  // Hent valgt robot
  const selectedId = localStorage.getItem("selectedRobot");
  if (!selectedId) {
    window.location.href = "syncs.html";
    return;
  }

  const response = await fetch("./data/robots.json");
  const data = await response.json();
  const bot = data.robots.find((r) => r.id == selectedId);

  if (!bot) {
    window.location.href = "syncs.html";
    return;
  }

  // Fyld data ind
  document.getElementById("syncprofile-avatar").src = bot.image;

  // NAVN (LINJE 1)
  document.getElementById("syncprofile-name").textContent = bot.name;

  // UNIT + VERSION (LINJE 2)
  document.getElementById("syncprofile-unitline").textContent =
    `${bot.unit_type} - ${bot.version}`;

  // About me short
  document.getElementById("syncprofile-about").textContent = bot.about_me_short;

  // Separate tags
  document.getElementById("syncprofile-unit").textContent = bot.unit_type;
  document.getElementById("syncprofile-compatible").textContent =
    `Compatible: ${bot.compatible_with}`;
  document.getElementById("syncprofile-ai").textContent =
    `AI Level: ${bot.ai_level}`;

  // Status med linjeskift
  document.getElementById("syncprofile-status").innerHTML =
    `Status: Sync Ready<br>RoboLove v2.8 – Secure Match Protocol`;

  // Knapper
  document.getElementById("syncprofile-back").addEventListener("click", () => {
    window.location.href = "syncs.html";
  });

  document
    .getElementById("syncprofile-delete")
    .addEventListener("click", () => {
      let syncs = JSON.parse(localStorage.getItem("syncedBots")) || [];
      syncs = syncs.filter((id) => id !== bot.id);
      localStorage.setItem("syncedBots", JSON.stringify(syncs));
      window.location.href = "syncs.html";
    });

  document.getElementById("syncprofile-chat").addEventListener("click", () => {
    window.location.href = "chat.html";
  });

  loadNav();
}
