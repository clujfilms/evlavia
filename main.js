// main.js

function esteLinkValid(link) {
  const regex = /^(https:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/;
  return regex.test(link);
}

function adaugaPredica(link) {
  if (!esteLinkValid(link)) {
    alert("Link YouTube invalid.");
    return;
  }

  let predici = JSON.parse(localStorage.getItem("predici")) || [];
  predici.push(link);
  localStorage.setItem("predici", JSON.stringify(predici));
  alert("Predica a fost adăugată!");
}

function incarcaPredici(containerId) {
  let predici = JSON.parse(localStorage.getItem("predici")) || [];
  let container = document.getElementById(containerId);
  if (!container) return;

  if (predici.length === 0) {
    container.innerHTML = "<p>Nu există predici disponibile momentan.</p>";
    return;
  }

  container.innerHTML = "";
  predici.forEach(link => {
    let embedUrl = transformLinkInEmbed(link);
    if (embedUrl) {
      let iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.width = "100%";
      iframe.height = "315";
      iframe.frameBorder = "0";
      iframe.allowFullscreen = true;
      iframe.style.marginBottom = "20px";
      container.appendChild(iframe);
    }
  });
}

function transformLinkInEmbed(link) {
  try {
    const url = new URL(link);
    let videoId = "";

    if (url.hostname.includes("youtu.be")) {
      videoId = url.pathname.split("/")[1];
    } else if (url.hostname.includes("youtube.com")) {
      videoId = url.searchParams.get("v");
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}
