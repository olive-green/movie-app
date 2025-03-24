import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { fetchMovies } from "../services/api";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import "../styles/MovieList.css";

const MovieList = () => {
  const { movies, setMovies, loading, setLoading, error, setError } =
    useContext(MovieContext);
  const [query, setQuery] = useState("marvel");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const observer = useRef();

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setNoResults(false);
    loadMovies(query, 1);
  }, [query]);

  const loadMovies = async (query, page) => {
    setLoading(true);
    setError(null);
    const data = await fetchMovies(query, page);
    setLoading(false);

    if (data.Response === "True") {
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
      setHasMore(data.Search.length > 0);
      setNoResults(false);
    } else {
      setMovies([]);
      setError(data.Error || "No movies found for this search.");
      setNoResults(true);
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (page > 1) loadMovies(query, page);
  }, [page]);

  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Container className="mt-4">
      <h2 className="text-center">🎬 Movie Listing</h2>
      <SearchBar onSearch={setQuery} />

      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}

      {noResults && (
        <div className="no-results">
          <h4>No movies found for "{query}". Please try a different search.</h4>
        </div>
      )}

      <Row>
        {movies.map((movie, index) => (
          <Col
            md={3}
            key={movie.imdbID}
            className="mb-4"
            ref={index === movies.length - 1 ? lastMovieRef : null}
          >
            <Link to={`/movie/${movie.imdbID}`}>
              <div className="movie-card">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                  alt={movie.Title}
                  className="img-fluid rounded"
                />
                <p className="text-center">{movie.Title}</p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>

      {loading && <Loader />}
    </Container>
  );
};

export default MovieList;
