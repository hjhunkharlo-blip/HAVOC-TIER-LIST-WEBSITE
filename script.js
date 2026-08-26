const SERVER_IP = "havocffa.playwithbao.com:41367";

const DISCORD_LINK = "https://discord.gg/RaJMvHaXB";

const API_URL =
  "https://havoc-bot-production-82b2.up.railway.app/api/tiers";

/* =========================================
   SERVER IP
========================================= */

const serverIPElement =
  document.getElementById("server-ip");

if (serverIPElement) {
  serverIPElement.textContent = SERVER_IP;
}

/* =========================================
   DISCORD
========================================= */

document
  .querySelectorAll('a[href*="discord.gg"]')
  .forEach(link => {
    link.href = DISCORD_LINK;
  });

/* =========================================
   COPY IP
========================================= */

function copyIP() {
  navigator.clipboard
    .writeText(SERVER_IP)
    .then(() => {
      alert("HAVOC STYX server IP copied!");
    })
    .catch(() => {
      alert("Failed to copy server IP.");
    });
}

/* =========================================
   LOAD TIER API
========================================= */

async function loadTierData() {
  try {
    const response = await fetch(
      API_URL + "?t=" + Date.now(),
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(
        "API returned " + response.status
      );
    }

    const data = await response.json();

    console.log(
      "✅ HAVOC STYX API connected:",
      data
    );

    /*
      Dispatch event so the tier-list page
      can use the API data.
    */

    document.dispatchEvent(
      new CustomEvent("havocApiLoaded", {
        detail: data
      })
    );

    return data;

  } catch (error) {
    console.error(
      "❌ HAVOC STYX API connection failed:",
      error
    );

    document.dispatchEvent(
      new CustomEvent("havocApiError", {
        detail: error
      })
    );

    return null;
  }
}

/* =========================================
   AUTO CONNECT
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    loadTierData();
  }
);
