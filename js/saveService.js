'use strict'

const MEME_KEY = "memeDB"
var gSavedMemes = loadFromStorage(MEME_KEY) || []

function getSavedMemes() {
    return gSavedMemes
}

function saveMeme(meme, resImgUrl){
    console.log(meme);

    var savedMeme = {
        meme: JSON.parse(JSON.stringify(meme)), 
        resImgUrl: resImgUrl
    }
    console.log(gSavedMemes);

    gSavedMemes.push(savedMeme)
    _saveMemesToStorage()
}

function _saveMemesToStorage() {
    saveToStorage(MEME_KEY, gSavedMemes)
}


