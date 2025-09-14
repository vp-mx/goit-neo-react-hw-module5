import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, getImageUrl } from "../../tmdb-api";
import styles from "./MovieCast.module.css"

const MovieCast = () => {
    const { movieId } = useParams();
    const [castMembers, setCastMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCastData = async () => {
            try {
                setIsLoading(true);
                const castData = await getMovieCredits(movieId);
                setCastMembers(castData);
            } catch (error) {
                console.error("Error fetching cast:", error);
                setCastMembers([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieId) {
            fetchCastData();
        }
    }, [movieId]);

    if (isLoading) {
        return <p>Loading cast...</p>;
    }

    if (castMembers.length === 0) {
        return <p>No cast information available</p>;
    }

    return (
        <ul>
            {castMembers.map(({ id, name, character, profile_path }) => (
                <li className={styles.castCard} key={id}>
                    <img src={getImageUrl(profile_path)} alt={name} width="100" />
                    <p>{name}</p>
                    <p>Character: {character}</p>
                </li>
            ))}
        </ul>
    );
};

export default MovieCast;