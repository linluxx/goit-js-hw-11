import { GalleryApiService } from './js/getGallery';
import { getRefs } from './js/getRefs';
import { galleryMarkup } from './js/galleryMarkup';
import { Notify } from 'notiflix';
import { Loading } from 'notiflix';
import { Block } from 'notiflix';
//////////////////////////////////////////////////////////////////
const refs = getRefs();
const galleryApiService = new GalleryApiService();
refs.form.addEventListener('submit', onFormSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
///////////////////////////////////////////////////////////////////

function onFormSearch(evt) {
  evt.preventDefault();

  galleryApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  if (galleryApiService.query === '') {
    return Notify.failure('Please provide keywords to search for.');
  }

  galleryApiService.resetPage();
  Loading.dots();
  galleryApiService.fetchGallery().then(res => {
    if (res.hits.length === 0) {
      return Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    clearGalleryContainer();
    Notify.success(`Hooray! We found ${res.totalHits} images.`);

    galleryMarkup(res.hits);
    Loading.remove(1000);
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
  // const inputValue = evt.target.elements.searchQuery.value.trim();
  // console.log(inputValue);
  // fetchGallery(inputValue)
  //   .then(res => {
  //     console.log(res);
  //     if (res.data.hits.length === 0) {
  //       return Notify.warning(
  //         'Sorry, there are no images matching your search query. Please try again.'
  //       );
  //     }
  //     onSuccess(res.data.hits);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
}

function onLoadMore() {
  Loading.dots();
  galleryApiService.fetchGallery().then(res => {
    galleryMarkup(res.hits);
  });
  Loading.remove(2000);
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

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
