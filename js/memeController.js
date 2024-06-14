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

    var x = gElCanvas.width / 2
    var y = gElCanvas.height / 2

    // // //* Clear the canvas,  fill it with grey background
    // setTimeout(() => { drawText(meme.lines[meme.selectedLineIdx], gElCanvas.width / 2, gElCanvas.height / 2) }, 2)
    setTimeout(() => {
        meme.lines.forEach((line, idx) => {
            drawText(line, x, y, idx === meme.selectedLineIdx);
            x += 10;
            y += 10;
        })

    }, 2)

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

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //* Listen for resize ev
    // window.addEventListener('resize', () => {
    //     // resizeCanvas()
    //     //* Calc the center of the canvas
    //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    //* Create the circle in the center

    // renderCanvas()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse ev
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        // console.log('pos:', pos)
    }
    return pos
}

function drawText(line, x, y, selected) {
    var txt = line.txt
    var height = line.size * 1.286;
    var width;

    if(line.txt === '') {
        txt = 'Add Text Here'
    }
    
    gCtx.beginPath();

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.font = line.size + 'px Arial';
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';

    width = gCtx.measureText(txt).width + 4;
    // gCtx.textAlign = 'left';
    // gCtx.textBaseline = 'top';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    if (selected) {
        gCtx.strokeRect(x - width / 2 , y - height / 2 , width, height);
    }
}

function onAddLine() {
    const elLineIn = document.getElementById('line-inp')
    elLineIn.value = ''

    addLine()
    renderMeme()
}

function onSwitchLine() {
    console.log('gggg');
    // const elLineIn = document.getElementById('line-inp')
    // elLineIn.value = gMeme.selectedLineIdx

    switchLine()
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
