'use strict'

var gImgNextId = 1

var gImgs = [
    { id: gImgNextId++, url: 'img/1.jpg', keywords: ['funny', 'Tramp'] },
    { id: gImgNextId++, url: 'img/2.jpg', keywords: ['cute', 'puppy'] },
    { id: gImgNextId++, url: 'img/3.jpg', keywords: ['funny', 'Tramp'] },
    { id: gImgNextId++, url: 'img/4.jpg', keywords: ['cute', 'puppy'] },
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        _createLine()
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

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

function switchLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
    console.log(gMeme.selectedLineIdx);
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setTextFill(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function setTextStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function _createLine() {
    return {
        txt: '',
        size: 40,
        fillColor: 'black',
        strokeColor: 'black',
        pos: null,
        dimentions: null
    }
}

