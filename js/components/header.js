// Eksporterer funktionen så index.js kan bruge den
export function loadHeader() {
  // Finder glow-boksen i HTML (den store boks rundt om alt)
  const glowBox = document.querySelector(".glow-box");

  // Laver en ny <div> som skal være vores header
  const header = document.createElement("div");

  // Giver header-div'en klassen "header" så vi kan style den i CSS
  header.classList.add("header");

  // Sætter HTML-indholdet ind i headeren (logo + tagline)
  header.innerHTML = `
    <h1 class="logo">RoboLove</h1>
    <p class="tagline">Find your perfect match... system optimized.</p>
  `;

  // Lægger header-div'en IND i glow-boksen
  // (så headeren kommer til at stå øverst i glow-boksen)
  glowBox.appendChild(header);
}
