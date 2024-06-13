'use strict'

var gMeme
var gImgId = 1

var gImgs = [{ id: gImgId++, url: 'img/1.jpg', keywords: ['funny', 'Tramp'] }]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            // txt: 'I sometimes eat Falafel',
            txt: 'Add text here',
            size: 40,
            color: 'black'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme;
}

function getImgById(id) {
    return gImgs.find(img => (img.id === id)).url
}

function setLineTxt(txt) {
  
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
