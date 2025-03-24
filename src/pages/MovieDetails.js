import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../services/api";
import { Container, Button, Spinner } from "react-bootstrap";
import "../styles/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    loadMovie();
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1); // Go back if there is history
    } else {
      navigate("/"); // If no history, go to home page
    }
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto" />;

  return (
    <Container className="movie-details mt-4">
      {/* Back Button Fix */}
      <Button className="back-btn mb-3" onClick={handleBack}>
        🔙 Back
      </Button>

      {movie && (
        <div className="text-center">
          <h2>
            {movie.Title} ({movie.Year})
          </h2>
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="img-fluid rounded"
          />
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>
      )}
    </Container>
  );
};

export default MovieDetails;
