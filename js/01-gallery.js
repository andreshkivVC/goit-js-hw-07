import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createImageCardMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createImageCardMarkup(images) {
  return images
    .map(
      ({ preview, original, description }) =>
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
</div>`,
    )
    .join('');
}

galleryContainer.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();

  const targetClick = evt.target;

  if (!targetClick.classList.contains('gallery__image')) {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${targetClick.dataset.source}" alt="${targetClick.alt}"/>`,
    {
      onShow: instance => {
        galleryContainer.addEventListener('keydown', onEscapeButton);
      },

      onClose: instance => {
        galleryContainer.removeEventListener('keydown', onEscapeButton);
      },
    },
  );

  instance.show();

  function onEscapeButton(evt) {
    if (evt.key === 'Escape') {
      instance.close();
    }
  }
}
