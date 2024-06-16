'use strict'

function renderGallery(imgs = getImgs()) {
    document.querySelector('.galery').style.display = 'block';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.saved').style.display = 'none';
    

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

function onImgInput(ev) {
    loadImageFromInput(ev, addImage)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
    // console.log('fgfgfgfgfgfgfshbbe');
    const reader = new FileReader()
    reader.onload = function (event) {
        let elImg = new Image()
        elImg.src = event.target.result
        elImg.onload = () => onImageReady(elImg)
    }
    reader.readAsDataURL(ev.target.files[0])
}


function addImage(elImg) {
    addNewImage(elImg.src);
    renderGallery();
}
// function renderImg(elImg) {
//     // Draw the img on the canvas
//     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
// }