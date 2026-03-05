export function loadWelcome() {
  const glowBox = document.querySelector(".glow-box");

  // Samlet glow-ramme til hele velkomstskærmen
  const wrapper = document.createElement("div");
  wrapper.classList.add("welcome-wrapper");

  // Velkomst-tekst
  const welcomeText = document.createElement("div");
  welcomeText.classList.add("welcome-text");
  welcomeText.innerHTML = `
    <h1 class="welcome-title">Welcome to RoboLove</h1>
    <p class="welcome-sub">System online - ready when you are.</p>
  `;

  // Navigation-boks
  const navBox = document.createElement("div");
  navBox.classList.add("nav-box");
  navBox.innerHTML = `
  <div class="nav-header-box">
    <h2 class="menu-title">Navigation:</h2>
    <p class="menu-sub">Select your destination...</p>
  </div>

  <button class="menu-btn" id="btn-swipe">Start syncing</button>
  <button class="menu-btn" id="btn-mysyncs">My syncs</button>
  <button class="menu-btn" id="btn-myprofile">My profile</button>
  <button class="menu-btn" id="btn-chat">Chat</button>

`;

  // Læg alt ind i wrapperen
  wrapper.appendChild(welcomeText);
  wrapper.appendChild(navBox);

  // Læg wrapperen ind i glow-boksen
  glowBox.appendChild(wrapper);

  // Navigation
  document.getElementById("btn-swipe").addEventListener("click", () => {
    window.location.href = "swipe.html";
  });

  document.getElementById("btn-mysyncs").addEventListener("click", () => {
    window.location.href = "syncs.html";
  });

  document.getElementById("btn-myprofile").addEventListener("click", () => {
    window.location.href = "myprofile.html";
  });

    document.getElementById("btn-chat").addEventListener("click", () => {
    window.location.href = "chat.html";
  });
}
