export function loadNav() {
  // Finder glow-box containeren (hele UI-rammen)
  const glowBox = document.querySelector(".glow-box");

  // Opretter en wrapper der holder hele navigationen
  const navWrapper = document.createElement("div");
  navWrapper.classList.add("nav-wrapper");

  // Universel navigation
  navWrapper.innerHTML = `
    <div class="nav-box-global">
      <button class="nav-btn-global" data-target="home">Home</button>
      <button class="nav-btn-global" data-target="syncs">My Syncs</button>
      <button class="nav-btn-global" data-target="profile">My Profile</button>
    </div>
  `;

  // Tilføjer navigationen ind i glow-box
  glowBox.appendChild(navWrapper);

  // Klik-events til alle knapper
  navWrapper.querySelectorAll(".nav-btn-global").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;

      if (target === "home") window.location.href = "index.html";
      if (target === "syncs") window.location.href = "syncs.html";
      if (target === "profile") window.location.href = "myprofile.html";
    });
  });
}
