import axios from "axios";

const API_KEY = "b9bd48a6";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movies", error);
    return { Error: "Failed to fetch movies" };
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details", error);
    return { Error: "Failed to fetch movie details" };
  }
};
