import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../tmdb-api";

const MovieReviews = () => {
    const { movieId } = useParams();
    const [movieReviews, setMovieReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setIsLoading(true);
                const reviewsData = await getMovieReviews(movieId);
                setMovieReviews(reviewsData);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setMovieReviews([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieId) {
            fetchReviews();
        }
    }, [movieId]);

    if (isLoading) {
        return <p>Loading reviews...</p>;
    }

    return (
        <ul>
            {movieReviews.length > 0 ? (
                movieReviews.map(({ id, author, content }) => (
                    <li key={id}>
                        <h3>Author: {author}</h3>
                        <p>{content}</p>
                    </li>
                ))
            ) : (
                <p>No reviews available for this movie yet</p>
            )}
        </ul>
    );
};

export default MovieReviews;