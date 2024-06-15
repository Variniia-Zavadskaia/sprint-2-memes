'use strict'

function renderGallery(imgs = getImgs()) {
    document.querySelector('.galery').style.display = 'block';
    document.querySelector('.editor').style.display = 'none';

    const elGalleryContainer = document.querySelector('.gallery-conainer');

    const strHTMLs = imgs.map(img => {
        return `<div class="img-card">
                    <img src="${img.url}" onclick="onImgSelect(${img.id})" />
                </div>`
    })

    elGalleryContainer.innerHTML = strHTMLs.join('');
}

function onImgSelect( imgId) {

    setImg(imgId);
    openEditor();
}