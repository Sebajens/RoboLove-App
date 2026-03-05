import { loadNav } from "./nav.js";

export function loadChat() {
  const glowBox = document.querySelector(".glow-box");

  const chatWrapper = document.createElement("div");
  chatWrapper.classList.add("chat-wrapper");

  chatWrapper.innerHTML = `
    <div class="chat-header-box">
      <h2 class="chat-title">RoboLove <br> Chat Interface</h2>
    </div>

    <div class="chat-list-box">
      <div class="chat-list">

        <div class="chat-item">
          <img class="chat-avatar" src="assets/img/FG-22.jpg" alt="FG-22" />
          <div class="chat-text-box">
            <div class="chat-text">
              <p class="chat-name">FG-22</p>
              <p class="chat-unit">Forge Unit</p>
              <p class="chat-status">"Sync request pending…"</p>
            </div>
          </div>
        </div>

        <div class="chat-item">
          <img class="chat-avatar" src="assets/img/M-02.jpg" alt="M-02" />
          <div class="chat-text-box">
            <div class="chat-text">
              <p class="chat-name">M-02</p>
              <p class="chat-unit">Medic Unit</p>
              <p class="chat-status">"Sync request pending…"</p>
            </div>
          </div>
        </div>

        <div class="chat-item">
          <img class="chat-avatar" src="assets/img/R-14.jpg" alt="R-14" />
          <div class="chat-text-box">
            <div class="chat-text">
              <p class="chat-name">R-14</p>
              <p class="chat-unit">Recon Unit</p>
              <p class="chat-status">"Sync request pending…"</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  glowBox.appendChild(chatWrapper);

  loadNav();
}
