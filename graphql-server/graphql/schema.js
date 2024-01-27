const typeDefs = `
type TV {
    adult: Boolean
    backdrop_path: String
    id: ID!
    name: String
    original_language: String
    original_name: String
    overview: String
    poster_path: String
    media_type: String
    genre_ids: [String]
    popularity: Float
    first_air_date: String
    vote_average: Float
    vote_count: Int
    origin_country: [String]
    streamingId: String
  }

  type Movie {
    adult: Boolean
    backdrop_path: String
    id: ID!
    title: String
    original_language: String
    original_title: String
    overview: String
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
    id: ID
    name: String
    poster_path: String
    backdrop_path: String
  }
  
  type Company {
    id: ID
    logo_path: String
    name: String
    origin_country: String
  }
  
  type Country {
    iso_3166_1: String
    name: String
  }
  
  type Language {
    iso_639_1: String
    name: String
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
  type Image {
    file_path: String
    aspect_ratio: Float
    width: Int
    vote_average: Float
    vote_count: Int
  }
  type Profiles {
    profiles: [Image]
  }
  type Images{
    id: ID
    backdrops: [Image]
    posters: [Image]
    logos: [Image]
  }
  type MediaRecommendations {
    id: ID
    title: String
    image: String
    type: String
    rating: Float
    releaseDate: String
  }
  type ReviewerDetails {
    name: String
    username: String
    avatar_path: String
    rating: Float
  }
  
  type Review {
    author: String
    content: String
    created_at: String
    id: String
    updated_at: String
    url: String
    author_details: ReviewerDetails
  }
  
  type SingleMovie {
    adult: Boolean
    backdrop_path: String
    belongs_to_collection: Collection
    budget: Int
    genres: [String]
    homepage: String
    id: ID!
    imdb_id: String
    original_language: String
    original_title: String
    overview: String
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
    title: String
    video: Boolean
    videos: Video
    vote_average: Float
    vote_count: Int
    streamingId: String
    casts: [PeopleCredits]
    Images: Images
    recommendations: [MediaRecommendations]
    similar: [MediaRecommendations]
    reviews: [Review]
  }
  type Networks {
    id: Int
    logo_path: String
    name: String
    origin_country: String
  }
  
  type LastEpisodeToAir {
    id: Int
    name: String
    overview: String
    vote_average: Float
    vote_count: Int
    air_date: String
    episode_number: Int
    episode_type: String
    production_code: String
    runtime: Int
    season_number: Int
    show_id: Int
    still_path: String
  }
  
  type CreatedBy {
    id: Int
    credit_id: String
    name: String
    gender: Int
    profile_path: String
  }
  type SeasonImage {
    mobile: String
    hd: String
  }
  type Episode {
    id: ID
    title: String
    episode: Int
    Season: Int
    releaseDate: String
    description: String
    url: String
    img: SeasonImage
  }
  type Season {
    season: Int
    image: SeasonImage
    episodes: [Episode]
    isReleased: Boolean
  }
  type Trailer {
    id: ID
    url: String
  }
  type SingleTV {
    adult: Boolean
    backdrop_path: String
    first_air_date: String
    homepage: String
    id: Int
    in_production: Boolean
    last_air_date: String
    name: String
    next_episode_to_air: String
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
    production_countries: [Country]
    production_companies: [Company]
    origin_country: [String]
    networks: [Networks]
    last_episode_to_air: LastEpisodeToAir
    languages: [String]
    genres: [String]
    episode_run_time: [Int]
    created_by: [CreatedBy]
    streamingId: String
    number_of_seasons: Int
    number_of_episodes: Int
    casts: [PeopleCredits]
    Images: Images
    similar: [MediaRecommendations]
    recommendations: [MediaRecommendations]
    seasons: [Season]
    reviews: [Review]
    trailer: Trailer
    videos: Video
  }
  
  union Media = Movie | TV | People

  type PeopleCredits {
    adult: Boolean
    id: ID
    genres:[String]
    name: String
    title: String
    original_language: String
    original_title: String
    overview: String
    backdrop_path: String
    poster_path: String
    original_name: String
    media_type: String
    popularity: Float
    gender: String
    known_for_department: String
    profile_path: String
    cast_id: Int
    character: String
    credit_id: String
    job: String
    order: Int
    department: String
  }

 type combined_credits {
    cast: [PeopleCredits]
    crew: [PeopleCredits]
  }

  type People {
    adult: Boolean
    biography: String
    id: ID!
    name: String
    original_name: String
    media_type: String
    popularity: Float
    gender: String
    known_for_department: String
    profile_path: String
    known_for: [Media]
    birthday: String
    deathday: String
    place_of_birth: String
    also_known_as: [String]
    images : Profiles
    combined_credits: combined_credits
  }
  
  type PaginatedMedia {
    results: [Media]
    hasNextPage: Boolean
    currentPage: Int,
    total_pages: Int,
    total_results: Int,
  }
  
  type PaginatedMovie {
    results: [Movie]
    hasNextPage: Boolean
    currentPage: Int,
    total_pages: Int,
    total_results: Int,
  }
  
  type PaginatedTV {
    results: [TV]
    hasNextPage: Boolean
    currentPage: Int,
    total_pages: Int,
    total_results: Int,
  }
  
  type PaginatedPeople {
    results: [People]
    hasNextPage: Boolean
    currentPage: Int,
    total_pages: Int,
    total_results: Int,
  }
  
  type Query {
    discoverMedia(type: String, dategte: String, datelte: String, votesAvglte: Float, votesAvggte: Float, votesCountlte: Int, votesCountgte: Int, sort: String, genres: String, page: Int): PaginatedMedia
    getAnyTrendingToday(page: Int): PaginatedMedia
    getAnyTrendingWeek(page: Int): PaginatedMedia
    getAnybyQuery(query: String!, page: Int): PaginatedMedia
    getMoviebyId(tmdbId: ID!): SingleMovie
    getMoviebyQuery(query: String!, page: Int): PaginatedMovie
    getMovieTrendingToday(page: Int): PaginatedMovie
    getMovieTrendingWeek(page: Int): PaginatedMovie
    getMoviePopular(page: Int): PaginatedMovie
    getMovieUpcoming(page: Int): PaginatedMovie
    getMovieTopRated(page: Int): PaginatedMovie
    getTvbyId(tmdbId: ID!): SingleTV
    getTvbyQuery(query: String!, page: Int): PaginatedTV
    getTvTrendingToday(page: Int): PaginatedTV
    getTvTrendingWeek(page: Int): PaginatedTV
    getTvAiringToday(page: Int): PaginatedTV
    getTvOnTheAir(page: Int): PaginatedTV
    getTvPopular(page: Int): PaginatedTV
    getTvTopRated(page: Int): PaginatedTV
    getPeopleTrendingToday(page: Int): PaginatedPeople
    getPeopleTrendingWeek(page: Int): PaginatedPeople
    getpeoplebyQuery(query: String!, page: Int): PaginatedPeople
    getpeoplebyId(id: ID!): People
  }
  `

module.exports = typeDefs;