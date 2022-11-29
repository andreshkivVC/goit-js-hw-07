import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const cardsContainer = document.querySelector('.gallery');
const cardsMarkup = creatGalleryCard(galleryItems);

cardsContainer.insertAdjacentHTML('beforeend', cardsMarkup);

cardsContainer.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  const instance = basicLightbox.create(
    `<img src="${evt.target.dataset.source}" width="800" height="600">`,
    {
      onShow: instance => {
        cardsContainer.addEventListener('keybown', onEscapeButton);
      },
      onClose: instance => {
        cardsContainer.removeEventListener('keybown', onEscapeButton);
      },
    },
  );

  instance.show();

  function onEscapeButton(evt) {
    if (evt.code === 'Escape') {
      instance.close();
    }
  }

}


function creatGalleryCard(images) {
  return images
    .map(({ preview, original, description }) => (
       `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`)
    )
    .join('');
}
