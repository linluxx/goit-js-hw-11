import axios from 'axios';

const KEY = 'key=29800147-042a8c86586ab835e1f8a2965';
const URL = 'https://pixabay.com/api/';
const SEARCH_PARAMS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
// export function getGallery(data) {
//   return axios.get(`${URL}?${KEY}&q=${data}&${SEARCH_PARAMS}`);
// }
// export async function getGallery(data) {
//   try {
//     const response = await axios.get(
//       `${URL}?${KEY}&q=${data}&${SEARCH_PARAMS}`
//     );
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

export class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchGallery() {
    try {
      const response = await axios
        .get(
          `${URL}?${KEY}&q=${this.searchQuery}&${SEARCH_PARAMS}&page=${this.page}`
        )
        .then(res => {
          this.incrementPage();
          return res.data;
        });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuerry) {
    this.searchQuery = newQuerry;
  }
}
