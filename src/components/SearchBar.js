import React, { useState } from "react";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import { debounce } from "lodash";
import { fetchMovies } from "../services/api";
import { Link } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = debounce(async (searchText) => {
    if (!searchText.trim()) {
      setSuggestions([]);
      return;
    }
    const data = await fetchMovies(searchText, 1);
    if (data.Response === "True") {
      setSuggestions(data.Search);
    } else {
      setSuggestions([]);
    }
  }, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="mb-3">
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            🔍
          </button>
        </InputGroup>
      </Form>

      {suggestions.length > 0 && (
        <ListGroup className="mt-2">
          {suggestions.map((movie) => (
            <ListGroup.Item
              key={movie.imdbID}
              as={Link}
              to={`/movie/${movie.imdbID}`}
            >
              {movie.Title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchBar;
