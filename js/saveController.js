'use strict'

function renderSaved() {
    document.querySelector('.galery').style.display = 'none';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.saved').style.display = 'block';

    const elSavedContainer = document.querySelector('.saved-conainer');

    const savedMemes = getSavedMemes();

    const strHTMLs = savedMemes.map((meme, idx) => {
        console.log(meme);
        return `<div class="meme-card">                    
                    <img src="${meme.resImgUrl}" onclick="onOpenSavedEditor(${idx})"/>
                </div>`
                // <img src="${meme.resImgUrl.url}" onclick="onImgSelect(${img.id})" />
    })

    elSavedContainer.innerHTML = strHTMLs.join('');
}

function onOpenSavedEditor(idx) {
    openEditor(getSavedMemes()[idx].meme)
}