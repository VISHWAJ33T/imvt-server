const axios = require('axios')
const MovieGenres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]
const TvGenres = [{ "id": 10759, "name": "Action & Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 10762, "name": "Kids" }, { "id": 9648, "name": "Mystery" }, { "id": 10763, "name": "News" }, { "id": 10764, "name": "Reality" }, { "id": 10765, "name": "Sci-Fi & Fantasy" }, { "id": 10766, "name": "Soap" }, { "id": 10767, "name": "Talk" }, { "id": 10768, "name": "War & Politics" }, { "id": 37, "name": "Western" }]

const resolvers = {
    Media: {
        __resolveType(obj, context, info) {
            if (obj.media_type === "person") {
                return 'People';
            }
            if (obj.title) {
                return 'Movie';
            }
            if (obj.name) {
                return 'TV';
            }
        },
    },
    Movie: {
        poster_path: (movie) => { if (!movie.poster_path) { return "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg" } else { return `https://image.tmdb.org/t/p/original${movie.poster_path}` } },
        backdrop_path: (movie) => { if (!movie.backdrop_path) { return "https://static.vecteezy.com/system/resources/previews/011/598/289/original/blank-smartphone-with-popcorn-film-strip-clapperboard-on-blue-background-online-streaming-movie-concept-iluustration-free-vector.jpg" } else { return `https://image.tmdb.org/t/p/original${movie.backdrop_path}` } },
        genre_ids: (movie) => movie.genre_ids?.map(id => {
            const genre = MovieGenres.find(genre => genre.id === id);
            return genre ? genre.name : null;
        }),
        streamingId: async (movie) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${movie.id}?type=movie`)).data.id;
        },
    },
    TV: {
        poster_path: (tv) => { if (!tv.poster_path) { return "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg" } else { return `https://image.tmdb.org/t/p/original${tv.poster_path}` } },
        backdrop_path: (tv) => { if (!tv.backdrop_path) { return "https://static.vecteezy.com/system/resources/previews/011/598/289/original/blank-smartphone-with-popcorn-film-strip-clapperboard-on-blue-background-online-streaming-movie-concept-iluustration-free-vector.jpg" } else { return `https://image.tmdb.org/t/p/original${tv.backdrop_path}` } },
        genre_ids: (tv) => tv.genre_ids?.map(id => {
            const genre = TvGenres.find(genre => genre.id === id);
            return genre ? genre.name : null;
        }),
        streamingId: async (tv) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${tv.id}?type=tv`)).data?.id;
        },
    },
    SingleMovie: {
        poster_path: (movie) => { if (!movie.poster_path) { return "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg" } else { return `https://image.tmdb.org/t/p/original${movie.poster_path}` } },
        backdrop_path: (movie) => { if (!movie.backdrop_path) { return "https://static.vecteezy.com/system/resources/previews/011/598/289/original/blank-smartphone-with-popcorn-film-strip-clapperboard-on-blue-background-online-streaming-movie-concept-iluustration-free-vector.jpg" } else { return `https://image.tmdb.org/t/p/original${movie.backdrop_path}` } },
        genres: (movie) => movie.genres.map(genre => genre.name),
        streamingId: async (movie) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${movie.id}?type=movie`)).data?.id;
        },
        casts: async (movie) => {
            return (await axios.get(`${process.env.TMDB_BASE_URL}/movie/${movie.id}/credits?language=en-US&api_key=${process.env.TMDB_KEY}`)).data?.cast;
        },
        logos: async (movie) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${movie.id}?type=movie`)).data?.logos;
        },
        similar: async (movie) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${movie.id}?type=movie`)).data?.similar;
        },
        recommendations: async (movie) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${movie.id}?type=movie`)).data?.recommendations;
        },
        reviews: async (movie) => {
            return (await axios.get(`${process.env.TMDB_BASE_URL}/movie/${movie.id}/reviews?language=en-US&api_key=${process.env.TMDB_KEY}`)).data?.results;
        },
    },
    SingleTV: {
        poster_path: (tv) => { if (!tv.poster_path) { return "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg" } else { return `https://image.tmdb.org/t/p/original${tv.poster_path}` } },
        backdrop_path: (tv) => { if (!tv.backdrop_path) { return "https://static.vecteezy.com/system/resources/previews/011/598/289/original/blank-smartphone-with-popcorn-film-strip-clapperboard-on-blue-background-online-streaming-movie-concept-iluustration-free-vector.jpg" } else { return `https://image.tmdb.org/t/p/original${tv.backdrop_path}` } },
        genres: (tv) => tv.genres.map(genre => genre.name),
        streamingId: async (tv) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${tv.id}?type=tv`)).data.id;
        },
        casts: async (tv) => {
            return (await axios.get(`${process.env.TMDB_BASE_URL}/tv/${tv.id}/credits?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.cast;
        },
        videos: async (tv) => {
            return (await axios.get(`${process.env.TMDB_BASE_URL}/tv/${tv.id}/videos?language=en-US&api_key=${process.env.TMDB_KEY}`)).data;
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
        trailer: async (tv) => {
            return (await axios.get(`${process.env.CONSUMET_API_BASE_URL}/meta/tmdb/info/${tv.id}?type=tv`)).data.trailer;
        },
        reviews: async (tv) => {
            return (await axios.get(`${process.env.TMDB_BASE_URL}/tv/${tv.id}/reviews?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.results;
        },
    },
    People: {
        profile_path: (people) => { if (!people.profile_path) { return "https://st3.depositphotos.com/1717437/18622/v/450/depositphotos_186223678-stock-illustration-incognito-unknown-person-silhouette-man.jpg" } else { return `https://image.tmdb.org/t/p/original${people.profile_path}` } },
        gender: (people) => {
            if (people.gender === 1) { return "Female" }
            else if (people.gender === 2) { return "Male" }
            else if (people.gender === 3) { return "Non-Binary" }
            else { return "Not specified" }
        },
        biography: async (people) => (await axios.get(`${process.env.TMDB_BASE_URL}/person/${people.id}?language=en-US&api_key=${process.env.TMDB_KEY}`)).data.biography,
    },
    PeopleCredits: {
        profile_path: (people) => { if (!people.profile_path) { return "https://st3.depositphotos.com/1717437/18622/v/450/depositphotos_186223678-stock-illustration-incognito-unknown-person-silhouette-man.jpg" } else { return `https://image.tmdb.org/t/p/original${people.profile_path}` } },
        gender: (people) => {
            if (people.gender === 1) { return "Female" }
            else if (people.gender === 2) { return "Male" }
            else if (people.gender === 3) { return "Non-Binary" }
            else { return "Not specified" }
        },
    },
    Query: {
        // Both Movie and TV
        getAnybyQuery: async (parent, { query, page = 1 }) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/search/multi?query=${query}&language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getAnyTrendingToday: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/all/day?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getAnyTrendingWeek: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/all/week?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        // Movie
        getMoviebyId: async (parent, { tmdbId }) => (await axios.get(`${process.env.TMDB_BASE_URL}/movie/${tmdbId}?language=en-US&api_key=${process.env.TMDB_KEY}&append_to_response=videos`)).data,
        getMoviebyQuery: async (parent, { query, page = 1 }) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/search/movie?query=${query}&language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getMovieTrendingToday: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/movie/day?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getMovieTrendingWeek: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/movie/week?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getMovieUpcoming: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/movie/upcoming?&language=en-US&region=IN&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getMovieTopRated: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/movie/top_rated?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getMoviePopular: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/movie/popular?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        // TV
        getTvbyId: async (parent, { tmdbId }) => (await axios.get(`${process.env.TMDB_BASE_URL}/tv/${tmdbId}?language=en-US&api_key=${process.env.TMDB_KEY}`)).data,
        getTvbyQuery: async (parent, { query, page = 1 }) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/search/tv?query=${query}&language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getTvTrendingToday: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/tv/day?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getTvTrendingWeek: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/tv/week?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getTvAiringToday: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/tv/airing_today?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getTvOnTheAir: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/tv/on_the_air?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getTvTopRated: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/tv/top_rated?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getTvPopular: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/tv/popular?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },

        // People
        getpeoplebyQuery: async (parent, { query, page = 1 }) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/search/person?query=${query}&language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getPeopleTrendingWeek: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/person/week?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        },
        getPeopleTrendingToday: async (parent, { page = 1 } = {}) => {
            const response = await axios.get(`${process.env.TMDB_BASE_URL}/trending/person/day?language=en-US&page=${page}&api_key=${process.env.TMDB_KEY}`);
            return {
                results: response.data.results,
                currentPage: page,
                hasNextPage: page < response.data.total_pages,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
            };
        }
    }
}

module.exports = resolvers;