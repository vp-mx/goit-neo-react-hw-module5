import { useEffect, useState } from "react";
import { searchMovies } from "../../tmdb-api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css"

const MoviesPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams(); 

    const searchQuery = searchParams.get("query") || "";

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults([]);
            return;
        }

        const performSearch = async () => {
            try {
                setIsSearching(true);
                const searchData = await searchMovies(searchQuery);
                setSearchResults(searchData);
            } catch (error) {
                console.error("Error searching movies:", error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        };

        performSearch();
    }, [searchQuery]);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const inputValue = form.elements.query.value.trim();

        if (!inputValue) return;

        setSearchParams({ query: inputValue });
        form.reset();
    };

    return (
        <main>
            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
                <input 
                    className={styles.searchField} 
                    type="text" 
                    name="query" 
                    defaultValue={searchQuery}  
                    placeholder="Search movies..." 
                />
                <button className={styles.submitBtn} type="submit">
                    {isSearching ? "Searching..." : "Search"}
                </button>
            </form>
            {searchResults.length > 0 && (
                <MovieList movies={searchResults} from={`/movies?query=${searchQuery}`} />
            )}
        </main>
    );
};

export default MoviesPage;