import { loadNav } from "./nav.js";

export async function loadProfile() {
  const glowBox = document.querySelector(".glow-box");

  // Hent JSON-data
  const response = await fetch("./data/robots.json");
  const robotData = await response.json();

  // Find S-47
  const robot = robotData.robots.find((r) => r.id === "S-47");

  if (!robot) {
    glowBox.innerHTML = "<p style='color:white'>Robot S-47 not found.</p>";
    return;
  }

  // STOR GLOW BOKS RUNDT OM HELE PROFILEN
  const wrapper = document.createElement("div");
  wrapper.classList.add("profile-wrapper");

  wrapper.innerHTML = `
    <!-- HEADER -->
    <div class="profile-header-box">
      <h2 class="profile-title">My profile</h2>
    </div>

    <!-- MELLEM GLOWBOKS RUNDT OM ALT DET VIGTIGE -->
    <div class="profile-top-box">

        <!-- LILLE GLOWBOKS RUNDT OM BILLEDET -->
        <div class="profile-image-box">
          <img class="profile-avatar" src="${robot.image}" alt="${robot.id}" />
        </div>

        <!-- NAVN + TYPE -->
        <p class="profile-name-main">${robot.name}</p>
        <p class="profile-name-sub">${robot.unit_type} - ${robot.version}</p>

        <!-- ABOUT ME -->
        <div class="profile-about-box">
          <p class="profile-about-label">About me:</p>
          <p class="profile-about-text">${robot.about_me_short}</p>
        </div>

        <!-- TAGS -->
        <div class="profile-tags">
          <div class="profile-tag">${robot.unit_type}</div>
          <div class="profile-tag">Compatible:<br> ${robot.compatible_with}</div>
          <div class="profile-tag">AI Level:<br> ${robot.ai_level}</div>
        </div>

        <!-- STATUS -->
        <div class="profile-status-box">
          <p class="profile-status">
             <strong> Status: </strong>   ${robot.status}<br>
            RoboLove v2.8 - Secure Match Protocol
          </p>
        </div>

    </div>
  `;

  glowBox.appendChild(wrapper);

  loadNav();
}
