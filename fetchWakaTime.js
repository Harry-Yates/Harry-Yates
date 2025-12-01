const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const fetchWakaTimeStats = async () => {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    throw new Error("WAKATIME_API_KEY not found in .env");
  }

  // Base64 encode the API key for Basic auth
  const encoded = Buffer.from(apiKey).toString("base64");

  const url = "https://wakatime.com/api/v1/users/current/stats/all_time";

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${encoded}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`WakaTime API error: ${response.status} - ${text}`);
  }

  return response.json();
};

const generateAsciiBar = (percent, width = 20) => {
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  return "█".repeat(filled) + "░".repeat(empty);
};

const generateLanguageStats = (languages) => {
  if (!languages || languages.length === 0) {
    return "No coding activity recorded yet. Check back soon!";
  }

  // Filter out "Other" and take top 6 languages
  const topLangs = languages
    .filter(l => l.name !== "Other")
    .slice(0, 6);

  // Find the longest language name for alignment
  const maxNameLength = Math.max(...topLangs.map(l => l.name.length));

  let output = "```text\n";

  topLangs.forEach(lang => {
    const name = lang.name.padEnd(maxNameLength + 2);
    const bar = generateAsciiBar(lang.percent, 20);
    const percent = Math.round(lang.percent).toString().padStart(3) + "%";
    output += `${name}${bar}  ${percent}\n`;
  });

  output += "```";

  return output;
};

const updateReadme = async (statsContent) => {
  const readmePath = path.join(__dirname, "README.md");
  let readmeContent = fs.readFileSync(readmePath, "utf8");

  const startMarker = "<!-- WAKATIME_START -->";
  const endMarker = "<!-- WAKATIME_END -->";
  const startIndex = readmeContent.indexOf(startMarker);
  const endIndex = readmeContent.indexOf(endMarker);

  if (startIndex < 0 || endIndex < 0) {
    console.log("WakaTime markers not found in README.md");
    console.log("Add these markers where you want the stats:");
    console.log("<!-- WAKATIME_START -->");
    console.log("<!-- WAKATIME_END -->");
    return;
  }

  const beforeStats = readmeContent.substring(0, startIndex + startMarker.length);
  const afterStats = readmeContent.substring(endIndex);
  readmeContent = beforeStats + "\n" + statsContent + "\n" + afterStats;

  fs.writeFileSync(readmePath, readmeContent, "utf8");
  console.log("Successfully updated README.md with WakaTime stats");
};

const main = async () => {
  console.log("Fetching WakaTime stats...");

  try {
    const data = await fetchWakaTimeStats();

    if (!data.data) {
      throw new Error("No data returned from WakaTime");
    }

    const stats = data.data;
    const languages = stats.languages || [];

    console.log(`Total coding time: ${stats.human_readable_total || "0 hrs"}`);
    console.log(`Languages tracked: ${languages.length}`);

    const asciiStats = generateLanguageStats(languages);
    console.log("\nGenerated stats:");
    console.log(asciiStats);

    await updateReadme(asciiStats);

  } catch (error) {
    console.error("Error:", error.message);

    // If no data yet, put a placeholder
    if (error.message.includes("No data")) {
      const placeholder = "```text\nNo coding activity recorded yet.\nInstall the WakaTime extension and start coding!\n```";
      await updateReadme(placeholder);
    }
  }
};

main();
