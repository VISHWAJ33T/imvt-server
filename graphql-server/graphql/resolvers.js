const axios = require('axios')
const MovieGenres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]
const TvGenres = [{ "id": 10759, "name": "Action & Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 10762, "name": "Kids" }, { "id": 9648, "name": "Mystery" }, { "id": 10763, "name": "News" }, { "id": 10764, "name": "Reality" }, { "id": 10765, "name": "Sci-Fi & Fantasy" }, { "id": 10766, "name": "Soap" }, { "id": 10767, "name": "Talk" }, { "id": 10768, "name": "War & Politics" }, { "id": 37, "name": "Western" }]

const resolvers = {
    Media: {
        __resolveType(obj, context, info) {
            if (obj.title) {
                return 'Movie';
            }
            if (obj.name) {
                return 'TV';
            }
            return null;
        },

    },
    Movie: {
        poster_path: (movie) => { if (!movie.poster_path) { return "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg" } else { return `https://image.tmdb.org/t/p/original${movie.poster_path}` } },
        backdrop_path: (movie) => { if (!movie.backdrop_path) { return "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61sOYsWxujL._AC_UF1000,1000_QL80_.jpg" } else { return `https://image.tmdb.org/t/p/original${movie.backdrop_path}` } },
        genre_ids: (movie) => movie.genre_ids.map(id => {
            const genre = MovieGenres.find(genre => genre.id === id);
            return genre ? genre.name : null;
        }),
        streamingId: async (movie) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${movie.id}?type=movie`)).data.id;
        },
    },
    SingleMovie: {
        poster_path: (movie) => { if (!movie.poster_path) { return "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg" } else { return `https://image.tmdb.org/t/p/original${movie.poster_path}` } },
        backdrop_path: (movie) => { if (!movie.backdrop_path) { return "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61sOYsWxujL._AC_UF1000,1000_QL80_.jpg" } else { return `https://image.tmdb.org/t/p/original${movie.backdrop_path}` } },
        genres: (movie) => movie.genres.map(genre => genre.name),
        streamingId: async (movie) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${movie.id}?type=movie`)).data.id;
        },
        casts: async (movie) => {
            return (await axios.get(`${process.env.TMDB_BASE_URL}/movie/${movie.id}/credits?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.cast;
        },
        logos: async (movie) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${movie.id}?type=movie`)).data.logos;
        },
        similar: async (movie) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${movie.id}?type=movie`)).data.similar;
        },
        recommendations: async (movie) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${movie.id}?type=movie`)).data.recommendations;
        },
        reviews: async (movie) => {
            return (await axios.get(`${process.env.TMDB_BASE_URL}/movie/${movie.id}/reviews?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.results;
        },
    },
    SingleTV: {
        poster_path: (tv) => { if (!tv.poster_path) { return "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg" } else { return `https://image.tmdb.org/t/p/original${tv.poster_path}` } },
        backdrop_path: (tv) => { if (!tv.backdrop_path) { return "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61sOYsWxujL._AC_UF1000,1000_QL80_.jpg" } else { return `https://image.tmdb.org/t/p/original${tv.backdrop_path}` } },
        genres: (tv) => tv.genres.map(genre => genre.name),
        streamingId: async (tv) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${tv.id}?type=tv`)).data.id;
        },
        totalSeasons: async (tv) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${tv.id}?type=tv`)).data.totalSeasons;
        },
        totalEpisodes: async (tv) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${tv.id}?type=tv`)).data.totalEpisodes;
        },
        casts: async (tv) => {
            return (await axios.get(`${process.env.TMDB_BASE_URL}/tv/${tv.id}/credits?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.cast;
        },
        logos: async (tv) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${tv.id}?type=tv`)).data.logos;
        },
        similar: async (tv) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${tv.id}?type=tv`)).data.similar;
        },
        recommendations: async (tv) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${tv.id}?type=tv`)).data.recommendations;
        },
        seasons: async (tv) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${tv.id}?type=tv`)).data.seasons;
        },
        reviews: async (tv) => {
            return (await axios.get(`${process.env.TMDB_BASE_URL}/tv/${tv.id}/reviews?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.results;
        },
    },
    TV: {
        poster_path: (tv) => `https://image.tmdb.org/t/p/original${tv.poster_path}`,
        backdrop_path: (tv) => `https://image.tmdb.org/t/p/original${tv.backdrop_path}`,
        genre_ids: (tv) => tv.genre_ids.map(id => {
            const genre = TvGenres.find(genre => genre.id === id);
            return genre ? genre.name : null;
        }),
    },
    People: {
        profile_path: (people) => `https://image.tmdb.org/t/p/original${people.profile_path}`,
        gender: (people) => {
            if (people.gender === 1) { return "Female" }
            else if (people.gender === 2) { return "Male" }
            else if (people.gender === 3) { return "Non-Binary" }
            else { return "Not specified" }
        },
        biography: async (people) => (await axios.get(`${process.env.TMDB_BASE_URL}/person/${people.id}?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.biography,
    },
    PeopleCredits: {
        profile_path: (people) => `https://image.tmdb.org/t/p/original${people.profile_path}`,
        gender: (people) => {
            if (people.gender === 1) { return "Female" }
            else if (people.gender === 2) { return "Male" }
            else if (people.gender === 3) { return "Non-Binary" }
            else { return "Not specified" }
        },
    },
    Query: {
        // Both Movie and TV
        getAnybyQuery: async (parent, { query }) => (await axios.get(`${process.env.TMDB_BASE_URL}/search/multi?query=${query}&language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        getAnyTrendingToday: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/trending/all/day?language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        getAnyTrendingWeek: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/trending/all/week?language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        // Movie
        getMoviebyId: async (parent, { tmdbId }) => (await axios.get(`${process.env.TMDB_BASE_URL}/movie/${tmdbId}?language=en-US&page=1&api_key=${process.env.TMDB_KEY}&append_to_response=videos`)).data,
        getMoviebyQuery: async (parent, { query }) => (await axios.get(`${process.env.TMDB_BASE_URL}/search/movie?query=${query}&language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        getMovieTrendingToday: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/trending/movie/day?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.results,
        getMovieTrendingWeek: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/trending/movie/week?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.results,
        getMovieUpcoming: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/movie/upcoming?&language=en-US&region=IN&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        getMovieTopRated: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        getMoviePopular: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/movie/popular?language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        // TV
        getTvbyId: async (parent, { tmdbId }) => (await axios.get(`${process.env.TMDB_BASE_URL}/movie/${tmdbId}?language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data,
        getTvbyQuery: async (parent, { query }) => (await axios.get(`${process.env.TMDB_BASE_URL}/search/tv?query=${query}&language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        getTvTrendingToday: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/trending/tv/day?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.results,
        getTvTrendingWeek: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/trending/tv/week?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.results,
        getTvAiringToday: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/tv/airing_today?language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        getTvOnTheAir: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/tv/on_the_air?language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        getTvTopRated: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/tv/top_rated?language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        getTvPopular: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/tv/popular?language=en-US&page=1&api_key=${process.env.TMDB_KEY}`)).data.results,
        // People
        getPeopleTrendingWeek: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/trending/person/week?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.results,
        getPeopleTrendingToday: async () => (await axios.get(`${process.env.TMDB_BASE_URL}/trending/person/day?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.results,
    }
}

module.exports = resolvers;