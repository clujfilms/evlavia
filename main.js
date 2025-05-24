// main.js

// Load and display sermons in resurse.html
function loadSermons() {
  const sermons = JSON.parse(localStorage.getItem("sermons") || "[]");
  const container = document.getElementById("sermon-list");
  if (!container) return;
  container.innerHTML = "";

  if (sermons.length === 0) {
    container.innerHTML = "<p>Nu există predici adăugate momentan.</p>";
  } else {
    sermons.reverse().forEach((sermon, index) => {
      const div = document.createElement("div");
      div.className = "video";
      div.innerHTML = `
        <h3>${sermon.title}</h3>
        <iframe src="https://www.youtube.com/embed/${sermon.videoId}" allowfullscreen></iframe>
      `;
      container.appendChild(div);
    });
  }
}

// Add new sermon from admin.html
function setupAdminForm() {
  const form = document.getElementById("add-sermon-form");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("sermon-title").value;
    const link = document.getElementById("sermon-link").value;
    try {
      const videoId = new URL(link).searchParams.get("v");
      if (!videoId) throw new Error();
      const sermons = JSON.parse(localStorage.getItem("sermons") || "[]");
      sermons.push({ title, videoId });
      localStorage.setItem("sermons", JSON.stringify(sermons));
      document.getElementById("confirm-msg").textContent = "Predică adăugată!";
      form.reset();
    } catch {
      alert("Link YouTube invalid.");
    }
  });
}

// Initialize functionality
window.addEventListener("DOMContentLoaded", () => {
  loadSermons();
  setupAdminForm();
});
