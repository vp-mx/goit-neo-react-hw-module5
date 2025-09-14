import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        "Content-Type": "application/json"
    },
});

export const getTrendingMovies = async () => {
    const trendingResponse = await api.get("/trending/movie/day");
    return trendingResponse.data.results;
};

export const searchMovies = async (searchQuery) => {
    const searchResponse = await api.get("/search/movie", {
        params: { 
            query: searchQuery, 
            include_adult: false, 
            language: "en-US", 
            page: 1 
        },
    });
    return searchResponse.data.results;
};

export const getMovieDetails = async (movieId) => {
    const detailsResponse = await api.get(`/movie/${movieId}`, {
        params: { language: "en-US" }
    });
    return detailsResponse.data;
};

export const getMovieCredits = async (movieId) => {
    const creditsResponse = await api.get(`/movie/${movieId}/credits`);
    return creditsResponse.data.cast;
};

export const getMovieReviews = async (movieId) => {
    const reviewsResponse = await api.get(`/movie/${movieId}/reviews`);
    return reviewsResponse.data.results;
}

export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : "/src/assets/no-image.svg";
};