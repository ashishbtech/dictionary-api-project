const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

// ===== Fetch meaning from Dictionary API =====
async function fetchAPI(word) {
  try {
    // Show searching message
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"...`;

    // API URL
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
    // Fetch the result
    const result = await fetch(url).then(res => res.json());

    // Agar word exist nahi karta (API error response)
    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";

      titleEl.innerText = word;
      meaningEl.innerText = "N/A"; // Meaning not available
      audioEl.style.display = "none"; // Hide audio
    } else {
      // Word found, show meaning
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";

      // Word title
      titleEl.innerText = result[0].word;

      // First meaning ka definition
      const definitions = result[0].meanings[0].definitions;
      meaningEl.innerText = definitions[0].definition;

      // Audio pronunciation (agar available ho)
      const phonetics = result[0].phonetics;
      const audioSrc = phonetics.find(p => p.audio)?.audio || "";
      if(audioSrc) {
        audioEl.src = audioSrc;
        audioEl.style.display = "inline-flex";
      } else {
        audioEl.style.display = "none";
      }
    }
  } catch (error) {
    console.error(error);
    infoTextEl.innerText = `Oops! An error occurred, try again later.`;
    meaningContainerEl.style.display = "none";
    audioEl.style.display = "none";
  }
}

// ===== Listen for Enter Key =====
inputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value.trim() !== "") {
    fetchAPI(e.target.value.trim());
  }
});