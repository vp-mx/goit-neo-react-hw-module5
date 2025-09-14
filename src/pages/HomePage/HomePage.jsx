import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../tmdb-api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
    const [trendingMoviesList, setTrendingMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                setIsLoading(true);
                const trendingData = await getTrendingMovies();
                setTrendingMoviesList(trendingData);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrendingMovies();
    }, []);

    if (isLoading) {
        return (
            <main>
                <h1>Trending today</h1>
                <p>Loading movies...</p>
            </main>
        );
    }

    return (
        <main>
            <h1>Trending today</h1>
            <MovieList movies={trendingMoviesList} from="/" />
        </main>
    );
};

export default HomePage;