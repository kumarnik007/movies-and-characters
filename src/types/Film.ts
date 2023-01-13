export interface Film {
  title: string,
  release_date: Date,
  characters: string[],
}

export interface ApiResourceList {
  count: number,
  next: string,
  previous: string,
  results: Film[],
}
