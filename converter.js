const Keywords = [
  {
    keyword: "البيئة",
    variations: ["بيئة", "بيئه", "البيئه"],
    link: "https://files.catbox.moe/bxewen.mp4",
  },
  {
    keyword: "توثيق",
    variations: ["توثيق", "توثيق", "توثيق"],
    link: "https://files.catbox.moe/6u80wo.mp4",
  },
  {
    keyword: "مشاركة",
    variations: ["مشاركة", "مشاركه", "مشاركة"],
    link: "https://files.catbox.moe/zld6tl.mp4",
  },
];

// Get DOM elements
const btnConvert = document.querySelector("#convert_text");
const userText = document.querySelector("#textInput");
const signLanguageDisplay = document.getElementById("signLanguageDisplay");

// Function to find matching keywords in text
function findMatchingKeywords(text) {
  return Keywords.filter((item) => {
    // Check main keyword
    if (text.includes(item.keyword)) return true;

    // Check variations
    return item.variations.some((variation) => text.includes(variation));
  });
}

// Function to create video element
function createVideoElement(videoUrl) {
  const video = document.createElement("video");
  video.controls = true;
  video.autoplay = true;
  video.muted = true; // Required for autoplay to work in most browsers
  video.style.width = "100%";
  video.style.marginBottom = "10px";

  const source = document.createElement("source");
  source.src = videoUrl;
  source.type = "video/mp4";

  video.appendChild(source);
  return video;
}

// Convert button click handler
btnConvert.onclick = () => {
  const text = userText.value.trim();

  if (text === "") {
    alert("الرجاء إدخال نص للتحويل");
    return;
  }

  // Find matching keywords
  const matches = findMatchingKeywords(text);

  if (matches.length === 0) {
    alert("لم يتم العثور على كلمات مطابقة في النص");
    return;
  }

  // Clear previous content
  signLanguageDisplay.innerHTML = "";

  // Create and append video elements for each match
  matches.forEach((match) => {
    const videoElement = createVideoElement(match.link);
    signLanguageDisplay.appendChild(videoElement);
  });
};
