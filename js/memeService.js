'use strict'

var gImgNextId = 1

var gImgs = [
    { id: gImgNextId++, url: 'img/1.jpg', keywords: ['funny', 'Tramp'] },
    { id: gImgNextId++, url: 'img/2.jpg', keywords: ['cute', 'puppy'] },
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            // txt: 'I sometimes eat Falafel',
            txt: 'Add text here',
            size: 40,
            fillColor: 'black',
            strokeColor: 'black'
        }
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

function increaseFont(){
    gMeme.lines[gMeme.selectedLineIdx].size +=2
}

function decreaseFont(){
    gMeme.lines[gMeme.selectedLineIdx].size -=2
}
