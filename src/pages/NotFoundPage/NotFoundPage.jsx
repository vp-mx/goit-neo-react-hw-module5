import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css"

const NotFoundPage = () => {
    return (
        <main>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className={styles.link}>Go Home</Link>
        </main>
    )
}

export default NotFoundPage;