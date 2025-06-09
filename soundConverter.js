const recordButton = document.getElementById("record");
const recordedAudio = document.getElementById("recordedAudio");
const recordingPreview = document.querySelector(".recording-preview");
const convertedText = document.getElementById("convertedText");
const statusEl = document.createElement("div");
statusEl.className = "recording-status";
recordingPreview.parentNode.insertBefore(statusEl, recordingPreview);

let recognition;
let isRecording = false;

// Initialize recording functionality
async function startRecognition() {
  if (!recognition) {
    alert(
      "متصفحك لا يدعم واجهة التعرف على الكلام. يرجى استخدام Google Chrome."
    );
    return;
  }

  try {
    if (isRecording) {
      recognition.stop();
      return;
    }

    // Request microphone permission
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop()); // Stop the stream after getting permission

    // Start recognition
    recognition.start();
  } catch (error) {
    console.error("Error accessing microphone:", error);
    alert(
      "حدث خطأ في الوصول إلى الميكروفون. يرجى التأكد من السماح بالوصول إلى الميكروفون."
    );
  }
}

// Check for SpeechRecognition API
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "ar-EG"; // Use Arabic - Egypt

  recognition.onstart = () => {
    statusEl.textContent = "يستمع الآن...";
    isRecording = true;
    recordButton.innerHTML =
      '<i class="fas fa-stop"></i><span>إيقاف التسجيل</span>';
    recordButton.classList.add("recording");
  };

  recognition.onend = () => {
    statusEl.textContent = "تم الإيقاف.";
    isRecording = false;
    recordButton.innerHTML =
      '<i class="fas fa-microphone"></i><span>بدء التسجيل</span>';
    recordButton.classList.remove("recording");
  };

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    convertedText.value = transcript;
    showSignVideo(transcript); // If you want to show sign language for the converted text
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    statusEl.textContent = "حدث خطأ في التعرف على الكلام.";
    convertedText.value =
      "حدث خطأ في تحويل الصوت إلى نص. يرجى المحاولة مرة أخرى.";
  };

  // Add event listeners
  document.addEventListener("DOMContentLoaded", () => {
    // Add click handler for the record button
    recordButton.addEventListener("click", startRecognition);

    // Add click handler for the use recording button
    const useRecordingButton = document.getElementById("useRecording");
    if (useRecordingButton) {
      useRecordingButton.addEventListener("click", () => {
        if (convertedText.value) {
          showSignVideo(convertedText.value);
        }
      });
    }
  });
} else {
  alert("متصفحك لا يدعم واجهة التعرف على الكلام. يرجى استخدام Google Chrome.");
  recordButton.disabled = true;
  recordButton.innerHTML =
    '<i class="fas fa-microphone-slash"></i><span>غير مدعوم</span>';
}

function showSignVideo(text) {
  const videoElement = document.getElementById("signVideo");
  videoElement.style.display = "none"; // إخفاء الفيديو أولاً

  // قاعدة بيانات بسيطة للجمل والكلمات
  const videos = {
    مرحبا: "videos/marhaban.mp4",
    شكرا: "videos/shokran.mp4",
    "كيف حالك": "videos/kaifa-haluk.mp4",
    نعم: "videos/yes.mp4",
    لا: "videos/no.mp4",
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
    document.getElementById("spokenText").innerText +=
      "\n(لا يوجد فيديو مناسب لهذه الجملة)";
    videoElement.style.display = "none";
  }
}
