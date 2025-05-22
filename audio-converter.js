// Select buttons and audio element from the DOM
const recordBtn = document.getElementById("record");
const stopBtn = document.getElementById("stop");
const recordedAudio = document.getElementById("recordedAudio");

let mediaRecorder;
let audioChunks = [];

// Initially disable stop button
stopBtn.disabled = true;

// Request access to the microphone
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    mediaRecorder = new MediaRecorder(stream);

    // When data is available, push chunks into array
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    // When recording stops, create a blob and set it as audio source
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      audioChunks = [];
      const audioUrl = URL.createObjectURL(audioBlob);
      recordedAudio.src = audioUrl;

      // Optional: Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = audioUrl;
      downloadLink.download = "recording.wav";
      downloadLink.innerText = "Download Recording";
      document.body.appendChild(downloadLink);

      // Update button states
      recordBtn.disabled = false;
      stopBtn.disabled = true;
    };

    // Start recording when button clicked
    recordBtn.addEventListener("click", () => {
      try {
        mediaRecorder.start();
        console.log("Recording started");

        // Update button states
        recordBtn.disabled = true;
        stopBtn.disabled = false;
      } catch (error) {
        console.error("Error starting recording:", error);
      }
    });

    // Stop recording when button clicked
    stopBtn.addEventListener("click", () => {
      try {
        mediaRecorder.stop();
        console.log("Recording stopped");
      } catch (error) {
        console.error("Error stopping recording:", error);
      }
    });
  })
  .catch((error) => {
    console.error("Error accessing microphone:", error);
  });
