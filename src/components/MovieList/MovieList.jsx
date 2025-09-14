import { Link } from "react-router-dom";

const MovieList = ({ movies, from }) => {
    if (!movies || movies.length === 0) {
        return <p>No movies found</p>;
    }

    return (
        <ul>
            {movies.map(({ id, title }) => (
                <li key={id}>
                    <Link to={`/movies/${id}`} state={{ from }}>
                        {title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;