'use strict'

const MEME_KEY = "memeDB"
var gImgNextId = 1

var gImgs = [
    { id: gImgNextId++, url: 'img/1.jpg', keywords: ['funny', 'Tramp'] },
    { id: gImgNextId++, url: 'img/2.jpg', keywords: ['cute', 'puppy'] },
    { id: gImgNextId++, url: 'img/3.jpg', keywords: ['funny', 'Tramp'] },
    { id: gImgNextId++, url: 'img/4.jpg', keywords: ['cute', 'puppy'] },
    { id: gImgNextId++, url: 'img/5.jpg', keywords: ['funny', 'Tramp'] },
    { id: gImgNextId++, url: 'img/6.jpg', keywords: ['cute', 'puppy'] },
    { id: gImgNextId++, url: 'img/7.jpg', keywords: ['funny', 'Tramp'] },
    { id: gImgNextId++, url: 'img/8.jpg', keywords: ['cute', 'puppy'] },
    { id: gImgNextId++, url: 'img/9.jpg', keywords: ['funny', 'Tramp'] },
    { id: gImgNextId++, url: 'img/10.jpg', keywords: ['cute', 'puppy'] },
    { id: gImgNextId++, url: 'img/11.jpg', keywords: ['funny', 'Tramp'] },
    { id: gImgNextId++, url: 'img/12.jpg', keywords: ['cute', 'puppy'] },
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        _createLine()
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function _createLine() {
    return {
        txt: '',
        font: 'Impact',
        size: 40,
        fillColor: '#ffffff',
        strokeColor: '#000000',
        pos: null,
        dimentions: null
    }
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs
}

function getImgById(id) {
    return gImgs.find(img => (img.id === id)).url
}

function addLine() {
    const line = _createLine()
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)

    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
}

function switchLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
    console.log(gMeme.selectedLineIdx);
}

function setFontFamily(font){
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setFontSize(size){
    gMeme.lines[gMeme.selectedLineIdx].size = size
}

function findLineIdxCliked(clickedPos) {
    console.log(clickedPos);
    return gMeme.lines.findIndex(line => {
        console.log(line.pos, line.dimentions);

        console.log(line.pos.x + line.dimentions.width / 2, line.pos.x - line.dimentions.width / 2,
            line.pos.y + line.dimentions.height / 2, line.pos.y - line.dimentions.height / 2);
        if ((clickedPos.x <= (line.pos.x + line.dimentions.width / 2)) && (clickedPos.x >= (line.pos.x - line.dimentions.width / 2)) &&
            (clickedPos.y <= (line.pos.y + line.dimentions.height / 2)) && (clickedPos.y >= (line.pos.y - line.dimentions.height / 2))) {
            return true;
        }
        return false;
    })
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function setLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setTextFill(color) {
    console.log('fsf');
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function setTextStroke(color) {
    console.log('fsf');
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function _saveMemes() {
    saveToStorage(MEME_KEY, gMeme)
  }


