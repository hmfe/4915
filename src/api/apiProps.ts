export interface MovieItem {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

export interface OmdbData {
  Response: string
  totalResults: string
  Search: MovieItem[]
}
