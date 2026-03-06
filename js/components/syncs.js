import { loadNav } from "./nav.js";

export async function loadSyncs() {
  const glowBox = document.querySelector(".glow-box");

  // Fjern kun tidligere syncs-indhold (ikke header/nav)
  const oldPage = glowBox.querySelector(".syncs-page");
  if (oldPage) oldPage.remove();

  // Ny container til syncs
  const page = document.createElement("div");
  page.classList.add("syncs-page");
  glowBox.appendChild(page);

  // Struktur med glow-bokse
  page.innerHTML = `
    <div class="syncs-wrapper">

      <div class="syncs-header-box">
        <h1 class="syncs-title">My syncs</h1>
        <p class="syncs-subtitle">Your active connections</p>
      </div>

      <div class="syncs-filter-box">
        <select class="syncs-filter-select" id="syncs-filter">
          <option value="all">All Units</option>
          <option value="Cleaner Unit">Cleaner Unit</option>
          <option value="Forge Unit">Forge Unit</option>
          <option value="Medic Unit">Medic Unit</option>
          <option value="Recon Unit">Recon Unit</option>
          <option value="Security Unit">Security Unit</option>
          <option value="Support Unit">Support Unit</option>
          <option value="Service Unit">Service Unit</option>
        </select>
      </div>

      <div class="syncs-grid-box">
        <div class="syncs-grid"></div>
      </div>

    </div>
  `;

  const grid = page.querySelector(".syncs-grid");
  const gridBox = page.querySelector(".syncs-grid-box");

  // Hent synced bots
  const syncedIds = JSON.parse(localStorage.getItem("syncedBots")) || [];

  // Hvis ingen synced bots → vis tom besked
  if (syncedIds.length === 0) {
    gridBox.classList.add("empty");

    grid.innerHTML = `
      <p class="syncs-empty-text">You have no synced robots yet.</p>
    `;

    loadNav();
    return;
  }

  // Hent robotdata
  const response = await fetch("./data/robots.json");
  const data = await response.json();

  const syncedBots = data.robots.filter((bot) => syncedIds.includes(bot.id));

  // Byg cards
  syncedBots.forEach((bot) => {
    const statusText = "Online";
    const statusColor = "#0CFF55";

    const card = document.createElement("div");
    card.classList.add("sync-card");
    card.setAttribute("data-unit", bot.unit_type);

    card.innerHTML = `
      <img class="sync-avatar" src="${bot.image}" alt="${bot.id}">
      <p class="sync-name">${bot.name}</p>
      <p class="sync-status" style="color:${statusColor};">${statusText}</p>
      <button class="sync-view-btn" data-id="${bot.id}">View sync</button>
    `;

    grid.appendChild(card);
  });

  // Filtrering
  document.getElementById("syncs-filter").addEventListener("change", (e) => {
    const value = e.target.value;
    document.querySelectorAll(".sync-card").forEach((card) => {
      const unitType = card.getAttribute("data-unit");
      if (value === "all" || unitType === value) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });

  // View sync → åbn syncrobotprofile
  grid.querySelectorAll(".sync-view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");

      localStorage.setItem("selectedRobot", id);
      localStorage.setItem("cameFromProfile", "yes");

      window.location.href = "syncrobotprofile.html";
    });
  });

  loadNav();
}
