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
                    <div class="button-with-img-icon delete-meme" id="img" type="button" onclick="onDeleteMeme(${idx})">
                        <img src="img/icons/delete_trash_icon.png" alt="" height="20" width="20">
                    </div>
                </div>`
                // <img src="${meme.resImgUrl.url}" onclick="onImgSelect(${img.id})" />
    })

    elSavedContainer.innerHTML = strHTMLs.join('');
}

function onOpenSavedEditor(idx) {
    openEditor(getSavedMemes()[idx].meme)
}

function onDeleteMeme(idx) {
    deleteMeme(idx) 
    renderSaved() 
}