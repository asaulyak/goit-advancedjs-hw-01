// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRoot = document.querySelector('.gallery');

function createGalleryItem(item) {
  return `<li class="gallery__item">
            <a class="gallery__link" href="${item.original}">
             <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
           </a>
          </li>`;
}

function createGallery() {
  const galleryHtmlElements = galleryItems.map(item => createGalleryItem(item)).join('');

  if (!galleryRoot) {
    return;
  }

  galleryRoot.insertAdjacentHTML('beforeend', galleryHtmlElements);
}

function bindEvents() {
  galleryRoot.querySelectorAll('.gallery__link').forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
    });
  });
}

function createLightBox() {
  return new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt'
  });
}

createGallery();
bindEvents();
createLightBox();
