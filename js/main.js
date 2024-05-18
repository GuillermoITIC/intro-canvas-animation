// Sistema solar animado
var sun = new Image();
var moon = new Image();
var earth = new Image();

function initSolarSystem() {
  sun.src = "canvas_sun.png";
  moon.src = "canvas_moon.png";
  earth.src = "canvas_earth.png";
  window.requestAnimationFrame(drawSolarSystem);
}

function drawSolarSystem() {
  var canvas = document.getElementById("canvasSolarSystem");
  var ctx = canvas.getContext("2d");
  canvas.width = 300;
  canvas.height = 300;

  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, 300, 300);

  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.strokeStyle = "rgba(0,153,255,0.4)";
  ctx.save();
  ctx.translate(150, 150);

  var time = new Date();
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
    ((2 * Math.PI) / 60000) * time.getMilliseconds()
  );
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 50, 24); 
  ctx.drawImage(earth, -12, -12);

  ctx.save();
  ctx.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
    ((2 * Math.PI) / 6000) * time.getMilliseconds()
  );
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5);
  ctx.restore();

  ctx.restore();

  ctx.beginPath();
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false);
  ctx.stroke();

  ctx.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(drawSolarSystem);
}

// Reloj animado con mejor diseño
function drawClock() {
  var canvas = document.getElementById("canvasClock");
  var ctx = canvas.getContext("2d");
  canvas.width = 300;
  canvas.height = 300;

  var now = new Date();
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr = now.getHours();
  hr = hr >= 12 ? hr - 12 : hr;

  ctx.clearRect(0, 0, 300, 300);
  ctx.translate(150, 150);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = "#0f0";
  ctx.fillStyle = "#0f0";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  ctx.save();
  for (var i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.lineWidth = 5;
  for (var j = 0; j < 60; j++) {
    if (j % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  ctx.fillStyle = "#0f0";

  ctx.save();
  ctx.rotate(
    hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = "#f00";
  ctx.fillStyle = "#f00";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = "#00f";
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.translate(-150, -150);

  window.requestAnimationFrame(drawClock);
}

// Panorama en bucle
var img = new Image();

img.src = "Panoramic.jpeg";
var CanvasXSize = 350;
var CanvasYSize = 350;
var speed = 30;
var scale = 1.05;
var y = 0;

var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;

img.onload = function () {
  imgW = img.width * scale;
  imgH = img.height * scale;

  if (imgW > CanvasXSize) {
    x = CanvasXSize - imgW;
  }
  if (imgW > CanvasXSize) {
    clearX = imgW;
  } else {
    clearX = CanvasXSize;
  }
  if (imgH > CanvasYSize) {
    clearY = imgH;
  } else {
    clearY = CanvasYSize;
  }

  ctx = document.getElementById("canvasPanorama").getContext("2d");

  return setInterval(drawPanorama, speed);
};

function drawPanorama() {
  ctx.clearRect(0, 0, clearX, clearY);

  if (imgW <= CanvasXSize) {
    if (x > CanvasXSize) {
      x = -imgW + x;
    }
    if (x > 0) {
      ctx.drawImage(img, -imgW + x, y, imgW, imgH);
    }
    if (x - imgW > 0) {
      ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
    }
  } else {
    if (x > CanvasXSize) {
      x = CanvasXSize - imgW;
    }
    if (x > CanvasXSize - imgW) {
      ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }
  ctx.drawImage(img, x, y, imgW, imgH);
  x += dx;
}

// Inicialización
initSolarSystem();
window.requestAnimationFrame(drawClock);
