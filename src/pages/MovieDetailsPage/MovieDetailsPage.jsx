import { useEffect, useState } from "react";
import { HiArrowLeft } from 'react-icons/hi';
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails, getImageUrl } from "../../tmdb-api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const backLinkHref = location.state?.from ?? "/movies";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true);
                const movieData = await getMovieDetails(movieId);
                setMovieDetails(movieData);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setMovieDetails(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    if (isLoading) return (
        <main>
            <p>Loading movie details...</p>
        </main>
    );

    if (!movieDetails) return (
        <main>
            <p>Movie not found</p>
        </main>
    );

    return (
        <main>
            <Link to={backLinkHref}>
                <HiArrowLeft size="12" /> Go back
            </Link>

            <div className={styles.mainInfoWithImage}>
                <img src={getImageUrl(movieDetails.poster_path)} alt={movieDetails.title} width="300" />
                <div className={styles.mainInformation}>
                    <h1>{movieDetails.title}</h1>
                    <p>Rating: {Math.round(movieDetails.vote_average * 10) / 10}/10</p>
                    <h2>Overview</h2>
                    <p>{movieDetails.overview}</p>
                    <h3>Genres</h3>
                    <p>{movieDetails.genres.map(({name}) => name).join(", ")}</p>
                </div>
            </div>

            <div className={styles.additionalInformation}>
                <h4>Additional information</h4>
                <ul>
                    <li><Link to="cast" state={{ from: backLinkHref }}>Cast</Link></li>
                    <li><Link to="reviews" state={{ from: backLinkHref }}>Reviews</Link></li>
                </ul>
            </div>

            <Outlet />
        </main>
    );
};

export default MovieDetailsPage;