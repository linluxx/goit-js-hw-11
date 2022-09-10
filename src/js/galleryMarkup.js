import { getRefs } from './getRefs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const refs = getRefs();

export function galleryMarkup(data) {
  console.log(data);
  const markUp = data
    .map(
      ({
        largeImageURL,
        webformatURL,
        likes,
        views,
        comments,
        downloads,
        tags,
      }) =>
        `
          <div class='photo-card'>
    <a class="photo-card-item" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${downloads}
      </p>
    </div>
    </div>
   `
    )
    .join('');
  refs.galleryList.insertAdjacentHTML('beforeend', markUp);
  let lightbox = new SimpleLightbox('.gallery a', {
    spinner: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}
