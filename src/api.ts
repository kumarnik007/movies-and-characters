export const BASE_URL = 'https://swapi.dev/api/';
const FILMS_RESOURCE = 'films/';

export async function get<T>(url: string = BASE_URL + FILMS_RESOURCE): Promise<T> {
  return fetch(url)
    .then(response => response.json());
}
