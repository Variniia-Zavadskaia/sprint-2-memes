'use strict'

function renderGallery(imgs = getImgs()) {
    document.querySelector('.galery').style.display = 'block'
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.saved').style.display = 'none'

    const elGalleryContainer = document.querySelector('.gallery-conainer')

    const strHTMLs = imgs.map(img => {
        return `<div class="img-card">
                    <img src="${img.url}" onclick="onImgSelect(${img.id})" />
                </div>`
    })

    elGalleryContainer.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    openEditor()
}

function onImgInput(ev) {
    loadImageFromInput(ev, addImage)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = function (event) {
        let elImg = new Image()
        elImg.src = event.target.result
        elImg.onload = () => onImageReady(elImg)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function addImage(elImg) {
    addNewImage(elImg.src)
    renderGallery()
}
