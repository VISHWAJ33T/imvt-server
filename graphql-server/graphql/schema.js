const typeDefs = `
type TV {
  adult: Boolean
  backdrop_path: String!
  id: ID!
  name: String!
  original_language: String
  original_name: String
  overview: String!
  poster_path: String
  media_type: String
  genre_ids: [String]
  popularity: Float
  first_air_date: String
  vote_average: Float
  vote_count: Int
  origin_country: [String]
}
type Movie {
  adult: Boolean
  backdrop_path: String!
  id: ID!
  title: String!
  original_language: String
  original_title: String
  overview: String!
  poster_path: String
  media_type: String
  genre_ids: [String]
  popularity: Float
  release_date: String
  video: Boolean
  vote_average: Float
  vote_count: Int
  streamingId: String
}
type Collection {
  id: ID!
  name: String!
  poster_path: String
  backdrop_path: String
}

type Company {
  id: ID!
  logo_path: String
  name: String!
  origin_country: String
}

type Country {
  iso_3166_1: String
  name: String!
}

type Language {
  iso_639_1: String
  name: String!
}
type VideoResults {
  iso_639_1: String
  iso_3166_1: String
  name: String
  key: String
  published_at: String
  site: String
  size: Int
  type: String
  official: Boolean
  id: String
}
type Video {
results: [VideoResults]
}
type Logo {
  url: String
  aspectRatio: Float
  width: Int
}
type MovieRecommendations {
  id: ID!
  title: String!
  image: String
  type: String
  rating: Float
  releaseDate: String
}
type SingleMovie {
  adult: Boolean
  backdrop_path: String!
  belongs_to_collection: Collection
  budget: Int
  genres: [String]
  homepage: String
  id: ID!
  imdb_id: String
  original_language: String
  original_title: String
  overview: String!
  popularity: Float
  poster_path: String
  production_companies: [Company]
  production_countries: [Country]
  release_date: String
  revenue: Int
  runtime: Int
  spoken_languages: [Language]
  status: String
  tagline: String
  title: String!
  video: Boolean
  videos: Video
  vote_average: Float
  vote_count: Int
  streamingId: String
  casts: [PeopleCredits]
  logos: [Logo]
  recommendations: [MovieRecommendations]
  similar: [MovieRecommendations]
}
type Seasons { 
  air_date: String
  episode_count: Int
  id: Int
  name: String
  overview: String
  poster_path: String
  season_number: Int
  vote_average: Int }

type Networks { id: Int
  logo_path: String
  name: String
  origin_country: String }

type LastEpisodeToAir { id: Int
  name: String
  overview: String
  vote_average: Int
  vote_count: Int
  air_date: String
  episode_number: Int
  episode_type: String
  production_code: String
  runtime: Int
  season_number: Int
  show_id: Int
  still_path: String }

type CreatedBy { id: Int
  credit_id: String
  name: String
  gender: Int
  profile_path: String }

type SingleTV { adult: Boolean
  backdrop_path: String
  first_air_date: String
  homepage: String
  id: Int
  in_production: Boolean
  last_air_date: String
  name: String
  next_episode_to_air: String
  number_of_episodes: Int
  number_of_seasons: Int
  original_language: String
  original_name: String
  overview: String
  popularity: Float
  poster_path: String
  status: String
  tagline: String
  type: String
  vote_average: Float
  vote_count: Int
  spoken_languages: [Language]
  seasons: [Seasons ]
  production_countries: [Country]
  production_companies: [Company]
  origin_country: [String ]
  networks: [Networks ]
  last_episode_to_air: LastEpisodeToAir
  languages: [String ]
  genres: [String ]
  episode_run_time: [Int ]
  created_by: [CreatedBy ] }

union Media = Movie | TV

type PeopleCredits {
  adult: Boolean
  id: ID!
  name: String!
  original_name: String
  media_type: String
  popularity: Float
  gender: String
  known_for_department: String
  profile_path: String
  cast_id: Int
  character: String
  credit_id: String
  order: Int
}
type People {
  adult: Boolean
  biography: String
  id: ID!
  name: String!
  original_name: String
  media_type: String
  popularity: Float
  gender: String
  known_for_department: String
  profile_path: String
  known_for: [Media]
}

type Query {
  getAnyTrendingToday: [Media]
  getAnyTrendingWeek: [Media]
  getAnybyQuery(query: String!): [Media]
  getMoviebyId(tmdbId: ID!): SingleMovie
  getMoviebyQuery(query: String!): [Movie]
  getMovieTrendingToday: [Movie]
  getMovieTrendingWeek: [Movie]
  getMoviePopular: [Movie]
  getMovieUpcoming: [Movie]
  getMovieTopRated: [Movie]
  getTvbyId(tmdbId: ID!): SingleTV
  getTvbyQuery(query: String!): [TV]
  getTvTrendingToday: [TV]
  getTvTrendingWeek: [TV]
  getTvAiringToday: [TV]
  getTvOnTheAir: [TV]
  getTvPopular: [TV]
  getTvTopRated: [TV]
  getPeopleTrendingToday: [People]
  getPeopleTrendingWeek: [People]
}`

module.exports = typeDefs;