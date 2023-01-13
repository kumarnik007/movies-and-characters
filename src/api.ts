export const BASE_URL = 'https://swapi.dev/api/';
const FILMS_RESOURCE = 'films/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getFilm<T>(): Promise<T> {
  const url = BASE_URL + FILMS_RESOURCE;

  console.log(url);

  // keeping this delay for testing purpose
  return wait(500)
    .then(() => fetch(url))
    .then(response => response.json());
}
