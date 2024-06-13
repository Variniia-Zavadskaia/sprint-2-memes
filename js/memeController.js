'use strict'
var gElCanvas;
var gCtx;
var gImg

function onInit(){
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');


    func(getImgById(meme.selectedImgId))
    
    // isDrawing = false;
    // renderImg(elImg);
    // gCtx.fillStyle = '#ede5ff'
    // // //* Clear the canvas,  fill it with grey background
    setTimeout(()=>{drawText(meme.lines[meme.selectedLineIdx], gElCanvas.width/2, gElCanvas.height/2)}, 100)
    // gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

    
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
    gCtx.strokeStyle = line.color
    gCtx.fillStyle = line.color
    gCtx.font = line.size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function onLineChange() {
    const elLineIn = document.getElementById('line-inp')
    const newLine = elLineIn.value;

    console.log("dsds");
    console.log(newLine);

    setLineTxt(newLine);
    renderMeme();
}

