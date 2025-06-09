const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'ar-EG';

function startRecognition() {
  recognition.start();
}

recognition.onresult = function(event) {
  const spokenText = event.results[0][0].transcript.trim();
  document.getElementById("spokenText").innerText = "النص المكتشف: " + spokenText;
  showSignVideo(spokenText);
};

function showSignVideo(text) {
  const videoElement = document.getElementById("signVideo");
  videoElement.style.display = "none"; // إخفاء الفيديو أولاً

  // قاعدة بيانات بسيطة للجمل والكلمات
  const videos = {
    "مرحبا": "videos/marhaban.mp4",
    "شكرا": "videos/shokran.mp4",
    "كيف حالك": "videos/kaifa-haluk.mp4",
    "نعم": "videos/yes.mp4",
    "لا": "videos/no.mp4"
  };

  // محاولة مطابقة الجملة أو الكلمة
  let found = false;
  for (let key in videos) {
    if (text.includes(key)) {
      videoElement.src = videos[key];
      videoElement.style.display = "block";
      videoElement.play();
      found = true;
      break;
    }
  }

  if (!found) {
    document.getElementById("spokenText").innerText += "\n(لا يوجد فيديو مناسب لهذه الجملة)";
    videoElement.style.display = "none";
  }
}