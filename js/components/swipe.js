import { loadNav } from "./nav.js";

export async function loadSwipe() {
  // Finder glow-box containeren (hele UI-rammen)
  const glowBox = document.querySelector(".glow-box");

  // Henter robotdata fra JSON-filen
  const response = await fetch("../data/robots.json");
  const data = await response.json();

  // Fjerner S-47 fra swipe-listen
  const robots = data.robots.filter((bot) => bot.id != "S-47");

  // Tjek om vi kommer fra robotprofile-siden
  const cameFromProfile = localStorage.getItem("cameFromProfile");

  // Reshuffle KUN hvis vi IKKE kommer fra en profil
  if (!cameFromProfile) {
    robots.sort(() => Math.random() - 0.5);
  }

  // Slet markøren igen (så næste gang virker korrekt)
  localStorage.removeItem("cameFromProfile");

  // Henter sidste position (så man ikke starter forfra når man går tilbage)
  let index = Number(localStorage.getItem("swipeIndex")) || 0;

  function renderBot() {
    const bot = robots[index];

    // Fjerner gammel profil fra glow-box
    const oldProfile = glowBox.querySelector(".profile-wrapper");
    if (oldProfile) oldProfile.remove();

    // Fjerner gammel navigation (ellers hopper den op i toppen)
    const oldNav = glowBox.querySelector(".nav-wrapper");
    if (oldNav) oldNav.remove();

    // Hvis vi er nået til slutningen → reshuffle + start forfra
    if (!bot) {
      robots.sort(() => Math.random() - 0.5); // ny rækkefølge
      index = 0; // start forfra
      localStorage.setItem("swipeIndex", index);
      return renderBot(); // vis første i ny rækkefølge
    }

    // Opretter selve swipe-profilen
    const wrapper = document.createElement("div");
    wrapper.classList.add("profile-wrapper", "swipe-view");

    wrapper.innerHTML = `
      <div class="profile-top-box">

        <!-- Robot billede -->
        <div class="profile-image-box">
          <img class="profile-avatar" src="${bot.image}" alt="${bot.id}">
        </div>

        <!-- Navn + ikon til fuld profil -->
        <div class="swipe-name-row">
          <p class="swipe-name">${bot.name}</p>
          <button class="swipe-icon" data-id="${bot.id}">
            <img src="https://img.icons8.com/?size=100&id=10424&format=png&color=ffffff" class="swipe-icon-img">
          </button>
        </div>

        <!-- Unit type + version -->
        <p class="swipe-sub">${bot.unit_type} - ${bot.version}</p>

        <!-- Kort about me -->
        <div class="profile-about-box">
          <p class="profile-about-label">About me:</p>
          <p class="profile-about-text">${bot.about_me_short}</p>
        </div>

        <!-- Tags -->
        <div class="profile-tags">
          <div class="profile-tag">${bot.unit_type}</div>
          <div class="profile-tag">Compatible:<br>${bot.compatible_with}</div>
          <div class="profile-tag">AI Level:<br>${bot.ai_level}</div>
        </div>

        <!-- Status -->
        <div class="profile-status-box">
          <p class="profile-status">
            <strong>Status:</strong> ${bot.status}<br>
            RoboLove v2.8 - Secure Match Protocol
          </p>
        </div>

        <!-- Sync knapper -->
        <div class="swipe-sync-row">
          <button class="swipe-decline">
            Decline Sync
            <span class="sync-icon">✖</span>
          </button>

          <button class="swipe-sync">
            Initiate Sync
            <span class="sync-icon">❤</span>
          </button>
        </div>
      </div>
    `;

    // Klik på ikon → åbner fuld profil
    wrapper.querySelector(".swipe-icon").addEventListener("click", () => {
      // Gemmer hvilken robot man var på
      localStorage.setItem("selectedRobot", bot.id);

      // Gemmer swipe-positionen
      localStorage.setItem("swipeIndex", index);

      // Markér at vi kommer FRA en profil
      localStorage.setItem("cameFromProfile", "yes");

      // Går til robotens fulde profil
      window.location.href = "robotprofile.html";
    });

    // Tilføjer profilen til glow-box
    glowBox.appendChild(wrapper);

    // Decline → gå til næste robot
    wrapper.querySelector(".swipe-decline").addEventListener("click", () => {
      index++; // næste robot
      localStorage.setItem("swipeIndex", index); // gem position
      renderBot(); // vis næste robot
      loadNav(); // tilføj navigation igen
    });

    // Initiate → gem + næste robot
    wrapper.querySelector(".swipe-sync").addEventListener("click", () => {
      // Henter tidligere syncs
      let syncs = JSON.parse(localStorage.getItem("syncedBots")) || [];

      // Tilføjer robot hvis den ikke allerede er synced
      if (!syncs.includes(bot.id)) {
        syncs.push(bot.id);
        localStorage.setItem("syncedBots", JSON.stringify(syncs));
      }

      index++; // næste robot
      localStorage.setItem("swipeIndex", index); // gem position
      renderBot(); // vis næste robot
      loadNav(); // tilføj navigation igen
    });
  }

  // Viser første robot (eller den gemte position)
  renderBot();

  // Tilføjer navigationen første gang
  loadNav();
}
