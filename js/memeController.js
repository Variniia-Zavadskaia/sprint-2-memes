'use strict'
var gElCanvas;
var gCtx;
var gImg


function renderMeme() {
    document.querySelector('.galery').style.display = 'none';
    document.querySelector('.editor').style.display = 'block';
    const meme = getMeme()
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');

    func(getImgById(meme.selectedImgId))

    // // //* Clear the canvas,  fill it with grey background
    // setTimeout(() => { drawText(meme.lines[meme.selectedLineIdx], gElCanvas.width / 2, gElCanvas.height / 2) }, 2)
    setTimeout(() => {meme.lines.forEach(line => drawText(line, gElCanvas.width / 2, gElCanvas.height / 2))}, 2)

    // drawText('Add text here', gElCanvas.width/2, gElCanvas.height/2)
}

function func(url) {
    let bgImg = new Image()
    bgImg.src = url
    bgImg.onload = () => renderImg(bgImg)
}

function renderImg(bgImg) {
    // Draw the img on the canvas
    gCtx.drawImage(bgImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // drawText(meme.lines[meme.selectedLineIdx], gElCanvas.width/2, gElCanvas.height/2)
}

function drawText(line, x, y) {
    gCtx.beginPath()

    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.strokeColor
    gCtx.fillStyle = line.fillColor
    gCtx.font = line.size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function onAddLine(){
    const elLineIn = document.getElementById('line-inp')
   elLineIn.value = ''

    addLine()
    renderMeme()
}

function onLineChange() {
    const elLineIn = document.getElementById('line-inp')
    const newLine = elLineIn.value;

    console.log("dsds");
    console.log(newLine);

    setLineTxt(newLine);
    renderMeme();
}

function onSetTextFill() {
    const elClrChoice = document.getElementById('text-fill')
    var color = elClrChoice.value
    setTextFill(color)
    renderMeme();
}

function onSetTextStroke() {
    const elClrChoice = document.getElementById('text-shadow')
    var color = elClrChoice.value
    setTextStroke(color)
    renderMeme();
}

function onIncreaseFont() {
    increaseFont()
    renderMeme();
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme();
}

function onDownloadCanvas(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}