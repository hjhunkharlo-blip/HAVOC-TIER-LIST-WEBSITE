const SERVER_IP = "havocffa.playwithbao.com:41367";

const DISCORD_LINK = "https://discord.gg/RaJMvHaXB";


// SERVER IP
document.getElementById("server-ip").textContent = SERVER_IP;


// DISCORD
document.querySelectorAll('a[href*="discord.gg"]').forEach(link => {
  link.href = DISCORD_LINK;
});


// COPY IP
function copyIP() {
  navigator.clipboard.writeText(SERVER_IP);

  alert("HAVOC STYX server IP copied!");
}
