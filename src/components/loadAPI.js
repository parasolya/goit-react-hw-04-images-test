export default async function getPhotos(photoName, page = 1) {
  const url = 'https://pixabay.com/api/';
  const API_KEY = '34888739-64f83dbd913255152a5bcb43e';
  const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });

  return await fetch(
    `${url}?q=${photoName}&page=${page}&key=${API_KEY}&${searchParams}`
  ).then(res => res.json());
}
