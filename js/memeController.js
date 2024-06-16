'use strict'
var gElCanvas;
var gCtx;
var gImg
var gBgImg = null
var gDrag = false
var gStartPos
var gPaintFrame = true
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function openEditor() {
    document.querySelector('.galery').style.display = 'none';
    document.querySelector('.editor').style.display = 'block';

    resetMeme()
    const meme = getMeme()
    gElCanvas = document.querySelector('.canvas');
    gCtx = gElCanvas.getContext('2d');
    gBgImg = new Image()
    gBgImg.src = getImgById(meme.selectedImgId)
    gBgImg.onload = () => renderMeme()
    addListeners()
}

function renderMeme() {
    const meme = getMeme()

    renderImg(gBgImg);

    var x = gElCanvas.width / 2
    var y = gElCanvas.height / 2

    // // //* Clear the canvas,  fill it with grey background
    // setTimeout(() => { drawText(meme.lines[meme.selectedLineIdx], gElCanvas.width / 2, gElCanvas.height / 2) }, 2)
    meme.lines.forEach((line, idx) => {
        if (line.pos === null) {
            line.pos = { x, y };
        }
        line.dimentions = drawText(line, idx === meme.selectedLineIdx);
        console.log(line);
        x += 30;
        y += 30;
    })

    document.getElementById('line-inp').value = meme.lines[meme.selectedLineIdx].txt
    document.getElementById('fontFamily').value = meme.lines[meme.selectedLineIdx].font
    document.getElementById('font-size').value = meme.lines[meme.selectedLineIdx].size
    document.getElementById('icon-btn-stroke').value = meme.lines[meme.selectedLineIdx].strokeColor
    document.getElementById('icon-btn-fill').value = meme.lines[meme.selectedLineIdx].fillColor

    // drawText('Add text here', gElCanvas.width/2, gElCanvas.height/2)
}

function renderImg(bgImg) {
    // Draw the img on the canvas
    gCtx.drawImage(bgImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // drawText(meme.lines[meme.selectedLineIdx], gElCanvas.width/2, gElCanvas.height/2)
}

function onDown(ev) {
    console.log('onDown')
    // //* Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // //* console.log('pos', pos)
    const currIdx = findLineIdxCliked(pos)
    console.log(pos, currIdx);
    if (currIdx === -1) return
    setLineIdx(currIdx)
    renderMeme()

    gDrag = true
    //* Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gDrag) return

    const pos = getEvPos(ev)
    //* Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    //* Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    //* The canvas is render again after every move
    renderMeme()
}

function onUp() {
    gDrag = false
    document.body.style.cursor = 'auto'
}

function onKeyDown(event) {
    if (document.querySelector('.editor').style.display === 'none') return;
    console.log('fhfjfhfjfhfjf');
    console.log(event.code);
    switch (event.code) {
        case 'ArrowLeft':
            moveLine(-3, 0);
            break
        case 'ArrowRight':
            moveLine(3, 0);
            break;
        case 'ArrowUp':
            moveLine(0, -3);
            break;
        case 'ArrowDown':
            moveLine(0, 3);
            break;

        default: return null;
    }
    renderMeme()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // * Listen for resize ev
    window.addEventListener('resize', () => {
        console.log("dsds");
        resizeCanvas()
        //* Calc the center of the canvas
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        // * Create the circle in the center

        renderMeme()
    })
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

function drawText(line, selected) {
    var txt = line.txt
    var height = line.size * 1.286;
    var width;
    var x = line.pos.x
    var y = line.pos.y

    if (line.txt === '') {
        txt = 'Add Text Here'
    }

    gCtx.beginPath();

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.font = line.size + 'px ' + line.font;
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';

    width = gCtx.measureText(txt).width + 4;
    // gCtx.textAlign = 'left';
    // gCtx.textBaseline = 'top';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    if (selected && gPaintFrame) {
        gCtx.strokeStyle = 'black'
        gCtx.strokeRect(x - width / 2, y - height / 2, width, height);
    }

    return { width, height }
}

function onAddLine() {
    const elLineIn = document.getElementById('line-inp')
    elLineIn.value = ''

    addLine()
    renderMeme()
}

function onDeleteLine() {
    console.log('ghghghghghg');
    deleteLine()
    renderMeme()
}

function onSwitchLine() {
    console.log('gggg');
    // const elLineIn = document.getElementById('line-inp')
    // elLineIn.value = gMeme.selectedLineIdx

    switchLine()
    renderMeme()
}

function onChangeFontFamily() {
    const elFont = document.getElementById("fontFamily")
    var font = elFont.value

    setFontFamily(font)
    renderMeme()
}

function onChangeFontSize() {
    const elFont = document.getElementById("font-size")
    var size = elFont.value

    setFontSize(size)
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
    const elClrChoice = document.getElementById('icon-btn-fill')
    var color = elClrChoice.value
    setTextFill(color)
    renderMeme();
}

function onSetTextStroke() {
    const elClrChoice = document.getElementById('icon-btn-stroke')
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
    gPaintFrame = false
    renderMeme()

    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent

    gPaintFrame = true
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}


