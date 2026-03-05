import { loadHeader } from "./components/header.js";
import { loadWelcome } from "./components/welcome.js";
import { loadChat } from "./components/chat.js";
import { loadProfile } from "./components/myProfile.js";
import { loadSwipe } from "./components/swipe.js";
import { loadRobotProfile } from "./components/robotprofile.js";
import { loadSyncs } from "./components/syncs.js";
import { loadSyncRobotProfile } from "./components/syncrobotprofile.js";

loadHeader();

const page = window.location.pathname.toLowerCase();

// Forside
if (page.includes("index.html") || page === "/") {
  loadWelcome();
}

// Chat
else if (page.includes("chat.html")) {
  loadChat();
}

// Profil
else if (page.includes("myprofile.html")) {
  loadProfile();
}

// Swipe
else if (page.includes("swipe.html")) {
  loadSwipe();
}

//  Syncrobotprofile SKAL komme før robotprofile
else if (page.includes("syncrobotprofile.html")) {
  loadSyncRobotProfile();
}

// Robotprofile
else if (page.includes("robotprofile.html")) {
  loadRobotProfile();
}

// My Syncs
else if (page.includes("syncs.html")) {
  loadSyncs();
}
