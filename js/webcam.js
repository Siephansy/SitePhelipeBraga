const video = document.getElementById("video");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");

let stream;

btnStart.addEventListener("click", () => {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })
  .then((mediaStream) => {
    stream = mediaStream;
    video.srcObject = mediaStream;
    console.log("Media Stream:", mediaStream); // Exibe o Media Stream no console
  })
  .catch((error) => {
    console.error("Erro ao acessar a webcam:", error);
  });
});

btnStop.addEventListener("click", () => {
  stream.getTracks().forEach((track) => {
    track.stop();
  });
  video.srcObject = null;
});
