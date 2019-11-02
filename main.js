const video = document.body.querySelector("video");
const button = document.body.querySelector(
  'input[type="button"][value="Capture"]'
);

async function main() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  button.addEventListener("click", capture);
}

function capture() {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", video.videoWidth);
  canvas.setAttribute("height", video.videoHeight);

  const canvasContext = canvas.getContext("2d");
  canvasContext.drawImage(video, 0, 0);

  const url = canvas.toDataURL();

  const photo =
    document.body.querySelector("img") ||
    (() => {
      const photo = document.createElement("img");
      document.body.prepend(photo);
      return photo;
    })();
  photo.setAttribute("src", url);
  photo.setAttribute("alt", "photo");

  save(url);
}

function save(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = "photo.png";
  a.click();
}

main();
