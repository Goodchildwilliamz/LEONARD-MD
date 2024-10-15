"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "repo", catégorie:"Général", reaction: "📑", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://api.github.com/repos/betingrich/Tesla';
  const img = 'https://telegra.ph/file/db890d1a98e3ab7ef631a.jpg';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata = `*Hi,I am* *Leonard-Md.*\n  
🏎️ *Pair Code* https://bugatti-session.onrender.com
🏎️ *Repo:* ${data.html_url}
🏎️ *Stars:* ${repoInfo.stars}
🏎️ *𝗙𝗼𝗿𝗸𝘀:* ${repoInfo.forks}
🏎️ *Released Date:* ${releaseDate}
🏎️ *Updated on:* ${repoInfo.lastUpdate}
🏎️ *Owner:* *Leonard*
__________________________________
            *Leornard-Md*`;

      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
