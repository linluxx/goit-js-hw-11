import { GalleryApiService } from './js/getGallery';
import { getRefs } from './js/getRefs';
import { galleryMarkup } from './js/galleryMarkup';
import { Notify } from 'notiflix';
import { Loading } from 'notiflix';
import { Report } from 'notiflix';
import { Block } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//////////////////////////////////////////////////////////////////
const refs = getRefs();
const galleryApiService = new GalleryApiService();
refs.form.addEventListener('submit', onFormSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
///////////////////////////////////////////////////////////////////

async function onFormSearch(evt) {
  evt.preventDefault();

  galleryApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  if (galleryApiService.query === '') {
    return Notify.failure('Please provide keywords to search for.');
  }

  galleryApiService.resetPage();
  Loading.dots('Loading', { svgColor: 'rgb(185, 117, 27)' });

  const res = await galleryApiService.fetchGallery();
  if (res.hits.length === 0) {
    Loading.remove(700);
    return Report.warning(
      'Oops!',
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  clearGalleryContainer();
  Notify.success(`Hooray! We found ${res.totalHits} images.`);
  window.scrollBy(0, 0);
  galleryMarkup(res.hits);
  Loading.remove(700);
  if (res.totalHits <= 40) {
    return Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

async function onLoadMore() {
  Loading.dots('Loading', { svgColor: 'rgb(185, 117, 27)' });
  const res = await galleryApiService.fetchGallery();
  galleryMarkup(res.hits);
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2.5,
    behavior: 'smooth',
  });
  if (res.totalHits - 40 * (galleryApiService.page - 1) <= 0) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  Loading.remove(700);
}

function clearGalleryContainer() {
  refs.galleryList.innerHTML = '';
}

// window.addEventListener('scroll', () => {
//   const documentRect = document.documentElement.getBoundingClientRect();
//   if (documentRect.bottom < document.documentElement.clientHeight + 200) {
//     Loading.dots();
//     galleryApiService.page += 1;
//     galleryApiService.fetchGallery().then(res => {
//       galleryMarkup(res.hits);
//     });
//     Loading.remove(1000);
//   }
// });
