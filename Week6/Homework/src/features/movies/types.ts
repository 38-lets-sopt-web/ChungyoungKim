export interface MovieSummary {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
}

export interface MovieListResponse {
  page: number
  results: MovieSummary[]
  total_pages: number
  total_results: number
}

export interface MovieGenre {
  id: number
  name: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface MovieDetail extends MovieSummary {
  backdrop_path: string | null
  budget: number
  genres: MovieGenre[]
  original_language: string
  original_title: string
  production_countries: ProductionCountry[]
  revenue: number
  runtime: number | null
  spoken_languages: SpokenLanguage[]
  status: string
  vote_count: number
}
