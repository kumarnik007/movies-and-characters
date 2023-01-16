export interface Film {
  title: string,
  release_date: string,
  characters: string[],
}

export interface ApiResourceList {
  count: number,
  next: string,
  previous: string,
  results: Film[],
}

export interface Character {
  name: string,
}
