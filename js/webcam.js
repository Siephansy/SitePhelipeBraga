const video = document.getElementById("video");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const canvas = document.getElementById("canvas");
const btnCapture = document.getElementById("btn-capture");
const btnRecord = document.getElementById("btn-record");

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

btnCapture.addEventListener("click", () => {
    const canvas = document.querySelector ("canvas");
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    context.putImageData(imageData, 0, 0);
    const base64Image = canvas.toDataURL("image/png");

  
    // Crie um link para download da imagem
    const link = document.createElement("a");
    link.download = "imagem-da-webcam.png";
    link.href = base64Image;
    link.textContent = 'Clique para baixar';
    document.body.appendChild(link);

});

btnRecord.addEventListener("click", () => {
    if (recorder === undefined) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      .then((mediaStream) => {
        video.srcObject = mediaStream;
        recorder = new MediaRecorder(mediaStream);
        recorder.start();
        btnRecord.textContent = "Parar Gravação";
      })
      .catch((error) => {
        console.error("Erro ao acessar a webcam:", error);
      });
    } else {
      recorder.stop();
      recorder = undefined;
      btnRecord.textContent = "Gravar Vídeo";
  
      // Salvar o vídeo gravado
      recorder.ondataavailable = (event) => {
        const blob = event.data;
        saveAs(blob, "video-da-webcam.mp4");
      };
    }
});


  